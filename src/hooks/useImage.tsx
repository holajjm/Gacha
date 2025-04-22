import { useEffect, useState } from "react";

function useImage(imageUrl: string) {
  const SERVER_API = import.meta.env.VITE_SERVER_API;
  const [image, setImage] = useState<string>();
  const getImage = async () => {
    const response = await fetch(`${SERVER_API}${imageUrl && imageUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "image/webp",
      },
    });
    const blob = await response.blob();
    const imageObjUrl = URL.createObjectURL(blob);
    setImage(imageObjUrl);
  };
  useEffect(() => {
    if (imageUrl) getImage();
  }, [imageUrl]);
  return image;
}

export default useImage;
