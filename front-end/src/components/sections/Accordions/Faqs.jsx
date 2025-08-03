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
          <p>{question}</p>
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
              <p className="text-[#00000099]">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default memo(Faqs);
