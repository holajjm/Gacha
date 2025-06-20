import React, { useEffect, useRef } from "react";
import { useLottoModalState } from "@store/store";

import LottoOpen from "./LottoOpen";
import style from "@styles/Layouts/Lotto.module.css";

function Lotto({
  onKeyPress,
}: {
  onKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    divRef.current?.focus();
  }, []);
  const { modal, modalOpen, modalClose } = useLottoModalState((state) => state);

  return (
    <div
      onKeyDown={onKeyPress}
      tabIndex={0}
      ref={divRef}
      className={style.container}
    >
      {modal ? (
        <LottoOpen />
      ) : (
        <div onClick={modalOpen} className={style.wait}>
          <button className={style.close} onClick={modalClose}>
            X
          </button>
          클릭해서 복권 열기
        </div>
      )}
    </div>
  );
}

export default Lotto;
