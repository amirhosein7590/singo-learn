import { motion, AnimatePresence } from "framer-motion";
import { memo, useEffect } from "react";
import EditForm from "../sections/EditForm";
import Table from "../sections/Table/Index";
import Button from "../ui/Button";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

function Modal({
  onClose,
  isEdit,
  inputPatterns = [], // inputs for edit
  isPending,
  onAction,
  title = "",
  tableData = [],
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="relative bg-white rounded-lg w-[90%] max-w-4xl max-h-[90vh] overflow-auto p-5 shadow-lg"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg lg:text-xl">{title}</p>
            <Button
              onclick={onClose}
              classes="text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              <img
                className="w-[24px] h-[24px]"
                src="/svg/close.svg"
                alt=""
              />
            </Button>
          </div>

          {isEdit ? (
            <EditForm
              inputPatterns={inputPatterns}
              isPending={isPending}
              onAction={onAction}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          ) : (
            <>
              {Object.keys(tableData).length > 0 ? (
                <Table
                  thead={tableData.thead}
                  tbody={tableData.tbody}
                  scroll={false}
                />
              ) : (
                <p className="text-sm text-gray-500 mt-5">
                  دوره‌ای برای نمایش وجود ندارد.
                </p>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(Modal);
