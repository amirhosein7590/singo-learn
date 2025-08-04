import { useEffect, useState, memo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  resgisterToastSetter,
  showToastHandler,
} from "../../utils/ToastController";
import Toast from "./Toast";
import Input from "../ui/Input";
import Button from "../ui/Button";

function EditForm({ title, inputPatterns, onAction, isPending }) {
  const {
    control,
    handleSubmit,
    formState: { errors, submitCount },
    reset,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: inputPatterns.reduce((acc, input) => {
      acc[input.name] = input.defaultValue || "";
      return acc;
    }, {}),
  });

  const [showToast, setShowToast] = useState({});

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

  useEffect(() => {
    const defaultValues = inputPatterns.reduce((acc, input) => {
      acc[input.name] = input.defaultValue || "";
      return acc;
    }, {});
    reset(defaultValues);
  }, [inputPatterns, reset]);
  return (
    <>
      <div className="edit-form shadow-[var(--cart-shadow)] bg-white py-3 px-5 rounded-lg">
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
                  <div className="flex flex-col w-full lg:w-[48%] my-2 relative border border-[#aaaa] rounded-sm py-2 px-4 ">
                    <Input
                      label={input.label}
                      name={input.name}
                      type={input.type}
                      classes={input.classes}
                      defaultValue={input.defaultValue}
                      {...field}
                    />
                  </div>
                )}
              />
            ))}
          </div>

          <div className="button-wrapper flex mt-4">
            <Button
              classes="text-white bg-[var(--dark-purple)] rounded-md !py-2 !px-4 "
              type="submit"
            >
              {isPending ? "در حال ارسال ..." : "ثبت تغییرات"}
            </Button>
          </div>
        </form>
      </div>

      {showToast?.visible && <Toast {...showToast} />}

    </>
  );
}

export default memo(EditForm);
