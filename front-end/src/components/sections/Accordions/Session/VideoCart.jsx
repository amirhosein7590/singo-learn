/** VideoCart (components/sections/Accordions/Session/VideoCart.jsx)
 * Represents a single video item within a course session.
 * Displays video metadata (order, title, duration) and, if accessible,
 * shows action buttons to either watch or download the video.
 *
 * State:
 * - `isShowVideo`: toggles modal/player visibility when "Watch Video" is clicked.
 *
 * Interactions:
 * - If `isPurchasedCourse(courseId)` returns true OR `isFree` is true, 
 *   the action buttons are displayed:
 *   - "Watch Video": sets `isShowVideo = true`, triggers lazy-loaded `<Video />`.
 *   - "Download Video": provides an `<a>` tag with `download` attribute linking to `videoUrl`.
 *
 * UI:
 * - Top section: order number in styled box, video title, and duration with clock icon.
 * - Action buttons styled with the shared `<Button />` component.
 * - On show, `<Video />` modal/component is lazily loaded for performance.
 *
 * @component
 * @param {Object} props
 * @param {string} props.courseId - ID of the course to check ownership with `isPurchasedCourse`.
 * @param {string} props.title - Title of the video.
 * @param {string} props.videoUrl - Source URL of the video file.
 * @param {number} props.duration - Duration of the video in minutes.
 * @param {number} props.order - Order number of the video in the session.
 * @param {(courseId: string) => boolean} props.isPurchasedCourse - Function that checks if the user owns this course.
 * @param {boolean} props.isFree - Whether this video is freely accessible.
 * @returns {JSX.Element}
 *
 * @remarks
 * - `Video` component is lazily loaded via `React.lazy` to improve initial page load.
 * - Download link (`<a download>`) relies on `videoUrl`; ensure proper CORS/headers 
 *   to allow downloads in all browsers.
 * - No access restriction UI is shown if the user doesn’t own the course and `isFree` is false.
 *   Consider rendering a disabled state or "locked" indicator for clarity.
 * - `Button` is reused here but contains `<a>` inside in one case; 
 *   ensure consistent semantics for accessibility.
 */


import { lazy, memo, useState } from "react";
import Button from "../../../ui/Button";
const Video = lazy(()=> import('../../Video'))

function VideoCart({
  courseId,
  title,
  videoUrl,
  duration,
  order,
  isPurchasedCourse,
  isFree
}) {

  const [isShowVideo , setIsShowVideo] = useState(false);
  const showVideoHandler = ()=>{
    setIsShowVideo(true)
  }

  return (
    <>
    <div className="video-cart transition-all duration-300 border rounded-md border-[silver] py-2 px-3 my-2 bg-[rgb(245_245_245)] flex flex-col">
      <div className="session_info flex justify-between items-center">
        <div className="session_title flex items-center">
          <div className="w-[25px] text-sm h-[25px] bg-[var(--dark-purple)] flex justify-center items-center text-white rounded-md">
            {order}
          </div>
          <p className="text-[11px] mr-2 lg:text-sm">{title}</p>
        </div>

        <div className="session-duration flex items-center">
          <p className="duration-count text-[11px] ml-2 text-[#00000099]">
            {duration} دقیقه
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            viewBox="0 0 35.517 35.517"
          >
            <path
              d="M17.305,0h.905a17.716,17.716,0,0,1,6.854,1.577A17.8,17.8,0,0,1,35.517,17.245v.963A17.815,17.815,0,0,1,21.5,35.118a18.726,18.726,0,0,1-3.289.4h-.9A17.8,17.8,0,0,1,0,18.213v-.965A18.139,18.139,0,0,1,.862,12.29,17.827,17.827,0,0,1,17.305,0m-.427,2.395A15.387,15.387,0,1,0,24.09,3.733,15.366,15.366,0,0,0,16.878,2.395Z"
              fill="#7C3AED"
            ></path>
            <path
              d="M238.929,103.557a1.182,1.182,0,0,1,2.363,0c.006,2.979,0,5.959,0,8.938q2.736,2.193,5.475,4.383a1.182,1.182,0,0,1-1.456,1.861c-1.9-1.514-3.8-3.038-5.7-4.554a1.355,1.355,0,0,1-.691-1.12Q238.926,108.309,238.929,103.557Z"
              transform="translate(-222.352 -95.301)"
              fill="#7C3AED"
            ></path>
          </svg>
        </div>
      </div>

      {(isPurchasedCourse(courseId) || isFree) && (
        <div className="session_video_info flex justify-between items-center bg-white rounded-md mt-4 py-1.5 px-2">
          <Button onclick={showVideoHandler} classes="!text-[11px] text-[#00000099] border border-[silver] rounded-md flex items-center !py-0 !px-2">
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="SlowMotionVideoRoundedIcon"
              width="18px"
              height="18px"
              fill="var(--dark-purple)"
            >
              <path d="M10 8.5v7c0 .41.47.65.8.4l4.67-3.5c.27-.2.27-.6 0-.8L10.8 8.1c-.33-.25-.8-.01-.8.4zm1-5.27c0-.64-.59-1.13-1.21-.99-1.12.26-2.18.7-3.12 1.3-.53.34-.61 1.1-.16 1.55.32.32.83.4 1.21.16.77-.49 1.62-.85 2.54-1.05.44-.1.74-.51.74-.97zM5.1 6.51c-.46-.45-1.21-.38-1.55.16-.6.94-1.04 2-1.3 3.12-.14.62.34 1.21.98 1.21.45 0 .87-.3.96-.74.2-.91.57-1.77 1.05-2.53.26-.39.18-.9-.14-1.22zM3.23 13c-.64 0-1.13.59-.99 1.21.26 1.12.7 2.17 1.3 3.12.34.54 1.1.61 1.55.16.32-.32.4-.83.15-1.21-.49-.76-.85-1.61-1.05-2.53-.09-.45-.5-.75-.96-.75zm3.44 7.45c.95.6 2 1.04 3.12 1.3.62.14 1.21-.35 1.21-.98 0-.45-.3-.87-.74-.96-.91-.2-1.77-.57-2.53-1.05-.39-.24-.89-.17-1.21.16-.46.44-.39 1.19.15 1.53zM22 12c0 4.73-3.3 8.71-7.73 9.74-.62.15-1.22-.34-1.22-.98 0-.46.31-.86.75-.97 3.55-.82 6.2-4 6.2-7.79s-2.65-6.97-6.2-7.79c-.44-.1-.75-.51-.75-.97 0-.64.6-1.13 1.22-.98C18.7 3.29 22 7.27 22 12z"></path>
            </svg>
            <p className="mr-1 mt-1.5">تماشای ویدئو</p>
          </Button>
          <Button classes="!text-[11px] text-[#00000099] border border-[silver] rounded-md flex items-center !py-0 !px-2">
            <svg
              width="18px"
              height="18px"
              fill="var(--dark-purple)"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="CloudDownloadRoundedIcon"
            >
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-4.65 4.65c-.2.2-.51.2-.71 0L7 13h3V9h4v4h3z"></path>
            </svg>
            <a download={`${title}.mp4`} href={videoUrl} target="_blank" className="mr-1 mt-1.5">دانلود ویدئو</a>
          </Button>
        </div>
      )}

    </div>
    {isShowVideo && <Video videoUrl={videoUrl} setIsShowVideo={setIsShowVideo} />}
    </>
    
  );
}

export default memo(VideoCart);
