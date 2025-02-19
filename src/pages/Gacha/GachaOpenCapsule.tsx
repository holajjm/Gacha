import React from "react";

import style from "@styles/Gacha/GachaOpenCapsule.module.css";
import useImage from "@hooks/useImage";

function GachaOpenCapsule({
  color,
  imageUrl,
}: {
  color: string;
  imageUrl: string;
}) {
  // const SERVER_API = import.meta.env.VITE_SERVER_API;
  // const [imageList, setImageList] = useState<string>();
  // const image = async () => {
  //   const response = await fetch(`${SERVER_API}${imageUrl}`, {
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
  // }, [imageUrl]);
  const image = useImage(imageUrl);
  return (
    <>
      <img
        className={`${style.open_capsule} ${style.open_capsule_opacity}`}
        src={`/images/${color}OpenCapsule.svg`}
        alt="Open"
      />
      {image ? (
        <div className={style.result_capsule}>
          <img src={image} alt="item" />
        </div>
      ) : null}
    </>
  );
}

export default GachaOpenCapsule;
