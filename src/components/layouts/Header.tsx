import React from "react"
import { Link, useNavigate } from "react-router-dom"
import style from "@styles/Layouts/Header.module.css"

function Header() {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem("fake")
    alert("로그아웃 완료")
    navigate("/")
  }
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <a className={style.title} href="/">
          <img src="/images//MainLogo.svg" alt="MainLogo" />
        </a>
        {sessionStorage.getItem("fake") ? (
          <div className={style.link_wrapper}>
            <Link to={"/minihome"} className={style.link}>
              MINIHOME
            </Link>
            <Link to={"/explore"} className={style.link}>
              EXPLORE
            </Link>
            <Link to={"/gacha"} className={style.link}>
              GACHA
            </Link>
            <Link to={"/market"} className={style.link}>
              MARKET
            </Link>
            <button onClick={handleLogout} className={style.link}>
              LOGOUT
            </button>
          </div>
        ) : (
          <div className={style.link_wrapper}>
            <Link to={"/login"} className={style.link}>
              LOGIN
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

export default Header
