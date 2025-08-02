import { useForm, Controller } from "react-hook-form";
import AuthForm from "../../components/sections/AuthForm";
import Button from "../../components/ui/Button";
import useMutate from "../../hooks/useAxiosMutate";
import Input from "../../components/ui/Input";
import { useEffect, useState } from "react";
import { showToastHandler } from "../../utils/ToastController";

function ForgotPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors, submitCount },
  } = useForm({ mode: "onSubmit", reValidateMode: "onSubmit" });

  useEffect(() => {
    let error = Object.values(errors)[0]?.message;
    if (error) {
      showToastHandler(error, "error");
    }
  }, [submitCount]);

  const { mutate, isPending } = useMutate(
    "forgotPassword",
    null,
    "/forgot-password",
    null,
    "post",
    false
  );

  const submit = (data) => {
    mutate(data, {
      onSuccess: (resonse) => {
        showToastHandler(resonse.message, "success");
      },
      onError: (err) => {
        let errorMessage = err.response.data.error;
        showToastHandler(errorMessage, "error");
      },
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const inputPatterns = [
    {
      name: "username",
      type: "text",
      label: {
        message: "نام کاربری را وارد کنید",
        classes: "mb-2",
      },
      classes: "border border-1 border-[#aaaa] rounded-sm py-2 px-4 text-lg",
      rules: {
        required: "نام کاربری نمیتواند خالی باشد",
        pattern: {
          value: /^.{5,}$/,
          message: "نام کاربری نمیتواند کمتر از 5 کاراکتر باشد",
        },
      },
    },
    {
      name: "newPassword",
      type: "password",
      classes: "border border-1 border-[#aaaa] rounded-sm py-2 px-4 text-lg",
      label: {
        message: "رمز عبور جدید را وارد کنید",
        classes: "mb-2",
      },
      rules: {
        required: "رمز عبور نمی تواند خالی باشد",
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
          message:
            "رمز عبور باید حداقل یک حرف بزرگ و کوچک ، یک سمبل و عدد داشته باشد",
        },
      },
    },
  ]; // input pattern for validation and use in Controlled Component
  return (
    <>
      <AuthForm>
        <form
          className="shadow-[var(--cart-shadow)] rounded-lg py-10 px-5 flex flex-col"
          onSubmit={handleSubmit(submit)}
        >
          <div className="login_register_buttons flex mb-4 justify-center items-center">
            <Button
              to="/login"
              classes="border-1 border-[var(--dark-purple)] text-[var(--dark-purple)] md:py-2 !py-2 !px-3 ml-4 rounded-sm text-[16px] shadow-[var(--cart-shadow)] flex items-center"
            >
              <svg
                className="ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                fill="var(--dark-purple)"
                viewBox="0 0 17.14 21.425"
              >
                <g
                  id="_000000ff"
                  data-name="#000000ff"
                  transform="translate(-85.345 -42.66)"
                >
                  <path
                    id="Path_170"
                    data-name="Path 170"
                    d="M130.627,42.712a3.487,3.487,0,0,1,.626-.052h8.489a3.209,3.209,0,0,1,3.214,2.778,5.762,5.762,0,0,1,.031.806V60.2a5.76,5.76,0,0,1-.1,1.443,3.231,3.231,0,0,1-2.3,2.332,5.637,5.637,0,0,1-1.5.106H131.2a3.22,3.22,0,0,1-3.212-3.179c0-1.071,0-2.142,0-3.213a1.071,1.071,0,1,1,2.141-.053c0,1.089,0,2.177,0,3.266a1.075,1.075,0,0,0,1.067,1.036q4.3,0,8.59,0a1.076,1.076,0,0,0,1.053-1.085q0-7.332,0-14.665a1.873,1.873,0,0,0-.07-.7,1.073,1.073,0,0,0-.984-.69q-4.294,0-8.588,0a1.074,1.074,0,0,0-1.068,1.04c0,.986,0,1.972,0,2.958a1.516,1.516,0,0,1-.118.773,1.07,1.07,0,0,1-2.023-.472q0-1.631,0-3.264a3.221,3.221,0,0,1,2.636-3.127Z"
                    transform="translate(-40.503 0)"
                    fill="var(--dark-purple)"
                  ></path>
                  <path
                    id="Path_171"
                    data-name="Path 171"
                    d="M93.612,170.98a1.072,1.072,0,0,1,1.057.253c1.042,1.033,2.071,2.08,3.118,3.108a1.107,1.107,0,0,1,.4,1.068,1.254,1.254,0,0,1-.475.731c-1.025,1.017-2.041,2.044-3.066,3.06a1.07,1.07,0,0,1-1.708-1.214,1.6,1.6,0,0,1,.4-.5c.407-.4.807-.814,1.218-1.213q-4.06.006-8.119,0a1.071,1.071,0,0,1-.362-2.085,1.634,1.634,0,0,1,.563-.058c2.639,0,5.279,0,7.918,0-.461-.448-.91-.908-1.367-1.361a1.071,1.071,0,0,1,.429-1.794Z"
                    transform="translate(0 -121.831)"
                    fill="var(--dark-purple)"
                  ></path>
                </g>
              </svg>
              ورود
            </Button>

            <Button
              to="/register"
              classes="border-1 border-[var(--dark-purple)] text-[var(--dark-purple)] rounded-sm md:py-2 !py-2 !px-3 shadow-[var(--cart-shadow)] flex items-center"
            >
              <svg
                className="ml-1"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                version="1.2"
              >
                <path
                  fill="#7C3AED"
                  d="M21 14h-6a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2zm-3 3a1 1 0 0 1-1-1v-6a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1zM9 6c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3m0-2C6.236 4 4 6.238 4 9s2.236 5 5 5 5-2.238 5-5-2.236-5-5-5zm0 13c2.021 0 3.301.771 3.783 1.445C12.1 18.705 10.814 19 9 19c-1.984 0-3.206-.305-3.818-.542C5.641 17.743 6.959 17 9 17m0-2c-3.75 0-6 2-6 4 0 1 2.25 2 6 2 3.518 0 6-1 6-2 0-2-2.354-4-6-4z"
                ></path>
              </svg>
              ثبت نام
            </Button>
          </div>
          <h5 className="text-center my-7 text-2xl text-[#00000099]">
            بازیابی رمز عبور
          </h5>

          {inputPatterns.map((input) => (
            <Controller
              key={input.name}
              control={control}
              name={input.name}
              rules={input.rules}
              render={({ field }) => (
                <div className="flex flex-col my-5 relative">
                  <Input
                    classes={input.classes}
                    label={input.label}
                    {...field}
                    type={input.type}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
              )}
            />
          ))}

          <Button
            type="submit"
            classes="text-white bg-[var(--dark-purple)] py-1 text-[16px] rounded-sm shadow-[var(--cart-shadow)] mt-3"
            disabled={isPending}
          >
            {isPending ? "درحال ارسال" : "ورود"}
          </Button>
        </form>
      </AuthForm>
    </>
  );
}

export default ForgotPassword;
