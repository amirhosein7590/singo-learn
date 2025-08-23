  /**
   * Dynamic form component for editing and creating entities with validation
   * 
   * A reusable form component that dynamically generates form fields based on input patterns
   * Supports various input types including text, number, file, select, and rich text editor
   * Integrates with react-hook-form for comprehensive form validation and management
   * 
   * @component
   * @param {Object} props - Component properties
   * @param {string} props.title - Form title displayed in the header
   * @param {Array} props.inputPatterns - Array of input configurations (from BASE_CREATE_COURSE_INPUT_PATTERNS)
   * @param {Function} props.onAction - Callback function called with form data on submission
   * @param {boolean} props.isPending - Loading state for submit button
   * @param {Array} [props.buttons] - Additional action buttons configuration
   * @param {string} [props.btnText] - Custom text for the submit button
   * @param {boolean} [props.isFetchingNextPage] - Loading state for infinite scroll (select inputs)
   * @param {Function} [props.fetchNextPage] - Function to fetch next page (infinite scroll)
   * @param {boolean} [props.hasNextPage] - Flag indicating more pages available (infinite scroll)
   * 
   * @example
   * // Basic usage:
   * <EditForm
   *   title="ویرایش دوره"
   *   inputPatterns={BASE_CREATE_COURSE_INPUT_PATTERNS}
   *   onAction={handleFormSubmit}
   *   isPending={isSubmitting}
   *   btnText="بروزرسانی دوره"
   * />
   * 
   * @note
   * - Uses react-hook-form's Controller for controlled inputs
   * - Automatically shows validation errors via Toast component
   * - Supports conditional rendering based on input type
   * - Handles file inputs with special onChange handlers
   * - Integrates with custom SelectBox and Editor components
   * - Provides loading states for better user experience
   */


  import { useEffect, useState, memo } from "react";
  import { Controller, useForm } from "react-hook-form";
  import {
    resgisterToastSetter,
    showToastHandler,
  } from "../../utils/ToastController";
  import Toast from "./Toast";
  import Input from "../ui/Input";
  import Button from "../ui/Button";
  import SelectBox from "../ui/SelectBox";
  import Editor from "../sections/Editor";

  function EditForm({
    title,
    inputPatterns,
    onAction,
    isPending,
    buttons,
    btnText,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  }) {
    const {
      control,
      handleSubmit,
      formState: { errors, submitCount },
      getValues,
      reset
    } = useForm({
      mode: "onSubmit",
      reValidateMode: "onSubmit",
      defaultValues: inputPatterns.reduce((acc, input) => {
        if (["number", "text", "email"].includes(input.type)) {
          acc[input.name] = input.defaultValue || "";
        }
        return acc;
      }, {}),
    });

    const [showToast, setShowToast] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      let error = Object.values(errors)[0]?.message;
      if (error) {
        showToastHandler(error, "error");
      }
    }, [submitCount]);

    const submit = (data) => {
      onAction(data);
    };

    useEffect(() => {
      resgisterToastSetter(setShowToast);
    }, []);
    return (
      <>
        <div className="edit-form shadow-[var(--cart-shadow)] bg-white py-3 px-3 lg:px-5 rounded-lg">
          <div className="edit-title flex">
            <p className="text-sm lg:text-lg">{title}</p>
          </div>

          <form
            onSubmit={handleSubmit(submit)}
            className="form mt-7 lg:mt-10 flex flex-col"
          >
            <div className="inputs-wrapper gap-x-1 flex flex-col flex-wrap lg:flex-row lg:justify-between lg:items-center">
              {inputPatterns.map((input) => (
                <Controller
                  name={input.name}
                  key={input.name}
                  control={control}
                  rules={input.rules}
                  render={({ field }) => (
                    <>
                      {input.type != "editor" && (
                        <div
                          className={`flex flex-col w-full lg:w-[48%] my-2 relative ${
                            input.border == "hidden"
                              ? "border-0"
                              : "border border-[#aaaa]"
                          } rounded-sm py-2 px-4 `}
                        >
                          {input.type == "select" ? (
                            <SelectBox
                              name={input.name}
                              label={input.label}
                              value={field.value}
                              onChange={field.onChange}
                              options={input.options}
                              multiple={input.multiple}
                              placeholder={input.placeholder}
                              isFetchingNextPage={
                                input.infiniteScrollProps?.isFetchingNextPage ??
                                isFetchingNextPage
                              }
                              hasNextPage={
                                input.infiniteScrollProps?.hasNextPage ??
                                hasNextPage
                              }
                              fetchNextPage={
                                input.infiniteScrollProps?.fetchNextPage ??
                                fetchNextPage
                              }
                            />
                          ) : input.type == "file" ? (
                            <Input
                              label={input.label}
                              id={input.id}
                              name={input.name}
                              type={input.type}
                              classes={input.classes}
                              placeholder={input.placeholder}
                              onChange={(files)=> field.onChange(files)}
                            />
                          ) : (
                            <Input
                              label={input.label}
                              id={input.id}
                              name={input.name}
                              type={input.type}
                              classes={input.classes}
                              placeholder={input.placeholder}
                              toggleVisibleButton={
                                input.type == "password" &&
                                input.toggleVisibleButton
                              }
                              showPassword={
                                input.type == "password" && showPassword
                              }
                              setShowPassword={
                                input.type == "password" && setShowPassword
                              }
                              {...field}
                            />
                          )}
                        </div>
                      )}
                      {input.type == "editor" && (
                        <div className="w-full">
                          <Editor {...input} {...field} />
                        </div>
                      )}
                    </>
                  )}
                />
              ))}
            </div>

            <div className="button-wrapper flex mt-4 justify-between items-center lg:justify-start">
              <Button
                classes="text-white bg-[var(--dark-purple)] rounded-md !py-2 !px-4 !text-xs lg:!text-sm "
                type="submit"
              >
                {isPending ? "در حال ارسال ..." : btnText || "ذخیره تغییرات"}
              </Button>

              {buttons &&
                buttons.map((button) => (
                  <Button
                    key={button.id}
                    classes={button.classes}
                    type={button.type}
                    onclick={() => {
                      let value = getValues();
                      button.onClick(value[button.targetValue]);
                    }}
                  >
                    {button.isPending ? "در حال ارسال ..." : button.text}
                  </Button>
                ))}
            </div>
          </form>
        </div>

        {showToast?.visible && <Toast {...showToast} />}
      </>
    );
  }

  export default memo(EditForm);
