import React, { useEffect, useState } from "react";
import axios from "axios";

import { useUserStore } from "@store/store";

import style from "@styles/Layouts/Lotto.module.css";

interface Lottos {
  lottoId: number;
  won: boolean;
  rewardCoin: number;
}

function LottoOpen({ closeLotto }: { closeLotto: () => void }) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const [lottos, setLottos] = useState<Lottos[]>([]);
  const getLotto = async () => {
    const response = await axios.get(`${SERVER_API}/lottos`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    setLottos(response?.data?.data);
    console.log(response?.data?.data);
    return response;
  };
  useEffect(() => {
    getLotto();
  }, []);
  // 임시 배열
  // const lottos = [{lottoId: 0,won: true,rewardCoin: 5000},{lottoId: 1,won: false,rewardCoin: 4000},{lottoId: 2,won: false,rewardCoin: 3000}]
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
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
          <button className={style.close} onClick={closeLotto}>
            X
          </button>

          <div className={style.lotto_text}>
            {lottos[i]?.won ? (
              <p>축하합니다! 코인이 지급되었습니다.</p>
            ) : (
              <p>꽝! 다음 기회에...</p>
            )}
            {/* <p>축하합니다! 코인이 지급되었습니다.</p> */}
          </div>
          <p className={style.lotto_result}>{lottos[i]?.rewardCoin} 코인</p>
          {/* <p className={style.lotto_result}>5000 코인</p> */}
          <div className={style.lotto_button}>
            {lottos?.length !== i + 1 ? (
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
