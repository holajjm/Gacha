import useImage from "@hooks/useImage";
import React from "react";

interface Item {
  userItemId: number;
  name: string;
  grade: string;
  price: number;
  imageUrl: string;
}

function MarketEnrollItem({
  item,
  onSelect,
}: {
  item: Item;
  onSelect: (item: Item) => void;
}) {
  const handleClick = () => {
    onSelect(item);
  };
  // const SERVER_API = import.meta.env.VITE_SERVER_API;
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
  // }, []);
  return (
    <div onClick={handleClick}>
      <img src={useImage(item?.imageUrl)} alt="sample" />
    </div>
  );
}

export default MarketEnrollItem;
