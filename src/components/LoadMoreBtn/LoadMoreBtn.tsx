import React from "react";
import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  const handleClickLoadMore = (page) => {
    onClick(page);
  };

  return (
    <div className={s.wrapper}>
      <button onClick={handleClickLoadMore} className={s.button}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
