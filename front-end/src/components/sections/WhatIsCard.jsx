import { memo } from "react";

function WhatIsCard({title , description}) {
  return (
    <div className="card flex flex-col my-5 py-2 px-4">
      <div className="question flex mb-4">
        <img src="/svg/decoration.svg" alt="" />
        <h2 className="text-lg lg:text-2xl mr-2">{title}</h2>
      </div>
      <p className="answer text-sm leading-7 lg:text-[16px] text-[#000000DE]">{description}</p>
    </div>
  );
}

export default memo(WhatIsCard);
