import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@store/store";
import useCustomAxios from "@hooks/useCustomAxios";

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
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const axios = useCustomAxios();
  const [click, setClick] = useState(false);
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
    const response = await axios.get(`${SERVER_API}/notifications`);
    return response;
  };
  const { data } = useQuery({
    queryKey: ["Noti",user],
    queryFn: getNoti,
    select: (data) => data?.data,
  });
  console.log(data);

  useEffect(() => {
    setNoti(data);
  }, [data]);

  const readNoti = async () => {
    try {
      if (noti?.count) {
        const response = await fetch(`${SERVER_API}/notifications/mark`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
          body: JSON.stringify({
            notificationIds: noti?.notifications[0]?.id,
          }),
        });
        const data = await response.json();
        if (data?.result === "SUCCESS") {
          console.log(data);
        } else if (data?.result === "ERROR") {
          console.log(data?.error.message);
          alert(data?.error.message);
        }
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const openBell = () => {
    setClick(!click);
  };
  // console.log(noti);

  return (
    <>
      <aside
        onClick={() => {
          readNoti();
          openBell();
        }}
        className={style.container}
      >
        <img src="/images/Bell.svg" alt="Bell" />
        {data?.count ? <span className={style.isItem}></span> : null}
      </aside>
      {click ? <BellItems data={noti} /> : null}
    </>
  );
}

export default Bell;
