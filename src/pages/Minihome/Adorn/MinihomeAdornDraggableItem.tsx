import React, { useRef } from "react";

import useImage from "@hooks/useImage";
import Draggable from "react-draggable";

interface ItemData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number;
  itemName: string;
  userItemIds: null;
}

function MinihomeAdornDraggableItem({ data }: { data: ItemData }) {
  const nodeRef = useRef(null);
  return (
    <Draggable bounds="parent" nodeRef={nodeRef}>
      <div ref={nodeRef}>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          src={useImage(data?.imageUrl as string)}
          alt=""
        />
      </div>
    </Draggable>
  );
}

export default MinihomeAdornDraggableItem;
