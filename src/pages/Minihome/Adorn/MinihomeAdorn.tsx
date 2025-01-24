import React, { useState } from "react"
import style from "@styles/Minihome/Adorn/MinihomeAdorn.module.css"
import MinihomeAdornBackground from "./MinihomeAdornBackground"
import MinihomeAdornItemList from "./MinihomeAdornItemList";

function MinihomeAdorn() {
  const [active, setActive] = useState<string>("");
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    setActive((e.target as HTMLElement).getHTML())
  }
  // console.log(active);
  
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <aside className={style.aside}>
          <button
            onClick={() => window.history.back()}
            className={style.aside_button}
          >
            &larr; 뒤로 가기
          </button>
          <button className={style.aside_save}>저장하기</button>
        </aside>
        <section className={style.section}>
          <header className={style.header}>꾸민 모습</header>
          <main className={style.main}>
            <nav onClick={handleClick} className={style.main_nav}>
              <button datatype="BACKGROUND" className={active === "BACKGROUND" || !active ? style.active : style.button}>BACKGROUND</button>
              <button datatype="ITEM" className={active === "ITEM" ? style.active : style.button}>ITEM</button>
            </nav>
            {active === "BACKGROUND" || !active ? <MinihomeAdornBackground /> : <MinihomeAdornItemList />}
          </main>
        </section>
      </div>
    </div>
  )
}

export default MinihomeAdorn