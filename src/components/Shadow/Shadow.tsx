import React from "react";
import s from "./Shadow.module.css";

const Shadow = ({ hidden }) => {
  return <div className={`${s.shadow} ${hidden ? s.hidden : ""}`}></div>;
};

export default Shadow;
