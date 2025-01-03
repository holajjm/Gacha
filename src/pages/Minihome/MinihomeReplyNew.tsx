import React, { useRef, useState } from "react";
import style from "@styles/Minihome/MinihomeReplyNew.module.css";
import MinihomeReplyItem from "./MinihomeReplyItem";

function MinihomeReplyNew() {
  const [input, setInput] = useState<string>("");
  const [item,setItem] = useState<{id:number,content:string,date:string,time:string}[]>([]);
  const inputRef = useRef<number>(0);

  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleClick = () => {
    if(input.length !== 0){
      const newValue = {
        id: inputRef.current++,
        content:input,
        date:new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      }
      setItem((prev) => [...prev,newValue])
      setInput("")
    }
    return
  }
  
  const replyList = item.map(e => <MinihomeReplyItem key={e.id} item={e} />);

  return (
    <div className={style.main_reply}>
      <header className={style.main_reply_input}>
        <input type="text" value={input} onChange={handleInput} placeholder="방명록을 남겨보세요" />
        <button onClick={handleClick}>등록</button>
      </header>
      <main className={style.main_replyList}>
        {replyList}
      </main>
    </div>
  )
}

export default MinihomeReplyNew
