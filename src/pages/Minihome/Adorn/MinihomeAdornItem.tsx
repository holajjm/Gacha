import React, { useEffect, useRef } from 'react'

import useImage from '@hooks/useImage';

interface AdornItemData {
  imageUrl: string;
  itemGrade: string;
  itemId: number;
  subId: number;
}

function MinihomeAdornItem({data,onClick}:{data:AdornItemData,onClick:(data:AdornItemData) => void}) {
  
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);  const handle = () => {
    onClick(data)
  }
  return (
    <div onClick={handle}>
      <img src={useImage(data?.imageUrl)} alt="item" ref={imgRef} width={96} height={96}/>
    </div>
  )
}

export default MinihomeAdornItem