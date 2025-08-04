import Button from "../ui/Button";

function UserCourseItem({ id, icon, title }) {
  return (
    <div
      className={`course__infos mt-5 flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 px-5 bg-white shadow-[var(--cart-shadow)] rounded-lg`}
      key={id}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="icon mb-5 lg:ml-7 lg:mb-0">
          <img className="w-[50px] h-[50px]" src={icon} alt="" />
        </div>
        <div className="info flex flex-col mb-7 lg:mb-0">
          <h3 className="course-title text-sm lg:text-[16px]">{title}</h3>
          <p className="course-guide text-xs text-[#00000099] lg:text-sm mt-2">
            برای مشاهده به صفحه دوره مراجعه فرمایید.
          </p>
        </div>
      </div>

      <div className="button-wrapper flex justify-end lg:self-end">
        <Button
          to={`/courses/${id}`}
          classes="border border-green-600 !text-xs lg:!text-sm !py-1 !px-3 rounded-md text-green-600"
        >
          مشاهده دوره
        </Button>
      </div>
    </div>
  );
}

export default UserCourseItem;
