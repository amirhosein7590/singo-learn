/** Session Accordion (components/sections/Accordions/Session/Index.jsx)
 * Collapsible session block showing a session header and a list of its videos.
 * Each video renders as a `VideoCart` with title, duration, order, and access state.
 *
 * State:
 * - `isShow` (local): whether the session's video list is expanded.
 *
 * Interactions:
 * - Clicking the chevron calls `onClick(setIsShow)` so the parent controls toggle policy
 *   (e.g., allow multiple open vs single open) while this component updates its state.
 *
 * Animation:
 * - The video list is wrapped in `AnimatePresence` with a height/spacing transition.
 * - `maxHeight` is computed as `videos.length * 130.8px` to accommodate items.
 *
 * @component
 * @param {Object} props
 * @param {string} props.seasion - Session label (e.g., "فصل اول"). (Note: property name is "seasion".)
 * @param {string} props.title - Session title.
 * @param {(setIsShow: React.Dispatch<React.SetStateAction<boolean>>) => void} props.onClick
 *   External toggle handler. Receives the component's `setIsShow`.
 * @param {Array<{id:string,title:string,duration:number,videoUrl:string,order:number}>} props.videos
 *   List of videos in this session.
 * @param {(courseId: string) => boolean} props.isPurchasedCourse
 *   Predicate to check if the current user owns the course.
 * @param {string} props.courseId - Course identifier, passed down to `VideoCart`.
 * @param {boolean} props.isFree - Whether the session/videos are free-to-watch.
 * @returns {JSX.Element}
 *
 * @remarks
 * - The height heuristic (`130.8px` per video) can break if card heights/styles change
 *   or on responsive layouts. Prefer measuring the container’s `scrollHeight` or using
 *   Framer Motion’s layout animations without explicit `maxHeight`.
 * - The header’s chevron uses an SVG; add button semantics/keyboard handlers for a11y.
 * - Ensure `PriceToPersian` receives numbers; durations/orders are formatted per item.
 */


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
