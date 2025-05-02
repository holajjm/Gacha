import React, { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";

import { useUserStore } from "@store/store";
import useCustomAxios from "@hooks/useCustomAxios";
import { toast } from "react-toastify";

import BellItems from "./BellItems";
import style from "@styles/Layouts/Bell.module.css";

function Bell() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const axios = useCustomAxios();

  const [click, setClick] = useState(false);
  const openBell = () => {
    setClick(!click);
  };

  const getNoti = async () => {
    const response = await axios.get(`${SERVER_API}/notifications`);
    return response;
  };
  const getNewNoti = async () => {
    const response = await axios.get(`${SERVER_API}/notifications/has_new`);
    return response;
  };

  const Notis = useQueries({
    queries: [
      { queryKey: ["Noti", user], queryFn: getNoti },
      { queryKey: ["isNewNoti", user], queryFn: getNewNoti },
    ],
  });
  const notis = Notis[0]?.data?.data;
  const isNewNotis = Notis[1]?.data?.data;

  // console.log("notis", notis);
  // console.log("isNewNotis", isNewNotis);
  useEffect(() => {
    if (isNewNotis?.hasNewNotifications) {
      toast("새로운 알림이 있습니다.");
    }
  }, []);

  return (
    <>
      <aside
        onClick={() => {
          openBell();
        }}
        className={style.container}
      >
        <img src="/images/Bell.webp" alt="Bell" />
        {isNewNotis?.hasNewNotifications ? (
          <span className={style.isItem}></span>
        ) : null}
      </aside>
      {click ? <BellItems data={notis} /> : null}
    </>
  );
}

export default Bell;
