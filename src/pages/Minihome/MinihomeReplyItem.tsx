import React from "react"
import style from "@styles/Minihome/MinihomeReplyItem.module.css"

function MinihomeReplyItem({item}:{item:{id:number, content:string,date:string,time:string}}) {
  console.log(item);
  return (
    <div className={style.main_reply}>
      <header className={style.main_reply_header}>
        <div className={style.main_reply_user}>
          <img src="" alt="" />
          <p>holajjm</p>
        </div>
        <p className={style.main_reply_date}>{item.date}{item.time}</p>
      </header>
      <main className={style.main_reply_content}>
        <p>{item.content}</p>
      </main>
    </div>
  )
}

export default MinihomeReplyItem
