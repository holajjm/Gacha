import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@store/store";
import Button from "@components/Button";
import usePageTitle from "@hooks/usePageTitle";
import useImage from "@hooks/useImage";
import usePageUpper from "@hooks/usePageUpper";

import MinihomeAdornBackground from "./MinihomeAdornBackground";
import MinihomeAdornItemList from "./MinihomeAdornItemList";
import MinihomeAdornDraggableItem from "./MinihomeAdornDraggableItem";
import MinihomeAdornEditDraggableItem from "./MinihomeAdornEditDraggableItem";
// import MiniHomeItem from "../MiniHomeItem";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Minihome/Adorn/MinihomeAdorn.module.css";

interface BackgroundItemData {
  backgroundId: number;
  imageUrl: string;
}

interface AdornItemData {
  imageUrl: string;
  itemGrade: string;
  itemId: number;
  subId: number;
}
interface AdornItem {
  itemId: number;
  subId: number;
  x: number;
  y: number;
}
interface AdornFetchData {
  backgroundId: number;
  items: AdornItem[];
}
interface Position {
  x: number;
  y: number;
}
interface AdornPageData {
  background: {
    backgroundId: number;
    imageUrl: string;
  };
  items: [
    {
      imageUrl: string;
      itemId: number;
      subId: number;
      x: number;
      y: number;
    },
  ];
}

