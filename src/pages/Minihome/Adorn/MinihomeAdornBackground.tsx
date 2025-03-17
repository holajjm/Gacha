import React, { useEffect, useState } from "react";

import { useUserStore } from "@store/store";

import MinihomeAdornBackgroundItem from "./MinihomeAdornBackgroundItem";
import style from "@styles/Minihome/Adorn/MinihomeAdornBackground.module.css";

interface BackgroundItemData {
  backgroundId: number;
  imageUrl: string;
}

function MinihomeAdornBackground({
  getBack,
}: {
  getBack: (data: BackgroundItemData) => void;
}) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [backgroundItemList, setBackgroundItemList] = useState<
    BackgroundItemData[]
  >([]);
  const getBackgroundItems = async () => {
    const response = await fetch(
      `${SERVER_API}/backgrounds/${user?.nickname}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      },
    );
    const data = await response.json();
    setBackgroundItemList(data?.data);
  };
  useEffect(() => {
    getBackgroundItems();
  }, []);

  const backgroundItems = backgroundItemList.map((e) => (
    <MinihomeAdornBackgroundItem
      key={e.backgroundId}
      data={e}
      getBack={getBack}
    />
  ));
  return <section className={style.main}>{backgroundItems}</section>;
}

export default MinihomeAdornBackground;
