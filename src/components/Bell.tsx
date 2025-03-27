import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@store/store";

import BellItems from "./BellItems";
import style from "@styles/Layouts/Bell.module.css";

interface NotiDetailData {
  itemGrade?: string;
  itemName?: string;
  coin?: number;
}
interface NotiData {
  count: number;
  hasNewNotifications: boolean;
  notifications: {
    id: number;
    type: string;
    data: NotiDetailData;
    read: boolean;
  }[];
}
function Bell() {
  const [click, setClick] = useState(false);
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [noti, setNoti] = useState<NotiData>({
    count: 0,
    hasNewNotifications: false,
    notifications: [
      {
        id: 0,
        type: "LOTTO_ISSUED",
        data: {
          itemGrade: "",
          itemName: "",
          coin: 0,
        },
        read: false,
      },
    ],
  });
  const getNoti = async () => {
    const response = await axios.get(`${SERVER_API}/notifications`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    return response;
  };
  const { data } = useQuery({
    queryKey: ["Noti"],
    queryFn: getNoti,
    select: (data) => data?.data?.data,
  });
  useEffect(() => {
    setNoti(data);
  }, [data]);

  return (
    <aside onClick={() => setClick(!click)} className={style.container}>
      <img src="/images/Bell.svg" alt="Bell" />
      {data?.count ? <span className={style.isItem}></span> : null}
      {click ? <BellItems data={noti} /> : null}
    </aside>
  );
}

export default Bell;
