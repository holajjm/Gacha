import React from "react";

interface BackgroundItemData {
  backgroundId: number,
  imageUrl: string
}

function MinihomeAdornBackgroundItem({data}:{data:BackgroundItemData}) {
  console.log(data);
  
  return <div>1</div>;
}

export default MinihomeAdornBackgroundItem;
