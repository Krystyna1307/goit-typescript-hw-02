import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImages } from "../services/api";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal/ImageModal";
import Shadow from "./Shadow/Shadow";
import { Photo } from "../types";

const App: React.FC = () => {
  const [images, setImages] = useState<Photo[]>([]); //картинки
  const [isLoading, setIsLoading] = useState<boolean>(false); //спінер
  const [isError, setIsError] = useState<boolean>(false); // текст помилки
  const [query, setQuery] = useState<string>(""); // пошук картинки
  const [page, setPage] = useState<number>(1); // додаткові картинки
  const [totalPage, setTotalPages] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false); //модальне вікно
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);
  const [isTyping, setIsTyping] = useState<boolean>(false); // Стежимо, чи користувач почав вводити текст

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const { results, total_pages } = await fetchImages(query, page);

        setTotalPages(total_pages);
        setImages((prev) => [...prev, ...results]);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleChangeQuery = (query: string): void => {
    setImages([]); // Очищаємо попередні зображення
    setQuery(query); // Оновлюємо пошуковий запит
    setPage(1); // Скидаємо сторінку
  };

  const handleClickMore = (): void => {
    setPage((prev) => prev + 1);
  };

  const openModal = (image: Photo): void => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = (): void => {
    setSelectedImage(null); // Очищаємо вибране зображення
    setShowModal(false); // Закриваємо модальне вікно
  };

  const handleTyping = (typingStatus: boolean): void => {
    setIsTyping(typingStatus);
  };

  return (
    <div>
      <SearchBar onSubmit={handleChangeQuery} onTyping={handleTyping} />
      <Shadow hidden={isTyping} />

      {isError && <ErrorMessage />}
      <ImageGallery images={images} onClick={openModal} />
      {isLoading && <Loader />}
      {page < totalPage && images.length > 0 && (
        <LoadMoreBtn onClick={handleClickMore} />
      )}
      {showModal && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
