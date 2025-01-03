import React, { FormEvent } from "react";
import { useEffect, useState } from "react";
import s from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (input: string) => void;
  onTyping: (isTyping: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, onTyping }) => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter test");
      return;
    }
    onSubmit(input);
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
