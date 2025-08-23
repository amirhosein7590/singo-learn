import { memo } from "react";

function StdCommentItems({ name, opinion, courses }) {
  return (
    <div className="container pb-6 flex flex-col lg:flex-row border-b border-b-[#efefef] my-6 p-4 lg:justify-between">
      <div className="std-details w-full lg:w-1/2 mb-5 lg:mb-0">
        <div className="row flex items-center mb-4">
          <div className="std-profile w-[40px] h-[40px] lg:w-[60px] p-1.5 lg:h-[60px] bg-[#BDBDBD] rounded-full">
            <svg
              fill="white"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="PersonIcon"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
          </div>

          <div className="text mr-5">
            <h5 className="mb-1">{name}</h5>
            <p className="text-[#616161]">{courses}</p>
          </div>
        </div>
        <div className="row">
          <p>{opinion}</p>
        </div>
      </div>

      <div className="video flex z-0 relative w-full lg:w-1/2 justify-center lg:justify-start mx-4 mt-6 lg:mt-0">
        <video
          className="w-full z-0 h-[300px] relative rounded-xl shadow-[var(--cart-shadow)]"
          poster="/images/logo.png"
          controls
          src="https://upcdn.io/G22nht2/raw/uploads/2025/08/21/invideo-ai-720%20Testimonial%20for%20Singo%20Learn%20Course%202025-07-01%20(3).mp4"
        ></video>
      </div>
    </div>
  );
}

export default memo(StdCommentItems);
