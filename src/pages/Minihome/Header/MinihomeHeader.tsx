import React, { useState } from "react"
import style from "@styles/Minihome/Header/MinihomeHeader.module.css"
import { useNavigate } from "react-router-dom"
// import MinihomeFollowing from "./MinihomeFollowing";
interface MiniHomeMainData {
  followersCnt: number
  followingCnt: number
  isOwner: boolean
  layout: null
  nickname: string
  profileImageUrl: string
  score: number
  totalVisitorCnt: number
}

function MinihomeHeader({minihomeData}:{minihomeData:MiniHomeMainData}) {
  console.log(minihomeData);

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
        <img src={minihomeData?.profileImageUrl} alt="profile" />
      </div>
      <main className={style.header_user}>
        <div className={style.header_user_info}>
          <p className={style.header_user_name}>{minihomeData?.nickname}</p>
          <div className={style.header_info}>
            <p>스코어 {minihomeData?.score}</p>
            <p>팔로워 {minihomeData?.followersCnt}</p>
            <p datatype="Following" onClick={handleFollowingClick}>팔로잉 {minihomeData?.followingCnt}</p>
          </div>
        </div>
        {minihomeData && minihomeData.isOwner ? (
          <div className={style.header_bottom}>
            <button onClick={() => navigate(`/minihome/itembook`)} className={style.header_button}>아이템 북 관리</button>
            <button onClick={() => navigate(`/minihome/adorn`)} className={style.header_button}>미니홈 꾸미기</button>
          </div>
        ) : null}
      </main>
    </header>
  )
}

export default MinihomeHeader
