import useImage from '@hooks/useImage';
import React from 'react'

interface ItemData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number,
  itemName: string,
  userItemIds: null,
}

function MinihomeAdornItem({data,onClick}:{data:ItemData,onClick:(data:ItemData) => void}) {
  const handle = () => {
    onClick(data)
  }
  return (
    <div onClick={handle}>
      <img src={useImage(data?.imageUrl)} alt="" />
    </div>
  )
}

export default MinihomeAdornItem