import { useEffect, useState } from "react";
import s from "./SearchBar.module.css";
import toast from "react-hot-toast";

const SearchBar = ({ onSubmit, onTyping }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter test");
      return;
    }
    onSubmit(input);
    setInput("");
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim().length > 0) {
      onTyping(true);
    } else {
      onTyping(false);
    }
  };

  return (
    <div className={s.container}>
      <header className={s.wrapper}>
        <form onSubmit={handleSubmit} className={s.form}>
          <button type="submit" className={s.button}>
            <span className={s.icon}></span>
          </button>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={s.input}
          />
        </form>
      </header>
    </div>
  );
};

export default SearchBar;
