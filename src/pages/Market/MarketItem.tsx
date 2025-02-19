import React from "react";

import style from "@styles/Market/MarketItem.module.css";
import useImage from "@hooks/useImage";

interface MarketItemData {
  hasStock: string;
  imageUrl: string;
  itemId: number;
}

function MarketItem({
  data,
  onSelect,
  onClick,
}: {
  data: MarketItemData;
  onSelect: (itemId: number) => void;
  onClick: () => void;
}) {
  
  // const SERVER_API = import.meta.env.VITE_SERVER_API;
  // const [imageList, setImageList] = useState<string>();
  // const image = async () => {
  //   const response = await fetch(`${SERVER_API}${data?.imageUrl}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "image/png, image/jif",
  //     },
  //   });
  //   const blob = await response.blob();
  //   const imageObjUrl = URL.createObjectURL(blob);
  //   setImageList(imageObjUrl);
  // };
  // useEffect(() => {
  //   image();
  // }, []);
  // const image = useImage(data?.imageUrl);
  const handleClick = () => {
    onSelect(data?.itemId);
    onClick();
  };
  return (
    <div onClick={handleClick} className={style.item}>
      <img src={useImage(data?.imageUrl)} alt="item" />
    </div>
  );
}

export default MarketItem;
