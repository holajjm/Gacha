import React, { useState } from "react"
import style from "@styles/Minihome/Header/MinihomeHeader.module.css"
import { useNavigate } from "react-router-dom"
// import MinihomeFollowing from "./MinihomeFollowing";

function MinihomeHeader() {
  const navigate = useNavigate();
  const [followingClick, setFollowingClick] = useState<boolean>(false);
  const handleFollowingClick = (e:React.MouseEvent<HTMLElement>) => {
    console.log((e.target as HTMLElement).getAttribute("datatype"));
    setFollowingClick(!followingClick);
  }
  // console.log(followingClick);
  
  return (
    <header className={style.header}>
      {/* {followingClick ? <MinihomeFollowing /> : null} */}
      <div className={style.header_profile}>
        <img src="/images/Sample.svg" alt="profile" />
      </div>
      <main className={style.header_user}>
        <div className={style.header_user_info}>
          <p className={style.header_user_name}>olsohee</p>
          <div className={style.header_info}>
            <p>랭킹: 상위 5%</p>
            <p>팔로워 210</p>
            <p datatype="Following" onClick={handleFollowingClick}>팔로잉 100</p>
          </div>
        </div>
        <div className={style.header_bottom}>
          <button onClick={() => navigate(`/minihome/itembook`)} className={style.header_button}>아이템 북 관리</button>
          <button onClick={() => navigate(`/minihome/adorn`)} className={style.header_button}>미니홈 꾸미기</button>
        </div>
      </main>
    </header>
  )
}

export default MinihomeHeader
