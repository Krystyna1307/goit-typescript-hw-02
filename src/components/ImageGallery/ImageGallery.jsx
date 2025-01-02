import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, onClick }) => {
  return (
    <div className={s.gallery}>
      <ul className={s.list}>
        {images.map((image) => (
          <li className={s.item} key={image.id}>
            <ImageCard image={image} onClick={() => onClick(image)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;

{
  /* <a href={image.urls.regular}></a> */
}
