/** Video (components/sections/Accordions/Session/Video.jsx)
 * Full-screen modal component for playing a video.
 * Appears on top of the page when `isShowVideo` is set to true, 
 * and closes when the overlay is clicked.
 *
 * State Management:
 * - Receives `setIsShowVideo` from parent. 
 *   Calls `setIsShowVideo(false)` when the user clicks the overlay to close the modal.
 *
 * UI:
 * - Full viewport fixed container with dark semi-transparent background overlay.
 * - `<video>` element centered on the screen, responsive width/height with rounded corners.
 * - Overlay (background) click closes the modal.
 *
 * Performance:
 * - Wrapped with `React.memo` to prevent unnecessary re-renders when props don’t change.
 *
 * @component
 * @param {Object} props
 * @param {string} props.videoUrl - The URL source of the video to play.
 * @param {Function} props.setIsShowVideo - State setter to toggle modal visibility.
 * @returns {JSX.Element}
 *
 * @remarks
 * - Closing is only possible by clicking the overlay (not via ESC key or close button).
 *   Consider adding additional close mechanisms for better UX.
 * - `z-index` values (`z-100`, `z-1000`) are Tailwind custom classes; 
 *   ensure they exist in config for proper stacking.
 * - Video dimensions are fixed (`200px` height on small screens, `500px` on large);
 *   you may want to make them more adaptive.
 */


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
