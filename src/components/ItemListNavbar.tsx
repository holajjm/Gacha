import React from "react";

import style from "@styles/Layouts/ItemListNavbar.module.css";

function ItemListNavbar({
  handleClick,
  click,
  type,
}: {
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  click: string;
  type: string;
}) {
  return (
    <nav onClick={handleClick} className={style[`${type}_color`]}>
      <ul className={style.nav_ul}>
        <li>
          <button
            className={click === "" ? style.active_button : style.button}
            datatype=""
          >
            All
          </button>
        </li>
        <li>
          <button
            className={click === "S" ? style.active_button : style.button}
            datatype="S"
          >
            S등급
          </button>
        </li>
        <li>
          <button
            className={click === "A" ? style.active_button : style.button}
            datatype="A"
          >
            A등급
          </button>
        </li>
        <li>
          <button
            className={click === "B" ? style.active_button : style.button}
            datatype="B"
          >
            B등급
          </button>
        </li>
        <li>
          <button
            className={click === "C" ? style.active_button : style.button}
            datatype="C"
          >
            C등급
          </button>
        </li>
        <li>
          <button
            className={click === "D" ? style.active_button : style.button}
            datatype="D"
          >
            D등급
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default ItemListNavbar;
