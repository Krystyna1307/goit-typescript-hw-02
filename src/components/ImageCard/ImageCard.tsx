import React from "react";
import s from "./ImageCard.module.css";
import { Photo } from "../../types";

interface ImageCardProps {
  image: Photo;
  onClick: (image: Photo) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div className={s.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Image without description"}
        className={s.image}
        onClick={() => onClick(image)} // Передача зображення
      />
    </div>
  );
};

export default ImageCard;
