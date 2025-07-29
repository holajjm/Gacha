import React from "react";

import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";

import style from "@styles/User/UserLogin.module.css";
import { ENV } from "@constants/env";

function UserLogin() {
  usePageTitle("로그인");
  usePageUpper();
  const CLIENT_ID = ENV.KAKAO_CLIENT_ID;
  const REDIRECT_URI = ENV.KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = async () => {
    window.location.href = kakaoURL;
  };

  const githubURL =
    "https://github.com/login/oauth/authorize?client_id=Iv23lica8LFNbzOrB595";

  const githubLogin = async () => {
    window.location.href = githubURL;
  };

  return (
    <div className={style.container}>
      <section className={style.wrapper} aria-labelledby="login-title">
        <header className={style.header}>
          <h1 id="login-title" className={style.title}>
            Welcome to the
            <br />
            GACHAGACHA!
          </h1>
        </header>
        <main className={style.main}>
          <article className={style.main_wrapper}>
            <nav aria-label="Social login">
              <ul className={style.login_list}>
                <li>
                  <button onClick={kakaoLogin} className={style.kakao}>
                    <img
                      src="/images/TemporaryKakao.webp"
                      alt="카카오 로고"
                      width={24}
                      height={24}
                      {...{ fetchpriority: "high" }}
                    />
                    <span>카카오로 시작하기</span>
                  </button>
                </li>
                <li>
                  <button onClick={githubLogin} className={style.github}>
                    <img
                      src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                      alt="GitHub 로고"
                    />
                    <span>깃허브로 시작하기</span>
                  </button>
                </li>
              </ul>
            </nav>
          </article>
        </main>
      </section>
    </div>
  );
}

export default UserLogin;
