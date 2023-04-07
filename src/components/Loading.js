import React from "react";
import style from "./Loading.module.css";

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className={style.spinner}>
      <div className={style.doubleBounce1}></div>
      <div className={style.doubleBounce2}></div>
    </div>
  </div>
);

export default Loading;
