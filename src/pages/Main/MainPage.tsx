import React from "react";

import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
// import { motion, useScroll, useTransform } from "framer-motion";

// import MainTitle from "./MainTitle";
// import MainMiniHomePreview from "./MainMiniHomePreview";
// import MainExplorePreview from "./MainExplorePreview";
// import MainGachaPreview from "./MainGachaPreview";
// import MainMarketPreview from "./MainMarketPreview";
import style from "@styles/Main/MainPage.module.css";

// import useCustomAxios from "@hooks/useCustomAxios";

function MainPage() {
  usePageTitle("GachaGacha");
  usePageUpper();
  // const containerRef = useRef(null);
  // const { scrollYProgress } = useScroll({ container: containerRef });

  // const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  // const opacity1 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  // const opacity2 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  // const opacity3 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  // const opacity4 = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  // const scale = useTransform(scrollYProgress, [0, 0.2], [0.2, 1]);
  // const scale1 = useTransform(scrollYProgress, [0.2, 0.4], [0.4, 1]);
  // const scale2 = useTransform(scrollYProgress, [0.4, 0.6], [0.6, 1]);
  // const scale3 = useTransform(scrollYProgress, [0.6, 0.8], [0.8, 1]);
  // const scale4 = useTransform(scrollYProgress, [0.8, 1], [0.8, 1]);

  // const SERVER_API = import.meta.env.VITE_SERVER_API;
  // const axios = useCustomAxios();
  // const getcoin = async () => {
  //   const response = await axios.get(`${SERVER_API}/coin`);
  //   // console.log(response);
  // };
  // useEffect(() => {
  //   getcoin();
  // }, []);
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <section className={style.section}>
          {/* <motion.section style={{ opacity, scale }}>
            <MainTitle />
          </motion.section>
          <motion.section style={{ opacity:opacity1, scale:scale1 }}>
            <MainMiniHomePreview />
          </motion.section>
          <motion.section style={{ opacity: opacity2, scale: scale2 }}>
            <MainExplorePreview />
          </motion.section>
          <motion.section style={{ opacity: opacity3, scale: scale3 }}>
            <MainGachaPreview />
          </motion.section>
          <motion.section style={{ opacity: opacity4, scale: scale4 }}>
            <MainMarketPreview />
          </motion.section> */}
          <article className={style.header}>
            <h1 className={style.title}>
              Welcome to the
              <br />
              GACHAGACHA!
            </h1>
          </article>
          <article className={style.article}>
            <h1>MiniHome</h1>
            <div className={style.img_preview}>
              <img src="/images/MiniHomeMain.svg" alt="" />
              <img src="/images/MiniHomeMain1.svg" alt="" />
              <img src="/images/MiniHomeItemBook.svg" alt="" />
              <img src="/images/MiniHomeAdornBackground.svg" alt="" />
              <img src="/images/MiniHomeAdornItem.svg" alt="" />
            </div>
          </article>
          <article className={style.article}>
            <h1>Explore</h1>
            <div className={style.img_preview}>
              <img src="/images/Explore.svg" alt="" />
            </div>
          </article>
          <article className={style.article}>
            <h1>Gacha</h1>
            <div className={style.img_preview}>
              <img src="/images/Gacha.svg" alt="" />
              <img src="/images/GachaClose.svg" alt="" />
              <img src="/images/GachaOpen.svg" alt="" />
            </div>
          </article>
          <article className={style.article}>
            <h1>Market</h1>
            <div className={style.img_preview}>
              <img src="/images/Market.svg" alt="" />
              <img src="/images/MarketItemModal.svg" alt="" />
              <img src="/images/MarketSell.svg" alt="" />
              <img src="/images/MarketSellModal.svg" alt="" />
              <img src="/images/MarketEnroll.svg" alt="" />
            </div>
          </article>
        </section>
      </section>
    </div>
  );
}

export default MainPage;
