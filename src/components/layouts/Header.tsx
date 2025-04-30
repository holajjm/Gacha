import React from "react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@store/store";
import Button from "@components/Button";

import Coin from "@components/Coin";
import Bell from "@components/Bell";
import style from "@styles/Layouts/Header.module.css";

function Header() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const navigate = useNavigate();
  const handleLogout = async () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      await fetch(`${SERVER_API}/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.refreshToken}`,
        },
      });
      sessionStorage.removeItem("user");
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      alert("로그아웃 완료");
      navigate("/main");
      window.location.reload();
    }
  };

  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <a className={style.title} href="/main">
          <img src="/images/MainLogo.webp" alt="MainLogo" width={280} height={36} loading="eager"/>
        </a>
        {user && user?.accessToken ? (
          <div className={style.link_wrapper}>
            <Bell />
            <Coin />
            <Button
              text={"미니홈"}
              width={"6rem"}
              onClick={() => navigate(`/minihome/${user?.nickname}`)}
            ></Button>
            <Button
              text={"둘러보기"}
              width={"6rem"}
              onClick={() => navigate("/explore")}
            ></Button>
            <Button
              text={"뽑기"}
              width={"6rem"}
              onClick={() => navigate("/gacha")}
            ></Button>
            <Button
              text={"마켓"}
              width={"6rem"}
              onClick={() => navigate("/market")}
            ></Button>
            <Button
              text={"로그아웃"}
              width={"6rem"}
              onClick={handleLogout}
            ></Button>
          </div>
        ) : (
          <div className={style.link_wrapper}>
            <Button
              text={"로그인"}
              width={"6rem"}
              onClick={() => navigate("/login")}
            ></Button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Header;
