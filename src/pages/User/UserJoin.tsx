import React from "react"
import style from "@styles/User/UserJoin.module.css"

function UserJoin() {
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
          <header className={style.main_header}>
            <div className={style.main_header_img}>
              <img className={style.main_img1} src="/images/Camera.svg" alt="profile" />
              <img className={style.main_img2} src="/images/Camera.svg" alt="Camera" />
            </div>
            <button>기본 이미지로 설정</button>
          </header>
          <section className={style.main_main}>
            <div className={style.main_wrapper}>
              <div className={style.main_main_title}>닉네임</div>
              <div className={style.main_main_contents}>
                <input type="text" placeholder="닉네임"/>
                <button>Enter</button>
              </div>
              <p className={style.main_main_error}>이미 사용중인 닉네임입니다.</p>
            </div>
          </section>
        </main>
      </section>
    </div>
  )
}

export default UserJoin
