import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  useFollowerModalState,
  useFollowingModalState,
  useUserStore,
} from "@store/store.ts";
import useCustomAxios from "@hooks/useCustomAxios";
import { ModalPortal } from "@hooks/ModalPortal";
import Button from "@components/Button";
import { toast } from "react-toastify";
import ProfileImg from "@constants/Profile.ts";

import MinihomeFollowerModal from "@components/modals/MinihomeFollowerModal";
import MinihomeFollowingModal from "@components/modals/MinihomeFollowingModal";
import { FcSettings } from "react-icons/fc";
import style from "@styles/Minihome/Header/MinihomeHeader.module.css";
import { MiniHomeMainData } from "types/minihome";



function MinihomeHeader({ minihomeData }: { minihomeData: MiniHomeMainData }) {
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { nickname } = useParams<{ nickname: string }>();
  const { user } = useUserStore((state) => state);
  const { modal: followerModal, modalOpen: followerModalOpen } =
    useFollowerModalState((state) => state);
  const { modal: followingModal, modalOpen: followingModalOpen } =
    useFollowingModalState((state) => state);

  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);

  const handleFollowerClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log((e.target as HTMLElement).getAttribute("datatype"));
    followerModalOpen();
  };
  const handleFollowingClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log((e.target as HTMLElement).getAttribute("datatype"));
    followingModalOpen();
  };

  // 유저 팔로잉하기 기능
  const { mutate: getFollowing } = useMutation({
    mutationFn: async () => {
      if (!minihomeData?.nickname) {
        console.error("사용자 닉네임이 존재하지 않아 요청을 보낼 수 없습니다.");
        return;
      }
      if (confirm(`${minihomeData?.nickname}님을 팔로우 할까요?`)) {
        const response = await axios.post("/users/follow", {
          followeeUserNickname: minihomeData?.nickname,
        });
        // console.log(response?.data);
        toast("팔로잉 되었습니다.");
        return response?.data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Minihome"] });
      if (data?.error) {
        alert(data?.error?.message);
      }
      // console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 유저 언팔로우 기능
  const { mutate: getUnFollowing } = useMutation({
    mutationFn: async () => {
      if (!minihomeData?.nickname) {
        console.error("사용자 닉네임이 존재하지 않아 요청을 보낼 수 없습니다.");
        return;
      }
      if (confirm(`${minihomeData?.nickname}님을 언팔로우 할까요?`)) {
        const response = await axios.delete("/users/unfollow", {
          data: {
            followeeUserNickname: minihomeData?.nickname,
          },
        });
        // console.log(response?.data);
        toast("언팔로우 되었습니다.");
        return response?.data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Minihome"] });
      if (data?.error) {
        alert(data?.error?.message);
      }
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 출석체크 및 코인 획득 로직
  const { mutate: createPost } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/attend", null);
      // console.log(response?.data);
      return response?.data;
    },
    onSuccess: (data) => {
      if (data?.error) {
        alert(data?.error?.message);
      } else {
        toast(`출석 체크 완료! 코인 ${data?.bonusCoin}개 획득!`);
        queryClient.invalidateQueries({ queryKey: ["coin"] });
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  // console.log(minihomeData);

  return (
    <>
      {followerModal && (
        <ModalPortal>
          <MinihomeFollowerModal />
        </ModalPortal>
      )}
      {followingModal && (
        <ModalPortal>
          <MinihomeFollowingModal />
        </ModalPortal>
      )}
      <header className={style.header}>
        <p className={style.header_profile}>
          <img
            src={
              minihomeData?.profileId
                ? ProfileImg[Number(minihomeData?.profileId - 1)]?.profileImg
                : "/images/ReadyForImage.webp"
            }
            alt="profile"
            ref={imgRef}
            width={160}
            height={160}
          />
        </p>
        <section className={style.section}>
          <header className={style.section_header}>
            <article className={style.section_article}>
              <h1 className={style.section_article_title}>{nickname}</h1>
              {minihomeData?.isOwner && minihomeData?.isOwner ? (
                <>
                  <div onClick={() => createPost()}>
                    <img
                      src="/images/NewCoin.webp"
                      alt="coin"
                      className={style.section_article_coin}
                    />
                    <p>출석체크하고 코인 받기!</p>
                  </div>
                  <FcSettings
                    className={style.section_article_setting}
                    onClick={() => navigate("/edit")}
                  />
                </>
              ) : null}
            </article>
            <nav className={style.section_info}>
              <p>스코어 {minihomeData?.score ? minihomeData?.score : 0}</p>
              <p datatype="Follower" onClick={handleFollowerClick}>
                팔로워{" "}
                {minihomeData?.followersCnt ? minihomeData?.followersCnt : 0}
              </p>
              <p datatype="Following" onClick={handleFollowingClick}>
                팔로잉{" "}
                {minihomeData?.followingCnt ? minihomeData?.followingCnt : 0}
              </p>
            </nav>
          </header>
          {nickname === user?.nickname ? (
            <article className={style.section_bottom}>
              <Button
                text={"아이템 북 관리"}
                width={"100%"}
                onClick={() => navigate(`/minihome/itembook`)}
              ></Button>
              <Button
                text={"미니홈 꾸미기"}
                width={"100%"}
                onClick={() => navigate(`/minihome/adorn`)}
              ></Button>
            </article>
          ) : (
            <article className={style.section_bottom}>
              {minihomeData?.isFollowing ? (
                <Button
                  text={"팔로우 끊기"}
                  width={"100%"}
                  onClick={() => getUnFollowing()}
                ></Button>
              ) : (
                <Button
                  text={"팔로잉하기"}
                  width={"100%"}
                  onClick={() => getFollowing()}
                ></Button>
              )}
            </article>
          )}
        </section>
      </header>
    </>
  );
}

export default MinihomeHeader;