function MinihomeAdorn() {
  usePageTitle("미니홈 - 꾸미기");
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>("BACKGROUND");
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActive((e.target as HTMLElement).getAttribute("datatype"));
  };
  // ---------------------------------------------배경 상태값
  const [background, setBackground] = useState<BackgroundItemData>({
    backgroundId: 0,
    imageUrl: "",
  });
  const handleBackground = (data: BackgroundItemData) => {
    setBackground(data);
  };

  // ---------------------------------------------아이템
  const [items, setItems] = useState<AdornItemData[]>([]);
  const [item, setItem] = useState<AdornItemData>({
    imageUrl: "",
    itemGrade: "",
    itemId: 0,
    subId: 0,
  });

  const handleItem = (data: AdornItemData) => {
    setItem(data);
  };
  useEffect(() => {
    setItems((items) => [...items, item]);
  }, [item]);
  // console.log("items:", items);
  // console.log("item:", item);

  // ---------------------------------------------각 아이템 좌표값 가져오기
  const [itemPosition, setItemPosition] = useState<Position>({ x: 0, y: 0 });
  const handleItemPosition = (position: Position) => {
    setItemPosition({
      x: position?.x,
      y: position?.y,
    });
  };
  // console.log(itemPosition);

  // ---------------------------------------------아이템 렌더링
  const draggableItems = items
    .filter((e) => e.itemId !== 0)
    .map((e, i) => (
      <MinihomeAdornDraggableItem
        key={i}
        data={e}
        handleItemPosition={handleItemPosition}
      />
    ));
  // console.log("draggableItems:",draggableItems);

  // ---------------------------------------------개별 아이템
  const [adornItemArr, setAdornItemArr] = useState<AdornItem[]>([]);
  const [adornItem, setAdornItem] = useState<AdornItem>({
    itemId: 0,
    subId: 0,
    x: 0,
    y: 0,
  });

  // 가져온 좌표값과 선택된 아이템 데이터의 아이디 값을 활용하여 서버에 전송할 초기 데이터 생성
  useEffect(() => {
    setAdornItem({
      itemId: item?.itemId,
      subId: item?.subId,
      x: itemPosition?.x,
      y: itemPosition?.y,
    });
  }, [item, itemPosition]);

  // 아이템 데이터들을 활용한 서버 요청 body에 담을 items 배열 생성
  useEffect(() => {
    setAdornItemArr((prev) => [...prev, adornItem]);
  }, [adornItem]);

  // console.log(
  //   "adornItemArr:",
  //   adornItemArr.filter((e) => e.itemId !== 0),
  // );
  // console.log("adornItem:", adornItem);

  const [filterAdornArr, setFilterAdornArr] = useState<AdornItem[]>([]);
  useEffect(() => {
    const arr = adornItemArr.filter(
      (e, i) =>
        e.itemId !== 0 &&
        i === adornItemArr.findLastIndex((e1) => e1.itemId === e.itemId),
    );
    setFilterAdornArr(arr);
  }, [adornItemArr]);
  // console.log("filterAdornArr:",filterAdornArr);

  // --------------------------------------------body에 담을 데이터
  const [adornFetchData, setAdornFetchData] = useState<AdornFetchData>({
    backgroundId: 0,
    items: [
      {
        itemId: 0,
        subId: 0,
        x: 0,
        y: 0,
      },
    ],
  });
  // console.log("adornFetchData:", adornFetchData);

  // 배경 요소와 아이템 배열을 하나의 상태값으로 합쳐 서버에 전송할 데이터 상태값 생성
  useEffect(() => {
    setAdornFetchData({
      backgroundId: background?.backgroundId,
      items: filterAdornArr,
    });
  }, [background, filterAdornArr]);

  // ---------------------------------------------꾸민 영역 저장 로직
  const saveAdorn = async () => {
    if (confirm("저장하시겠습니까?")) {
      try {
        const response = await fetch(
          `${SERVER_API}/decoration/${user?.nickname}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.accessToken}`,
            },
            body: JSON.stringify(adornFetchData),
          },
        );
        console.log(await response.json());
        alert("저장되었습니다.");
        navigate(`/minihome/${user?.nickname}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // -------------------------------------------꾸민 영역 호출 로직
  const [adornPage, setAdornPage] = useState<AdornPageData>({
    background: {
      backgroundId: 0,
      imageUrl: "",
    },
    items: [
      {
        imageUrl: "",
        itemId: 0,
        subId: 0,
        x: 0,
        y: 0,
      },
    ],
  });
  const getAdorn = async () => {
    const response = await fetch(`${SERVER_API}/decoration/${user?.nickname}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.json();
    setAdornPage(data?.data);
    setBackground(data?.data?.background);
  };
  useEffect(() => {
    getAdorn();
  }, []);
  // console.log("adornPage:", adornPage);

  // 아이템 조회만 가능
  // const getAdornItemList = adornPage?.items.map((e) => (
  //   <MiniHomeItem
  //     key={e?.subId}
  //     imageUrl={e?.imageUrl}
  //     positionX={e?.x}
  //     positionY={e?.y}
  //   />
  // ));

  // --------------------------------------꾸민 영역 가져오되 아이템 요소들 draggable한 요소로 설정하는 로직
  // 위치 조작 가능하지만 값 저장이 안됌
  const [editPosition, setEditPosition] = useState<Position>({ x: 0, y: 0 });
  const handleEditPosition = (position: Position) => {
    setEditPosition({
      x: position?.x,
      y: position?.y,
    });
  };
  const draggableEditItems = adornPage?.items.map((e) => (
    <MinihomeAdornEditDraggableItem
      key={e?.subId}
      data={e}
      handleEditPosition={handleEditPosition}
    />
  ));
  useEffect(() => {
    adornPage?.items.forEach((e) =>
      setAdornItem({
        itemId: e?.itemId,
        subId: e?.subId,
        x: editPosition?.x,
        y: editPosition?.y,
      }),
    );
  }, [adornPage,editPosition]);
  // console.log(adornItem);
  

  return (
    <div className={style.container}>
      <main className={style.wrapper}>
        <header className={style.header}>
          <aside className={style.header_aside}>
            <Button
              text={<SlArrowLeft />}
              width={"2.5rem"}
              onClick={() => window.history.back()}
            ></Button>
            <h1 className={style.header_aside_title}>미니홈 꾸미기</h1>
          </aside>
          <Button text={"저장하기"} width={"20%"} onClick={saveAdorn}></Button>
        </header>
        <article className={style.article}>
          <header className={style.article_header}>
            <img
              className={style.article_header_background}
              src={useImage(
                !background?.backgroundId
                  ? adornPage?.background?.imageUrl
                  : (background?.imageUrl as string),
              )}
              alt=""
            />
            {/* {!adornPage?.items.length ? draggableItems : draggableEditItems} */}
            {/* {draggableItems} */}
            {/* {getAdornItemList} */}
            {adornPage?.items.length ? draggableEditItems : draggableItems}
          </header>
          <section className={style.section}>
            <nav onClick={handleClick} className={style.section_nav}>
              <button
                datatype="BACKGROUND"
                className={
                  active === "BACKGROUND" || !active
                    ? style.active
                    : style.button
                }
              >
                배경
              </button>
              <button
                datatype="ITEM"
                className={active === "ITEM" ? style.active : style.button}
              >
                아이템
              </button>
            </nav>
            {active === "BACKGROUND" || !active ? (
              <MinihomeAdornBackground getBack={handleBackground} />
            ) : (
              <MinihomeAdornItemList getItem={handleItem} />
            )}
          </section>
        </article>
      </main>
    </div>
  );
}

export default MinihomeAdorn;
