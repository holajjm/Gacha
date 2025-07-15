import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { usePreviewModalState, useUserStore } from "@store/store";
import useCustomAxios from "@hooks/useCustomAxios";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import { ModalPortal } from "@hooks/ModalPortal";
import PreviewModal, { ModalCategory } from "@components/modals/PreviewModal";

import style from "@styles/Main/MainPage.module.css";

function MainPage() {
  usePageTitle("Welcome to 가챠가챠!");
  usePageUpper();
  const modal = usePreviewModalState((state) => state.modal);
  const modalOpen = usePreviewModalState((state) => state.modalOpen);
  const [modalState, setModalState] = useState<ModalCategory>("미니홈");

  const { user, setUser } = useUserStore((state) => state);
  const axios = useCustomAxios();
  const getUser = async () => {
    if (user?.accessToken) {
      const response = await axios.get("/userInfo");
      return response?.data;
    }
    return;
  };
  const { data } = useQuery({
    queryKey: ["User", user],
    queryFn: getUser,
    enabled: !!user,
  });
  // console.log("user", user);
  // console.log(data);

  useEffect(() => {
    if (data) {
      setUser({
        ...user,
        nickname: data?.nickname,
        profileId: data?.profileId,
      });
    }
    return;
  }, [data]);

  // useEffect(() => {
  //   sessionStorage.setItem("user", JSON.stringify(user));
  // }, [user]);
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
                      e.currentTarget.getAttribute("data-value") as ModalCategory,
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
                      {...{fetchpriority:"high"}}
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
