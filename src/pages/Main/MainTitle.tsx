import React, { Ref } from "react";

import style from "@styles/Main/MainPage.module.css";

function MainTitle({
  article1Ref,
  article2Ref,
  article3Ref,
  article4Ref,
  article5Ref,
  scrollToSection,
}: {
  article1Ref: Ref<HTMLDivElement>;
  article2Ref: Ref<HTMLDivElement>;
  article3Ref: Ref<HTMLDivElement>;
  article4Ref: Ref<HTMLDivElement>;
  article5Ref: Ref<HTMLDivElement>;
  scrollToSection: (section: React.RefObject<HTMLDivElement>) => void;
}) {
  const previewItems = [
    { src: "/images/MiniHomeMain.webp", label: "미니홈", ref: article2Ref },
    { src: "/images/Explore.webp", label: "둘러보기", ref: article3Ref },
    { src: "/images/Gacha.webp", label: "가챠", ref: article4Ref },
    { src: "/images/Market.webp", label: "마켓", ref: article5Ref },
  ];
  return (
    <article ref={article1Ref} className={style.header}>
      <div className={style.title_wrapper}>
        <h1 className={style.title}>
          Welcome to the
          <br />
          GACHAGACHA!
        </h1>
        <h2 className={style.description}>아이템을 뽑아 꾸미고 거래하세요!</h2>
      </div>
      <div className={style.previews}>
        {previewItems.map((item, idx) => (
          <div
            key={idx}
            className={style.previewItem}
            onClick={() =>
              scrollToSection(item.ref as React.RefObject<HTMLDivElement>)
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              scrollToSection(item.ref as React.RefObject<HTMLDivElement>)
            }
          >
            <div className={style.imageWrapper}>
              <img
                src={item.src}
                alt="PreviewBtn"
                width={224}
                height={112}
                fetchPriority="high"
              />
            </div>
            <p className={style.text}>{item.label} &rarr;</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default MainTitle;
