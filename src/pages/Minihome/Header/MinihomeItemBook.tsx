import React, { useState } from "react"
import style from "@styles/Minihome/Header/MinihomeItemBook.module.css"

function MinihomeItemBook() {
  const [click, setClick] = useState<string>("");
  const handleClick = (e:React.MouseEvent<HTMLElement>) => {
    setClick((e.target as HTMLElement).getAttribute("datatype") as string);
  }
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <header className={style.header}>
          <button onClick={() => window.history.back()} className={style.header_button}>&larr; 뒤로 가기</button>
        </header>
        <main className={style.main}>
          <nav onClick={handleClick} className={style.main_nav}>
            <button className={click === "All" ? style.active_button : style.button} datatype="All">All</button>
            <button className={click === "S" ? style.active_button : style.button} datatype="S">S등급</button>
            <button className={click === "A" ? style.active_button : style.button} datatype="A">A등급</button>
            <button className={click === "B" ? style.active_button : style.button} datatype="B">B등급</button>
            <button className={click === "C" ? style.active_button : style.button} datatype="C">C등급</button>
            <button className={click === "D" ? style.active_button : style.button} datatype="D">D등급</button>
          </nav>
          <section className={style.main_contents}>
            <div className={style.main_contents_wrapper}>
              <div>
                <img src="/images/Sample.svg" alt="sample" />
                <div className={style.item}>
                  <p>S</p>
                  <p>주황 고양이 / 1개</p>
                </div>
              </div>
              <div>
                <img src="/images/Sample.svg" alt="sample" />
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>

            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default MinihomeItemBook
