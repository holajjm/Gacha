import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProfileImg from "@constants/Profile.ts";
import Button from "@components/Button";
import MinihomeFollowerModal from "@components/modals/MinihomeFollowerModal";
import MinihomeFollowingModal from "@components/modals/MinihomeFollowingModal";
import { useMinihomeCoin } from "@features/minihome/useMinihomeCoin";
import { useUnfollow } from "@features/minihome/useUnfollow";
import { useFollowing } from "@features/minihome/useFollowing";
import { ModalPortal } from "@hooks/ModalPortal";
import {
  useFollowerModalState,
  useFollowingModalState,
  useUserStore,
} from "@store/store.ts";
import style from "@styles/Minihome/Header/MinihomeHeader.module.css";

import { FcSettings } from "react-icons/fc";
import type { MiniHomeMainData } from "types/minihome";

function MinihomeHeader({ minihomeData }: { minihomeData: MiniHomeMainData }) {
  const navigate = useNavigate();
  const { nickname } = useParams<{ nickname: string }>();

  const user = useUserStore((state) => state.user);
  const followerModal = useFollowerModalState((state) => state.modal);
  const followerModalOpen = useFollowerModalState((state) => state.modalOpen);
  const followingModal = useFollowingModalState((state) => state.modal);
  const followingModalOpen = useFollowingModalState((state) => state.modalOpen);

  // 유저 팔로잉하기 기능
  const { mutate: getFollowing } = useFollowing({ minihomeData });

  // 유저 언팔로우 기능
  const { mutate: getUnFollowing } = useUnfollow({ minihomeData });

  // 출석체크 및 코인 획득 로직
  const { mutate: createPost } = useMinihomeCoin();
  // console.log(minihomeData);1

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
            width={160}
            height={160}
            {...{ fetchpriority: "high" }}
            decoding="async"
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
              <p datatype="Follower" onClick={() => followerModalOpen()}>
                팔로워{" "}
                {minihomeData?.followersCnt ? minihomeData?.followersCnt : 0}
              </p>
              <p datatype="Following" onClick={() => followingModalOpen()}>
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
