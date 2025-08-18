import { useEffect, useState } from "react";

import { ENV } from "@constants/env";

function useImage(imageUrl: string) {
  const [image, setImage] = useState<string>();
  const getImage = async () => {
    const response = await fetch(`${ENV.SERVER_API}${imageUrl && imageUrl}`, {
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
