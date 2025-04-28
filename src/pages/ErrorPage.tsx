import React from "react";

import Footer from "@components/layouts/Footer";
import Header from "@components/layouts/Header";
import style from "@styles/ErrorPage.module.css";

function ErrorPage() {
  return (
    <>
      <Header />
      <section className={style.section}>
        <article className={style.wrapper}>
          <h1 className={style.error_title}>
            Page not Found
          </h1>
          <p className={style.error_desc}>
            서버와의 통신이 원활하지 않아
            <br />
            데이터를 불러올 수 없습니다
          </p>
          <img className={style.image} src="/images/Error.webp" alt="error" width={480} height={480} />
        </article>
      </section>
      <Footer />
    </>
  );
}

export default ErrorPage;
