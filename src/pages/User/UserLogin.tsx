import React from "react";
// import { useNavigate } from "react-router-dom"
// import { useStore } from "@store/store";
import style from "@styles/User/UserLogin.module.css";

function UserLogin() {
  // const {count, increment, decrement} = useStore((state) => state);
  // const navigate = useNavigate();
  // const fakeLogin = () => {
  //   sessionStorage.setItem("fake", "fakeID")
  //   alert("임시 로그인 완료")
  //   navigate("/minihome")
  // }
  const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const kakaoLogin = async () => {
    window.location.href = kakaoURL;
  };

  const githubURL =
    "https://github.com/login/oauth/authorize?client_id=Iv23lica8LFNbzOrB595";
  const githubLogin = async () => {
    window.location.href = githubURL;
  };
  const handleTest = async () => {
    const response = await fetch("https://61.79.183.245:80/test", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `http://localhost:5173`,
        "Access-Control-Allow-Credentials": "true",
      },
    });
    const data = await response.json();
    const cookie = response.headers.get("Set-Cookie");
    console.log(cookie);
    console.log(data);
    
  };

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
            <button onClick={handleTest}>test</button>
            {/* <button onClick={fakeLogin}>임시 로그인</button>
            <p>{count}</p>
            <button onClick={() => increment()}>plus</button>
            <button onClick={() => decrement()}>minus</button> */}
          </div>
        </main>
      </section>
    </div>
  );
}

export default UserLogin;
