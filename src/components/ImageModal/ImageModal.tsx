import React from "react";
import ReactModal from "react-modal";
import s from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  const handleBackdropClick = (e) => {
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
