import React from "react";
import style from "@styles/Market/Sell/MarketMySellingItem.module.css";
import useImage from "@hooks/useImage";

interface MySellingItemData {
  grade: string;
  imageUrl: string;
  name: string;
  price: number;
  productId: number;
  status: string;
  transactionDate: null;
}

function MarketMySellingItem({
  data,
  modalOpen,
}: {
  data: MySellingItemData;
  modalOpen: (itemId: number) => void;
}) {
  // const SERVER_API = import.meta.env.VITE_SERVER_API;
  // const [imageList, setImageList] = useState<string>();
  // const image = async () => {
  //   const response = await fetch(`${SERVER_API}${data?.imageUrl}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "image/png, image/jif"
  //     },
  //   });
  //   const blob = await response.blob();
  //   const imageObjUrl = URL.createObjectURL(blob);
  //   setImageList(imageObjUrl);
  // };
  // useEffect(() => {
  //   image();
  // }, []);
  const handleClick = () => {
    modalOpen(data?.productId);
  };
  return (
    <div className={style.main_items_item}>
      <div>
        <img src={useImage(data?.imageUrl)} alt="sample" />
      </div>
      <p>{data?.name}</p>
      <p>{data?.grade}</p>
      <p>{data?.price}</p>
      <p>{data?.status}</p>
      <div>
        <button onClick={handleClick}>Info</button>
      </div>
    </div>
  );
}

export default MarketMySellingItem;
