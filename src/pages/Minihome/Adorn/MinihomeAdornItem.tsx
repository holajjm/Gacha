import useImage from '@hooks/useImage';
import React from 'react'

interface AdornItemData {
  imageUrl: string;
  itemGrade: string;
  itemId: number;
  subId: number;
}

function MinihomeAdornItem({data,onClick}:{data:AdornItemData,onClick:(data:AdornItemData) => void}) {
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