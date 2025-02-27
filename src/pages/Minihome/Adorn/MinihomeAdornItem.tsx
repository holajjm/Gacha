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

function MinihomeAdornItem({data}:{data:ItemData}) {
  return (
    <div>
      <img src={useImage(data?.imageUrl)} alt="" />
    </div>
  )
}

export default MinihomeAdornItem