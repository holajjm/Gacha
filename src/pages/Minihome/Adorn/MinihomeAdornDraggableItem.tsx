import React, { useEffect, useRef, useState } from "react";

import useImage from "@hooks/useImage";
import Draggable, { DraggableData } from "react-draggable";

import style from "@styles/Minihome/Adorn/MinihomeAdornDraggableItem.module.css";
import { AdornItemData, Position } from "types/minihome";

function MinihomeAdornDraggableItem({
  data,
  handleItemPosition,
}: {
  data: AdornItemData;
  handleItemPosition: (position: Position) => void;
}) {
  // console.log(data);

  const nodeRef = useRef(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [itemPosition, setItemPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const handleDrag = (draggableData: DraggableData) => {
    setPosition({ x: draggableData.x, y: draggableData.y });
    setItemPosition({
      x: draggableData.x,
      y: draggableData.y,
    });
  };
  useEffect(() => {
    handleItemPosition(itemPosition);
  }, [position]);

  // console.log("data:", data);
  // console.log(position);

  return (
    <Draggable
      bounds="parent"
      nodeRef={nodeRef}
      position={{ x: itemPosition.x, y: itemPosition.y }}
      onDrag={(_, position) => handleDrag(position)}
    >
      <div className={style.item} ref={nodeRef}>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          className={style.item_img}
          src={useImage(data?.imageUrl as string)}
          alt="img"
        />
      </div>
    </Draggable>
  );
}

export default MinihomeAdornDraggableItem;
