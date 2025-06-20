import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useLottoModalState, useUserStore } from "@store/store";
import useCustomAxios from "@hooks/useCustomAxios";

import style from "@styles/Layouts/Lotto.module.css";

function LottoOpen() {
  const { user } = useUserStore((state) => state);
  const modalClose = useLottoModalState((state) => state.modalClose);
  const axios = useCustomAxios();
  const [open, setOpen] = useState(false);
  const getLotto = async () => {
    const response = await axios.get("/lottos");
    console.log(response?.data);
    return response?.data;
  };
  const { data } = useQuery({
    queryKey: ["Lotto"],
    queryFn: getLotto,
    enabled: !!user,
  });
  console.log(data);

  const [i, setI] = useState(0);
  console.log(i);

  const openLotto = () => {
    setOpen(false);
    setTimeout(() => {
      setOpen(true);
    }, 2000);
  };
  useEffect(() => {
    openLotto();
  }, [i]);
  return (
    <>
      {!open ? (
        <div className={style.close_lotto}>복권 여는중...</div>
      ) : (
        <div className={style.open_lotto}>
          <button className={style.close} onClick={modalClose}>
            X
          </button>

          <div className={style.lotto_text}>
            {data[i]?.won ? (
              <p>축하합니다! 코인이 지급되었습니다.</p>
            ) : (
              <p>꽝! 다음 기회에...</p>
            )}
          </div>
          <p className={style.lotto_result}>{data[i]?.rewardCoin} 코인</p>
          <div className={style.lotto_button}>
            {data?.length !== i + 1 ? (
              <p
                className={style.lotto_next_button}
                onClick={() => setI(i + 1)}
              >
                다음 복권 긁기
              </p>
            ) : (
              <p>모든 복권을 긁었습니다.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default LottoOpen;
