import React from "react"
import style from "@styles/User/UserLogin.module.css"
import { useNavigate } from "react-router-dom"

function UserLogin() {
  const navigate = useNavigate();
  const fakeLogin = () => {
    sessionStorage.setItem("fake", "fakeID")
    alert("임시 로그인 완료")
    navigate("/minihome")
  }
  const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = async () => {
    window.location.href = kakaoURL;
  }

  const githubLogin = async () => {
    const response = await fetch(
      "https://github.com/login/oauth/authorize?client_id=Iv23lica8LFNbzOrB595",
    )
    const data = await response.json()
    console.log(data)
  }
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.title}>
            Welcome to the
            <br />
            GACHAGACHA!
          </h1>
        </header>
        <main className={style.main}>
          <div className={style.main_wrapper}>
            <button onClick={kakaoLogin} className={style.kakao}>
              <img src="/images/KakaoLogin.png" alt="KakaoLogin" />
            </button>
            <button onClick={githubLogin} className={style.github}>
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="GitHub Logo"
              />
              <p>깃허브로 시작하기</p>
            </button>
            <button onClick={fakeLogin}>임시 로그인</button>
          </div>
        </main>
      </section>
    </div>
  )
}

export default UserLogin
