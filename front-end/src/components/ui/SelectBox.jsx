/**
 * Reusable select input component with support for single/multiple selection
 * 
 * Features include: single/multiple selection, infinite scroll, initial value population
 * Integrates with react-hook-form through Controller component
 * Supports observation pattern for infinite scroll loading
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.name - Input name for form identification
 * @param {Object} [props.label] - Label configuration object
 * @param {Array} props.options - Select options array with label/value pairs
 * @param {boolean} [props.multiple=false] - Enable multiple selection
 * @param {any} props.value - Current selected value(s) from react-hook-form
 * @param {Function} props.onChange - Change handler from react-hook-form
 * @param {string} [props.placeholder] - Placeholder text when no selection
 * @param {boolean} [props.isFetchingNextPage] - Loading state for infinite scroll
 * @param {Function} [props.fetchNextPage] - Function to fetch next page of options
 * @param {boolean} [props.hasNextPage] - Flag indicating more pages available
 * 
 * @note
 * - Automatically populates initial values based on options' initialSelect property
 * - Uses IntersectionObserver for infinite scroll detection
 * - Supports both single and multiple selection modes
 * - Integrates with Framer Motion for smooth animations
 * - Handles initial selection setup through useEffect hooks
 */

import { useState, memo, useEffect , useRef, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Spinner = lazy(()=> import('../sections/Spinner'))

function SelectBox({
  name,
  label,
  options = [],
  multiple = false,
  value,
  onChange,
  placeholder = "یک گزینه انتخاب کنید",
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}) {
  const [open, setOpen] = useState(false);

  const isSelected = (val) => (multiple ? value?.includes(val) : value === val);

  const handleSelect = (val) => {
    if (multiple) {
      const exists = value?.includes(val);
      const newValue = exists
        ? value.filter((v) => v !== val)
        : [...(value || []), val];
      onChange(newValue);
    } else {
      onChange(val);
      setOpen(false);
    }
  };
  const observerRef = useRef(null);

  useEffect(() => {
    if (multiple) {
      let initialValues = options
        .filter((opt) => opt.initialSelect)
        .map((opt) => opt.value);

      if (initialValues.length && (!value || !value.length)) {
        onChange(initialValues);
      }
    } else {
      let initialValue = options.find((opt) => opt.initialSelect)?.value;
      onChange(initialValue);
    }
  }, [options]);

  useEffect(() => {
    if (!open || !observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { root: null, threshold: 0.5 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [open, hasNextPage]);

  return (
    <div className="relative w-full">
      {label && <label className={label.classes}>{label.message}</label>}

      <div
        className="rounded-sm bg-white cursor-pointer flex justify-between items-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-sm text-gray-700 truncate">
          {multiple ? (
            value?.length ? (
              value
                .map((v) => options.find((o) => o.value === v)?.label || v)
                .join("، ")
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )
          ) : value ? (
            options.find((o) => o.value === value)?.label || placeholder
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-y-auto text-sm"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors ${
                  isSelected(opt.value) ? "bg-blue-50 font-semibold" : ""
                }`}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </li>
            ))}
            <div
              ref={observerRef}
              className="observer w-[1px] h-[1px] opacity-0"
            ></div>
            {isFetchingNextPage && <div className="flex justify-center items-center"><Spinner size="sm" /></div>}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(SelectBox);
