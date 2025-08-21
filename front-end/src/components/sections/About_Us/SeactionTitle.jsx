import { memo } from "react";

function SectionTitle({ title, children }) {
  return (
    <div className="wrapper flex flex-col mb-5">
      <div className="title flex mb-4 md:mb-6">
        <img src="/svg/decoration.svg" alt="" />
        <h2 className="md:text-2xl mr-2 md:mr-4">{title}</h2>
      </div>

      <div className="flex flex-col">{children}</div>
    </div>
  );
}

export default memo(SectionTitle);
