import React, { useEffect, useState } from "react";

import useImage from "@hooks/useImage";
import Button from "@components/Button";

import MinihomeAdornBackground from "./MinihomeAdornBackground";
import MinihomeAdornItemList from "./MinihomeAdornItemList";
import { SlArrowLeft } from "react-icons/sl";
import style from "@styles/Minihome/Adorn/MinihomeAdorn.module.css";
import MinihomeAdornEditDraggableItem from "./MinihomeAdornEditDraggableItem";
import usePageTitle from "@hooks/usePageTitle";
import usePageUpper from "@hooks/usePageUpper";
import { useUserStore } from "@store/store";
import { useNavigate } from "react-router-dom";
import MinihomeAdornDraggableItem from "./MinihomeAdornDraggableItem";
import { AdornFetchData, AdornItem, AdornItemData, AdornPageData, BackgroundItemData, NewData, Position } from "types/minihome";


function MinihomeAdornEdit({ adornPage }: { adornPage: AdornPageData }) {
  usePageTitle("MiniHome - Adorn");
  usePageUpper();
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const user = useUserStore((state) => state.user);
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

  // ---------------------------------------------각 아이템 좌표값 가져오기
  const [itemPosition, setItemPosition] = useState<Position>({ x: 0, y: 0 });
  const handleItemPosition = (position: Position) => {
    setItemPosition({
      x: position?.x,
      y: position?.y,
    });
  };

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

  const [filterAdornArr, setFilterAdornArr] = useState<AdornItem[]>([]);
  useEffect(() => {
    const arr = adornItemArr.filter(
      (e, i) =>
        e.itemId !== 0 &&
        i === adornItemArr.findLastIndex((e1) => e1.itemId === e.itemId),
    );
    setFilterAdornArr(arr);
  }, [adornItemArr]);
  // console.log("filterAdornArr:", filterAdornArr);

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

  // 배경 요소와 아이템 배열을 하나의 상태값으로 합쳐 서버에 전송할 데이터 상태값 생성
  useEffect(() => {
    setAdornFetchData({
      backgroundId: background?.backgroundId,
      items: filterAdornArr,
    });
  }, [background, filterAdornArr]);

  // --------------------------------------------- 기존 꾸미기 영역 데이터와 새로운 데이터 합치기
  // const [newData, setNewData] = useState<newData[]>([]);
  // useEffect(() => {
  //   setNewData([...adornPageData.items, ...newItems]);
  // }, [adornPageData, newItems]);
  // console.log("newData:", newData);
  
  // ---------------------------------------------기존 꾸미기 영역 데이터 불러와서 상태값으로 저장
  // console.log("adornPage:", adornPage);
  const [editData, setEditData] = useState<NewData[]>([]);
  // console.log("editData:", editData);
  useEffect(() => {
    setEditData(adornPage?.items);
  }, [adornPage]);

  // --------------------------------------------- 각 아이템 좌표값 가져오기
  const [editItemPosition, setEditItemPosition] = useState<Position>({
    x: editData[0]?.x,
    y: editData[0]?.y,
  });
  // console.log("editItemPosition:", editItemPosition);

  const handleEditItemPosition = (position: Position) => {
    setEditItemPosition({
      x: position?.x,
      y: position?.y,
    });
  };

  // ---------------------------------------------개별 아이템
  const [adornEditItemArr, setAdornEditItemArr] = useState<AdornItem[]>([]);
  console.log(adornEditItemArr);
  
  // const [adornEditItem, setAdornEditItem] = useState<AdornItem>({
  //   itemId: 0,
  //   subId: 0,
  //   x: 0,
  //   y: 0,
  // });
  useEffect(() => {
    const updatedItems = editData.map((e) => ({
      itemId: e.itemId,
      subId: e.subId,
      x: editItemPosition?.x,
      y: editItemPosition?.y,
    }));
    setAdornEditItemArr(updatedItems);
  }, [editItemPosition, editData]);
  // useEffect(() => {
  //   setAdornEditItemArr((prev) => [...prev, adornEditItem]);
  // }, [adornEditItem]);
  // console.log("adornEditItem:", adornEditItem);
  // console.log("adornEditItemArr:", adornEditItemArr);

  const draggableEditItems = editData.map((e, i) => (
    <MinihomeAdornEditDraggableItem
      key={i}
      data={e}
      handleEditPosition={handleEditItemPosition}
    />
  ));
  // console.log("draggableEditItems:", draggableEditItems);

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
            <h1 className={style.header_aside_title}>미니홈 수정하기</h1>
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
            {draggableEditItems}
            {draggableItems}
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

export default MinihomeAdornEdit;
