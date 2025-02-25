import React from "react";

import style from "@styles/Layouts/Button.module.css";

function Button({text,width,onClick}:{text:string,width:string,onClick:() => void}) {
  return <button style={{width: `${width}`}} className={style.backBtn} onClick={onClick}>{text}</button>;
}

export default Button;
