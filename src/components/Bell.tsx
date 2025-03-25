import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@store/store";

import style from "@styles/Layouts/Bell.module.css";

function Bell() {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const getNoti = async () => {
    const response = await axios.get(`${SERVER_API}/notifications`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    // const data = await response.json();
    // console.log(response?.data?.data);
    return response;
  };
  const { data } = useQuery({
    queryKey: ["Noti"],
    queryFn: getNoti,
    select: (data) => data?.data?.data
  });
  console.log(data);
  
  // useEffect(() => {
  //   getNoti();
  // }, []);
  return (
    <div className={style.container}>
      <img src="/src/assets/images/Bell.svg" alt="Bell" />
    </div>
  );
}

export default Bell;
