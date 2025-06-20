import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";
import { toast } from "react-toastify";

import BellItems from "./BellItems";
import style from "@styles/Layouts/Bell.module.css";

function Bell() {
  const axios = useCustomAxios();

  const [click, setClick] = useState(false);
  const openBell = () => {
    setClick(!click);
  };

  const getNoti = async () => {
    const response = await axios.get("/notifications");
    return response?.data;
  };
  const getNewNoti = async () => {
    const response = await axios.get("/notifications/hasNew");
    return response?.data;
  };
  const { data: Notis } = useQuery({
    queryKey: ["Noti", click],
    queryFn: getNoti,
  });
  // console.log("Notis", Notis);

  const { data: isNewNotis } = useQuery({
    queryKey: ["isNewNoti"],
    queryFn: getNewNoti,
  });
  useEffect(() => {
    getNewNoti();
  }, []);
  // console.log("isNewNotis", isNewNotis);

  useEffect(() => {
    if (isNewNotis?.hasNewNotifications) {
      toast("새로운 알림이 있습니다.");
    }
  }, [isNewNotis?.hasNewNotifications]);

  return (
    <>
      <button
        type="button"
        onClick={openBell}
        className={style.container}
        aria-label="알림 확인"
      >
        <img src="/images/Bell.webp" alt="Bell" />
        {isNewNotis?.hasNewNotifications && (
          <span className={style.isItem} aria-hidden="true"></span>
        )}
      </button>
      {click && (
        <aside role="region" aria-label="알림 목록">
          <BellItems data={Notis} />
        </aside>
      )}
    </>
  );
}

export default Bell;
