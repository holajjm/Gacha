import React from "react";
import style from "@styles/Minihome/Header/MinihomeItem.module.css";
import useImage from "@hooks/useImage";

interface ItemBookData {
  imageUrl: string;
  itemCnt: number;
  itemGrade: string;
  itemId: number,
  itemName: string,
  userItemIds: null,
}

function MinihomeItems({data}:{data:ItemBookData}) {
  // const SERVER_API = import.meta.env.VITE_SERVER_API;
  // const [imageList, setImageList] = useState<string>();
  //   const image = async () => {
  //     const response = await fetch(`${SERVER_API}${data?.imageUrl}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "image/png, image/jif"
  //       },
  //     });
  //     const blob = await response.blob();
  //     const imageObjUrl = URL.createObjectURL(blob);
  //     setImageList(imageObjUrl);
  //   };
  //   useEffect(() => {
  //     image();
  //   }, []);
  return (
    <div className={style.wrapper}>
      <div className={style.img}>
        <img src={useImage(data?.imageUrl)} alt="sample" />
      </div>
      <div className={style.item}>
        <p>{data?.itemGrade}</p>
        <p>{data?.itemName} / {data?.itemCnt}개</p>
      </div>
    </div>
  );
}

export default MinihomeItems;
