import React, { useState } from "react";

import PreviewModal, { ModalCategory } from "@components/modals/PreviewModal";
import { useGetUserInfo } from "@features/user/useGetUserInfo";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import { ModalPortal } from "@hooks/ModalPortal";
import { usePreviewModalState } from "@store/store";
import style from "@styles/Main/MainPage.module.css";

function MainPage() {
  usePageTitle("Welcome to 가챠가챠!");
  usePageUpper();
  useGetUserInfo();
  const modal = usePreviewModalState((state) => state.modal);
  const modalOpen = usePreviewModalState((state) => state.modalOpen);
  const [modalState, setModalState] = useState<ModalCategory>("미니홈");

  const previewItems = [
    { src: "/images/preview/MinihomeMain.webp", label: "미니홈" },
    { src: "/images/preview/ExploreMain.webp", label: "둘러보기" },
    { src: "/images/preview/GachaMain.webp", label: "가챠" },
    { src: "/images/preview/MarketMain.webp", label: "마켓" },
  ];

  // console.log(modalState);

  return (
    <>
      <main className={style.container}>
        {modal && (
          <ModalPortal>
            <PreviewModal modalState={modalState} />
          </ModalPortal>
        )}
        <section className={style.wrapper}>
          <article className={style.header}>
            <div className={style.title_wrapper}>
              <h1 className={style.title}>
                Welcome to the
                <br />
                GACHAGACHA!
              </h1>
              <h2 className={style.description}>
                아이템을 뽑아 꾸미고 거래하세요!
              </h2>
            </div>
            <div className={style.previews}>
              {previewItems.map((item, idx) => (
                <div
                  key={idx}
                  className={style.previewItem}
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    modalOpen();
                    setModalState(
                      e.currentTarget.getAttribute(
                        "data-value",
                      ) as ModalCategory,
                    );
                  }}
                  data-value={item.label}
                  role="button"
                  tabIndex={0}
                >
                  <div className={style.imageWrapper}>
                    <img
                      src={item.src}
                      alt={item.label}
                      width={224}
                      height={112}
                      {...{ fetchpriority: "high" }}
                    />
                  </div>
                  <p className={style.text}>{item.label} &rarr;</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default MainPage;
