import React, { ReactNode } from "react";

import style from "@styles/Layouts/Button.module.css";

function Button({text,width,onClick}:{text:ReactNode,width:string,onClick:() => void}) {
  return <button style={{width: `${width}`}} className={style.backBtn} onClick={onClick}>{text}</button>;
}

export default React.memo(Button);
