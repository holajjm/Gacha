import React, { useEffect, useState } from "react";
import style from "@styles/Minihome/Adorn/MinihomeAdornBackground.module.css";
import { useUserStore } from "@store/store";
import MinihomeAdornBackgroundItem from "./MinihomeAdornBackgroundItem";

interface BackgroundItemData {
  backgroundId: number,
  imageUrl: string
}

function MinihomeAdornBackground() {
  const {user} = useUserStore((state) => state);
  const [backgroundItemList, setBackgroundItemList] = useState<BackgroundItemData[]>([]);
  const getBackgroundItems = async () => {
    const response = await fetch(`https://222.121.46.20:80/backgrounds/${user?.nickname}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`
      }
    })
    const data = await response.json();
    setBackgroundItemList(data);
  }
  useEffect(() => {
    getBackgroundItems()
  },[])
  console.log(backgroundItemList);
  const backgroundItems = backgroundItemList.map(e => <MinihomeAdornBackgroundItem key={e.backgroundId} data={e}/>)
  return (
    <section className={style.main}>
      {backgroundItems}
    </section>
  )
}

export default MinihomeAdornBackground
