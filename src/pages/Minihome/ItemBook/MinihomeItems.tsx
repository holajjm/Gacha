import React, { useEffect, useRef } from "react";

import useImage from "@hooks/useImage";

import style from "@styles/Minihome/ItemBook/MinihomeItem.module.css";
import { ItemBookData } from "types/minihome";


function MinihomeItems({ data }: { data: ItemBookData }) {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);
  return (
    <article className={style[`article_item_${data?.itemGrade}`]}>
      {!data?.itemCnt ? <p className={style.article_item_disabled}></p> : null}
      <div className={style.article_item_img}>
        <img
          src={useImage(data?.imageUrl)}
          alt="sample"
          ref={imgRef}
          width={96}
          height={96}
        />
        {data?.itemCnt ? (
          <p className={style.article_item_count}>{data?.itemCnt}개</p>
        ) : null}
      </div>
    </article>
  );
}

export default MinihomeItems;
