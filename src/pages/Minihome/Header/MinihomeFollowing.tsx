import React from 'react';
import style from "@styles/Minihome/Header/MinihomeFollowing.module.css";

function MinihomeFollowing() {
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <header className={style.header}>
          <button className={style.header_close}>X</button>
        </header>
        <main className={style.main}>
          <li className={style.list}>
            <div>
              <img src="" alt="profile" />
            </div>
            <p>holajjm</p>
            <button>삭제</button>
          </li>
        </main>
      </section>
    </div>
  )
}

export default MinihomeFollowing