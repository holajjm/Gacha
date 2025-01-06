import React from 'react';
import style from '@styles/Minihome/MiniHomeMain.module.css';
import MinihomeReplyNew from './MinihomeReplyNew';
import MinihomeHeader from './Header/MinihomeHeader';

function MiniHomeMain() {
  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        <MinihomeHeader />
        <main className={style.main}>
          <aside className={style.main_people}>총 방문자 수 78</aside>
          <section className={style.main_section_1}>꾸민 모습</section>
          <section className={style.main_section_2}>
            <div className={style.background_section}></div>
            <MinihomeReplyNew />
          </section>
        </main>
      </section>
    </div>
  )
}

export default MiniHomeMain;