import { memo, useState } from "react";
import VideoCart from "./VideoCart";
import PriceToPersian from "../../../../utils/PriceToPersian";
import { motion, AnimatePresence } from "framer-motion";

function Session({
  seasion,
  title,
  onClick,
  videos,
  isPurchasedCourse,
  courseId,
  isFree,
}) {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div
        className="session-wrapper bg-white rounded-lg shadow-[var(--cart-shadow)] flex flex-col my-3"
        
      >
        <div
          className={`title flex justify-between transition-all py-4 px-5 duration-300 ${
            isShow && "rounded-lg shadow-[var(--cart-shadow)]"
          }`}
        >
          <div className="seasion-info flex items-center">
            <p className="seasion-number text-xs lg:text-[16px] text-[#00000099]">
              {seasion}:{" "}
            </p>
            <p className="seasion-title mr-1 text-xs lg:text-[16px]">{title}</p>
          </div>
          <div className="arrow-icon"></div>
          <svg
            onClick={() => onClick(setIsShow)}
            className={`transition-all duration-300 cursor-pointer ${
              isShow && "rotate-180"
            } w-5 h-5 lg:w-7 lg:h-7`}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ExpandMoreIcon"
            fill="#00000099"
          >
            <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
          </svg>
        </div>


        <AnimatePresence>
          {isShow && (
            <motion.div
              className="video_wrapper overflow-hidden px-3"
              layout
              initial={{ paddingBlock: "0", maxHeight: "0" }}
              animate={{
                paddingBlock: "1.5rem",
                maxHeight : `${videos.length * 130.8}px`,
              }}
                exit={{ paddingBlock: "0", maxHeight: "0" }}
            >
              {videos.map((video) => (
                <VideoCart
                  key={video.id}
                  title={video.title}
                  duration={PriceToPersian(video.duration)}
                  courseId={courseId}
                  order={PriceToPersian(video.order)}
                  isPurchasedCourse={isPurchasedCourse}
                  isFree={isFree}
                  videoUrl={video.videoUrl}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default memo(Session);
