import { memo } from "react";
function Video({ videoUrl, setIsShowVideo }) {
  const showVideoHandler = () => {
    setIsShowVideo(false);
  };
  return (
    <div className="video-container w-full h-[100vh] fixed inset-0 z-100 flex items-center justify-center">
      <div
        onClick={showVideoHandler}
        className="overlay bg-[#00000080] w-full h-[100vh] absolute inset-0 z-100"
      ></div>
      <video
        src={videoUrl}
        controls
        className="w-10/12 lg:w-6/12 h-[200px] lg:h-[500px] rounded-lg relative z-1000"
      ></video>
    </div>
  );
}

export default memo(Video);
