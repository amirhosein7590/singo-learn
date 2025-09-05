/**
 * FeatureItem Component
 *
 * Displays a single feature with an optional title
 * and a description below it.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.title] - The optional feature title
 * @param {string} props.description - The feature description
 * @returns {JSX.Element} The feature item layout
 */

import { memo } from "react";

function FeatureItem({ title, description }) {
  return (
    <div className="feature-item flex flex-col my-4">
      {title && (
        <div className="mb-4 ">
          <span className="rounded-sm text-sm bg-[#eeeeee] text-[#616161] py-1 px-2">
            {title}
          </span>
        </div>
      )}

      <p className="text-[#00000099] text-sm md:text-[16px]">{description}</p>
    </div>
  );
}

export default memo(FeatureItem);
