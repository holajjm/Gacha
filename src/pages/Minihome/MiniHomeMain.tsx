import React, { useEffect, useState } from "react";
import style from "@styles/Minihome/MiniHomeMain.module.css";
import MinihomeReplyNew from "./MinihomeReplyNew";
// import MinihomeHeader from "./Header/MinihomeHeader";
import { useUserStore } from "@store/store";
import { useNavigate, useParams } from "react-router-dom";
import MinihomeFollowing from "./Header/MinihomeFollowing";
import MinihomeFollower from "./Header/MinihomeFollower";
import useImage from "@hooks/useImage";

interface MiniHomeMainData {
  followersCnt: number;
  followingCnt: number;
  isOwner: boolean;
  layout: null;
  nickname: string;
  profileImageStoreFileName: string;
  score: number;
  totalVisitorCnt: number;
  isFollowing: boolean;
}

function MiniHomeMain() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const { nickname } = useParams<{ nickname: string }>();
  const [minihomeData, setMinihomeData] = useState<MiniHomeMainData>({
    followersCnt: 0,
    followingCnt: 0,
    isOwner: true,
    layout: null,
    nickname: "",
    profileImageStoreFileName: "",
    score: 0,
    totalVisitorCnt: 0,
    isFollowing: false,
  });
  const getMinihomeInfo = async () => {
    if (!user?.accessToken) {
      console.warn("User information is missing");
      return;
    }
    try {
      const response = await fetch(
        `${SERVER_API}/minihomes/${nickname && nickname}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user && user?.accessToken}`,
          },
        },
      );
      const data = await response.json();
      setMinihomeData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMinihomeInfo();
  }, []);

  const navigate = useNavigate();
  const [followerClick, setFollowerClick] = useState<boolean>(false);
  const [followingClick, setFollowingClick] = useState<boolean>(false);
  const handleFollowerClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log((e.target as HTMLElement).getAttribute("datatype"));
    setFollowerClick(!followerClick);
  };
  const handleFollowingClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log((e.target as HTMLElement).getAttribute("datatype"));
    setFollowingClick(!followingClick);
  };
  const handleFollowerClose = () => {
    setFollowerClick(false);
  };
  const handleFollowingClose = () => {
    setFollowingClick(false);
  };

  // 유저 팔로잉하기 기능
  const handleFollowing = async (minihomeData: MiniHomeMainData) => {
    if (!minihomeData?.nickname) {
      console.error("사용자 닉네임이 존재하지 않아 요청을 보낼 수 없습니다.");
      return;
    }
    if (confirm(`${minihomeData?.nickname}님을 팔로잉 하시겠습니까?`)) {
      try {
        await fetch(`${SERVER_API}/users/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          body: JSON.stringify({
            followeeUserNickname: minihomeData?.nickname,
          }),
        });
        getMinihomeInfo();
      } catch (error) {
        console.log(error);
      }
    }
  };
  // 유저 언팔로우 기능
  const handleUnFollowing = async (minihomeData: MiniHomeMainData) => {
    if (confirm(`${minihomeData?.nickname}님을 언팔로우 하시겠습니까?`)) {
      try {
        await fetch(`${SERVER_API}/users/unfollow`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          body: JSON.stringify({
            followeeUserNickname: minihomeData?.nickname,
          }),
        });
        alert("언팔로우 되었습니다.");
        getMinihomeInfo();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={style.container}>
      <section className={style.wrapper}>
        {/* --------------------- */}
        {/* <MinihomeHeader minihomeData={minihomeData} /> */}
        {followerClick ? (
          <MinihomeFollower handleFollowerClose={handleFollowerClose} />
        ) : null}
        {followingClick ? (
          <MinihomeFollowing handleFollowingClose={handleFollowingClose} />
        ) : null}
        <header className={style.header}>
          <div className={style.header_profile}>
            <img
              src={useImage(minihomeData?.profileImageStoreFileName)}
              alt="profile"
            />
          </div>
          <main className={style.header_user}>
            <div className={style.header_user_info}>
              <p className={style.header_user_name}>{nickname}</p>
              <div className={style.header_info}>
                <p>스코어 {minihomeData?.score ? minihomeData?.score : 0}</p>
                <p datatype="Follower" onClick={handleFollowerClick}>
                  팔로워{" "}
                  {minihomeData?.followersCnt ? minihomeData?.followersCnt : 0}
                </p>
                <p datatype="Following" onClick={handleFollowingClick}>
                  팔로잉{" "}
                  {minihomeData?.followingCnt ? minihomeData?.followingCnt : 0}
                </p>
              </div>
            </div>
            {minihomeData?.isOwner ? (
              <div className={style.header_bottom}>
                <button
                  onClick={() => navigate(`/minihome/itembook`)}
                  className={style.header_button}
                >
                  아이템 북 관리
                </button>
                <button
                  onClick={() => navigate(`/minihome/adorn`)}
                  className={style.header_button}
                >
                  미니홈 꾸미기
                </button>
              </div>
            ) : (
              <div className={style.header_bottom}>
                {minihomeData?.isFollowing ? (
                  <button
                    onClick={() => handleUnFollowing(minihomeData)}
                    className={style.header_button}
                  >
                    팔로우 끊기
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollowing(minihomeData)}
                    className={style.header_button}
                  >
                    팔로잉하기
                  </button>
                )}
              </div>
            )}
          </main>
        </header>
        {/* --------------------- */}
        <main className={style.main}>
          <aside className={style.main_people}>
            총 방문자 수{" "}
            {minihomeData?.totalVisitorCnt ? minihomeData?.totalVisitorCnt : 0}
          </aside>
          <section className={style.main_section_1}>꾸민 모습</section>
          <section className={style.main_section_2}>
            <div className={style.background_section}></div>
            <MinihomeReplyNew />
          </section>
        </main>
      </section>
    </div>
  );
}

export default MiniHomeMain;
