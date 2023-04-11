import React from "react";

import video from "../backGrounds/backVid.mp4";

const BackgroundVideo = () => {
  return (
    <div>
      <video className="video-background w-full h-full" autoPlay loop>
        <source src={video}  type="video/mp4"  />
      </video>
    </div>
  );
};
export default BackgroundVideo;