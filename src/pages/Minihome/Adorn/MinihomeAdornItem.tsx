import React from "react";

import useImage from "@hooks/useImage";
import type { AdornItemData } from "types/minihome";

function MinihomeAdornItem({
  data,
  onClick,
}: {
  data: AdornItemData;
  onClick: (data: AdornItemData) => void;
}) {
  const handle = () => {
    onClick(data);
  };
  return (
    <div onClick={handle}>
      <img
        src={useImage(data?.imageUrl)}
        alt="item"
        {...{ fetchpriority: "high" }}
        decoding="async"
        width={96}
        height={96}
      />
    </div>
  );
}

export default MinihomeAdornItem;
