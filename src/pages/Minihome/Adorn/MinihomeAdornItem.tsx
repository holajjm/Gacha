import React, { useEffect, useState } from 'react'

interface ItemData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number,
  itemName: string,
  userItemIds: null,
}

function MinihomeAdornItem({data}:{data:ItemData}) {
  const [imageList, setImageList] = useState<string>();
      const image = async () => {
        const response = await fetch(`https://222.121.46.20:80${data?.imageUrl}`, {
          method: "GET",
          headers: {
            "Content-Type": "image/png, image/jif"
          },
        });
        const blob = await response.blob();
        const imageObjUrl = URL.createObjectURL(blob);
        setImageList(imageObjUrl);
      };
      useEffect(() => {
        image();
      }, []);
  return (
    <div>
      <img src={imageList} alt="" />
    </div>
  )
}

export default MinihomeAdornItem