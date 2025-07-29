import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@components/Button";
import Bell from "@components/Bell";
import Coin from "@components/Coin";
import { useUserLogout } from "@features/user/useUserLogout";
import { useTokenStore, useUserStore } from "@store/store";
import style from "@styles/Layouts/Header.module.css";

function Header() {
  const user = useUserStore((state) => state.user);
  const accessToken = useTokenStore((state) => state?.accessToken);
  const navigate = useNavigate();
  const { mutate: handleLogout } = useUserLogout();

  return (
    <header className={style.container}>
      <section className={style.wrapper}>
        <a className={style.title} href="/main" aria-label="홈으로 이동">
          <img
            src="/images/MainLogo.webp"
            alt="MainLogo"
            width={280}
            height={36}
            {...{ fetchpriority: "high" }}
          />
        </a>
        <nav className={style.link_wrapper} aria-label="주요 메뉴">
          {accessToken ? (
            <>
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
            </>
          ) : (
            <Button
              text={"로그인"}
              width={"6rem"}
              onClick={() => navigate("/login")}
            ></Button>
          )}
        </nav>
      </section>
    </header>
  );
}

export default Header;
