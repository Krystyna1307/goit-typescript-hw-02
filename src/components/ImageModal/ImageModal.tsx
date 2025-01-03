import React, { FormEvent } from "react";
import ReactModal from "react-modal";
import s from "./ImageModal.module.css";
import { Photo } from "../../types";

ReactModal.setAppElement("#root");

interface ImageModalProps {
  image: Photo | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div onClick={handleBackdropClick} className={s.wrapper}>
      <ReactModal
        isOpen={!!image}
        onRequestClose={onClose} // Обробник закриття
        className={s.modal} // Кастомний стиль
        overlayClassName={s.overlay} // Стиль для фону
        shouldCloseOnOverlayClick={true} // Закриття при кліку поза модальним вікном
        shouldCloseOnEsc={true} // Закриття при натисканні ESC
      >
        <button onClick={onClose} className={s.closeButton}>
          Close
        </button>
        {image && (
          <>
            <img src={image.urls.regular} alt={image.alt_description} />
          </>
        )}
      </ReactModal>
    </div>
  );
};

export default ImageModal;
