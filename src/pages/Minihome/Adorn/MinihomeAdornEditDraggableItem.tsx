import React, { useEffect, useRef, useState } from "react";

import useImage from "@hooks/useImage";
import Draggable, { DraggableData } from "react-draggable";

import style from "@styles/Minihome/Adorn/MinihomeAdornDraggableItem.module.css";
import { newData, Position } from "types/minihome";



function MinihomeAdornEditDraggableItem({
  data,
  handleEditPosition,
}: {
  data: newData;
  handleEditPosition: (position: Position) => void;
}) {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [itemPosition, setItemPosition] = useState<Position>({
    x: data?.x ?? 0,
    y: data?.y ?? 0,
  });
  const handleDrag = (draggableData: DraggableData) => {
    setPosition({ x: draggableData.x, y: draggableData.y });
    setItemPosition({
      x: draggableData.x,
      y: draggableData.y,
    });
  };
  useEffect(() => {
    handleEditPosition({ x: data?.x ?? 0, y: data?.y ?? 0 });
  }, []);
  useEffect(() => {
    handleEditPosition(itemPosition);
  }, [itemPosition, position]);

  return (
    <Draggable
      bounds="parent"
      nodeRef={nodeRef}
      position={{ x: itemPosition.x, y: itemPosition.y }}
      onDrag={(_, itemPosition) => handleDrag(itemPosition)}
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
          alt="image"
        />
      </div>
    </Draggable>
  );
}

export default MinihomeAdornEditDraggableItem;
