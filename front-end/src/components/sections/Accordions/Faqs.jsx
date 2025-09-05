/** Faqs Accordion (components/sections/Accordions/Faqs.jsx)
 * Collapsible FAQ item with question header and animated answer body.
 * Uses Framer Motion for height/padding transitions and rotates the chevron on toggle.
 *
 * State:
 * - `isShow` (local): controls expanded/collapsed state.
 *
 * Interactions:
 * - Clicking the chevron calls `onClick(setIsShow)` allowing the parent to control
 *   the toggle behavior (e.g., single-open logic) while still updating local state.
 *
 * Animation:
 * - `AnimatePresence` handles mount/unmount of the answer.
 * - The content transitions `maxHeight` and `padding-block` for a smooth accordion feel.
 *
 * @component
 * @param {Object} props
 * @param {string} props.question - FAQ question text.
 * @param {string} props.answer - FAQ answer text (plain text/inline HTML-safe).
 * @param {(setIsShow: React.Dispatch<React.SetStateAction<boolean>>) => void} props.onClick
 *   External toggle handler. Receives the component's `setIsShow` to flip state.
 * @returns {JSX.Element}
 *
 * @remarks
 * - Accessibility: the clickable chevron is an SVG; consider adding `role="button"`,
 *   `tabIndex={0}`, and keyboard handlers (`Enter`/`Space`) for better a11y.
 * - The animated `maxHeight` is fixed to ~180px; long answers may be clipped.
 *   Consider auto-measuring content height (e.g., `scrollHeight`) for dynamic sizing.
 */


import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Faqs({ question, answer , onClick }) {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className="faqs-wrapper bg-white rounded-lg shadow-[var(--cart-shadow)] flex flex-col my-3">
        <div
          className={`question transition-all flex items-center justify-between py-4 px-5 duration-300 ${
            isShow && "rounded-lg shadow-[var(--cart-shadow)]"
          }`}
        >
          <p className="text-sm lg:text-[16px]">{question}</p>
          <div className="arrow-icon">
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
        </div>
        <AnimatePresence>
          {isShow && (
            <motion.div
              className="answer_wrapper overflow-hidden px-3"
              layout
              initial={{ paddingBlock: "0", maxHeight: "0" }}
              animate={{
                paddingBlock: "1rem",
                maxHeight: `180px   `,
              }}
            //   transition={{ duration: 0.4 }}
              exit={{ paddingBlock: "0", maxHeight: "0" }}
            >
              <p className="text-[#00000099] text-sm leading-7 lg:text-[16px] ">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default memo(Faqs);
