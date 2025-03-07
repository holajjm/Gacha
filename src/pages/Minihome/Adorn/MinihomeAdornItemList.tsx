import React, { useEffect, useState } from "react";

import { useUserStore } from "@store/store";

import MinihomeAdornItem from "./MinihomeAdornItem";
import style from "@styles/Minihome/Adorn/MinihomeAdornItemList.module.css";

interface ItemData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number;
  itemName: string;
  userItemIds: null;
}

function MinihomeAdornItemList({
  getItem,
}: {
  getItem: (data: ItemData) => void;
}) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [itemList, setItemList] = useState<ItemData[]>([]);
  const getItems = async () => {
    const response = await fetch(`${SERVER_API}/items/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    const data = await response.json();
    setItemList(data?.data?.content);
  };
  useEffect(() => {
    getItems();
  }, []);
  const handleClickItem = (data: ItemData) => {
    getItem(data);
  };
  const items = itemList.map((e) => (
    <MinihomeAdornItem key={e.itemId} data={e} onClick={handleClickItem} />
  ));
  return <section className={style.main}>{items}</section>;
}

export default MinihomeAdornItemList;
