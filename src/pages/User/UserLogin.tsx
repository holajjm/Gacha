import React from "react"
import style from "@styles/User/UserLogin.module.css"
import { useNavigate } from "react-router-dom"

function UserLogin() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/join")
  }
  const fakeLogin = () => {
    sessionStorage.setItem("fake","fakeID");
    alert("임시 로그인 완료");
    navigate("/minihome");
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
            <button onClick={handleClick} className={style.kakao}>
              <img src="/images/KakaoLogin.png" alt="KakaoLogin" />
            </button>
            <button onClick={handleClick} className={style.github}>
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
