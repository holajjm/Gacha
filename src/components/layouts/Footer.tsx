import React from 'react'
import style from '@styles/Layouts/Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className={style.container}>
      <div className={style.wrapper}>
        <header className={style.header}>
          <p>이용약관</p>
          <Link to="https://github.com/gachagacha-team">
            프로젝트
          </Link>
          <p>개인정보처리방침</p>
          <p>고객센터</p>
        </header>
        <main className={style.main}>
          <Link to="https://github.com/gachagacha-team">
            @GACHAGACHA
          </Link>
        </main>
      </div>
    </footer>
  )
}

export default Footer