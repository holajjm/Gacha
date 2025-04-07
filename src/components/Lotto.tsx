import React, { useEffect, useRef, useState } from "react";

import LottoOpen from "./LottoOpen";
import style from "../styles/Layouts/Lotto.module.css";

function Lotto({
  closeLotto,
  onKeyPress,
}: {
  closeLotto: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    divRef.current?.focus();
  }, []);
  const [isClick, setIsClick] = useState(false);

  return (
    <div
      onKeyDown={onKeyPress}
      tabIndex={0}
      ref={divRef}
      className={style.container}
    >
      {isClick ? (
        <LottoOpen closeLotto={closeLotto} />
      ) : (
        <div onClick={() => setIsClick(true)} className={style.wait}>
          <button className={style.close} onClick={closeLotto}>
            X
          </button>
          클릭해서 복권 열기
        </div>
      )}
    </div>
  );
}

export default Lotto;
