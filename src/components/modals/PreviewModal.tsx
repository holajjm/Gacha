import React, { useEffect, useRef } from "react";
import style from "@styles/Layouts/modals/PreviewModal.module.css";
import { usePreviewModalState } from "@store/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const imageList = {
  미니홈: [
    "/images/MiniHomeMain.webp",
    "/images/MiniHomeMain1.webp",
    "/images/MiniHomeItemBook.webp",
    "/images/MiniHomeAdornBackground.webp",
    "/images/MiniHomeAdornItem.webp",
  ],
  둘러보기: ["/images/Explore.webp"],
  가챠: [
    "/images/Gacha.webp",
    "/images/GachaClose.webp",
    "/images/GachaOpen.webp",
  ],
  마켓: [
    "/images/Market.webp",
    "/images/MarketItemModal.webp",
    "/images/MarketSell.webp",
    "/images/MarketSellModal.webp",
    "/images/MarketEnroll.webp",
  ],
} as const;
const explainList = {
  미니홈: [
    "나만의 미니홈을 꾸밀 수 있어요!",
    "출석 체크, 팔로워/팔로잉 조회, 스코어 확인이 가능해요!",
    "댓글을 남기거나 지울 수 있어요!",
    "내가 갖고 있는 아이템 목록을 확인 할 수 있어요!",
    "보유하고 있는 배경, 아이템들로 꾸며보아요!",
  ],
  둘러보기: ["다른 유저들의 목록을 확인 할 수 있어요!"],
  가챠: [
    "보유하고 있는 코인으로 아이템을 뽑아보아요!",
    "캡슐의 애니메이션을 즐겨요!",
  ],
  마켓: [
    "마켓에 등록된 아이템들을 살펴봐요!",
    "판매중인 아이템 정보를 확인해요!",
    "내가 등록한 아이템 목록을 확인해요!",
    "내가 판매할 아이템을 등록해요!",
  ],
} as const;
export type ModalCategory = keyof typeof imageList;
function PreviewModal({ modalState }: { modalState: ModalCategory }) {
  const modalClose = usePreviewModalState((state) => state.modalClose);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    containerRef.current?.focus();
  }, []);
  const previewList = imageList[modalState].map((e: string, i: number) => (
    <SwiperSlide key={i} className={style.swiperSlide}>
      <div className={style.imgWrapper}>
        <img
          className={style.previewImg}
          src={`${e}`}
          alt="preview"
          width={500}
          height={300}
        />
      </div>
    </SwiperSlide>
  ));
  const explains = explainList[modalState].map((e: string, i: number) => (
    <li key={i}>{e}</li>
  ));
  const closeBtnByKeoboard = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      modalClose();
    }
  };
  return (
    <div
      onKeyDown={closeBtnByKeoboard}
      ref={containerRef}
      className={style.container}
      tabIndex={0}
    >
      <div className={style.wrapper}>
        <div className={style.header}>
          <h1 className={style.title}>미리보기 - {modalState}</h1>
          <button className={style.closeBtn} onClick={modalClose}>
            X
          </button>
        </div>

        <div className={style.preview}>
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={style.swiper}
          >
            {previewList}
          </Swiper>
        </div>
        <ul className={style.explainList}>{explains}</ul>
      </div>
    </div>
  );
}

export default PreviewModal;
