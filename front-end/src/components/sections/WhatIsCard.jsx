/**
 * WhatIsCard component that displays a card with a title and description.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title text displayed on the card.
 * @param {string} props.description - The description text displayed below the title.
 *
 * @example
 * <WhatIsCard title="React" description="A JavaScript library for building user interfaces." />
 *
 * @returns {JSX.Element} A styled card containing a title and description.
 */


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
