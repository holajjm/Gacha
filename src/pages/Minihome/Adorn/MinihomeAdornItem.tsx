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
  // const SERVER_API = import.meta.env.VITE_SERVER_API;
  // const [imageList, setImageList] = useState<string>();
  //     const image = async () => {
  //       const response = await fetch(`${SERVER_API}${data?.imageUrl}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "image/png, image/jif"
  //         },
  //       });
  //       const blob = await response.blob();
  //       const imageObjUrl = URL.createObjectURL(blob);
  //       setImageList(imageObjUrl);
  //     };
  //     useEffect(() => {
  //       image();
  //     }, []);
  return (
    <div>
      <img src={useImage(data?.imageUrl)} alt="" />
    </div>
  )
}

export default MinihomeAdornItem