import React from "react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@store/store";
import Button from "@components/Button";

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
  // 임시 회원 탈퇴 기능
  const handleWithDraw = async () => {
    if (confirm("탈퇴할까요?")) {
      await fetch(`${SERVER_API}/withdraw`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.refreshToken}`,
        },
      });
      sessionStorage.removeItem("user");
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      alert("회원 탈퇴 완료");
      navigate("/main");
      window.location.reload();
    }
  };

  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <a className={style.title} href="/main">
          <img src="/images/MainLogo.svg" alt="MainLogo" />
        </a>
        {user && user?.accessToken ? (
          <div className={style.link_wrapper}>
            <button onClick={() => handleWithDraw()}>회원 탈퇴</button>
            <Button
              text={"MINIHOME"}
              width={"6rem"}
              onClick={() => navigate(`/minihome/${user?.nickname}`)}
            ></Button>
            <Button
              text={"EXPLORE"}
              width={"6rem"}
              onClick={() => navigate("/explore")}
            ></Button>
            <Button
              text={"GACHA"}
              width={"6rem"}
              onClick={() => navigate("/gacha")}
            ></Button>
            <Button
              text={"MARKET"}
              width={"6rem"}
              onClick={() => navigate("/market")}
            ></Button>
            <Button
              text={"LOGOUT"}
              width={"6rem"}
              onClick={handleLogout}
            ></Button>
          </div>
        ) : (
          <div className={style.link_wrapper}>
            <Button
              text={"LOGIN"}
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
