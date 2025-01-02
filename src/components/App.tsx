import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImages } from "../services/api";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageModal from "./ImageModal/ImageModal";
import Shadow from "./Shadow/Shadow";

const App = () => {
  const [images, setImages] = useState([]); //картинки
  const [isLoading, setIsLoading] = useState(false); //спінер
  const [isError, setIsError] = useState(false); // текст помилки
  const [query, setQuery] = useState(""); // пошук картинки
  const [page, setPage] = useState(1); // додаткові картинки
  const [totalPage, setTotalPages] = useState(0);

  const [showModal, setShowModal] = useState(false); //модальне вікно
  const [selectedImage, setSelectedImage] = useState(null);

  const [isTyping, setIsTyping] = useState(false); // Стежимо, чи користувач почав вводити текст

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

  const handleChangeQuery = (query) => {
    setImages([]);
    setQuery(query);
    setPage(1);
  };

  const handleClickMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null); // Очищаємо вибране зображення
    setShowModal(false); // Закриваємо модальне вікно
  };

  const handleTyping = (typingStatus) => {
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
