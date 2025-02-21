import React from "react";
import style from "@styles/Market/Enroll/MarketEnrollPreview.module.css";
import { useUserStore } from "@store/store";
import useImage from "@hooks/useImage";

interface Item {
  userItemId: number;
  name: string;
  grade: string;
  price: number;
  imageUrl: string;
}

function MarketSellPreview({ item }: { item: Item }) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const { user } = useUserStore((state) => state);
  const enrollItem = async () => {
    try {
      await fetch(`${SERVER_API}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: JSON.stringify({
          userItemId: item?.userItemId,
        }),
      });
      alert("상품이 등록되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };
  // const [imageList, setImageList] = useState<string>();
  // const image = async () => {
  //   const response = await fetch(`${SERVER_API}${item?.imageUrl}`, {
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
  // }, [item]);
  return (
    <div className={style.header}>
      <div className={style.header_background}></div>
      <div className={style.header_image}>
        <img src={useImage(item?.imageUrl)} alt="image" />
      </div>
      <div className={style.header_item}>
        <div className={style.header_wrapper}>
          <p>
            <span>Name:</span> <strong>{item?.name ? item?.name : "-"}</strong>
          </p>
          <p>
            <span>Grade:</span>{" "}
            <strong>{item?.grade ? item?.grade : "-"}</strong>
          </p>
          <p>
            <span>Price:</span> <strong>{item?.price ? item?.price : 0}</strong>
          </p>
          <button onClick={enrollItem} className={style.header_button}>
            판매 등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarketSellPreview;
