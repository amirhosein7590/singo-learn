import React from "react";
import Button from "../ui/Button";

function CourseItem({ icon, title, price, duration, stdCount , courseId }) {
  return (
    <div className="card flex flex-col my-5 flex-1 md:mx-2 p-7 shadow-lg rounded-xl w-full md:w-1/2 lg:w-3/12">
      <div className="card__icon mb-7"><img className="w-[80px] h-[80px]" src={icon} alt="" /></div>
      <div className="card__course-title mb-7">
        <h4>{title}</h4>
      </div>
      <div className="card__course-duration flex items-center mb-4 my-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          viewBox="0 0 35.517 35.517"
        >
          <path
            d="M17.305,0h.905a17.716,17.716,0,0,1,6.854,1.577A17.8,17.8,0,0,1,35.517,17.245v.963A17.815,17.815,0,0,1,21.5,35.118a18.726,18.726,0,0,1-3.289.4h-.9A17.8,17.8,0,0,1,0,18.213v-.965A18.139,18.139,0,0,1,.862,12.29,17.827,17.827,0,0,1,17.305,0m-.427,2.395A15.387,15.387,0,1,0,24.09,3.733,15.366,15.366,0,0,0,16.878,2.395Z"
            fill="#7C3AED"
          ></path>
          <path
            d="M238.929,103.557a1.182,1.182,0,0,1,2.363,0c.006,2.979,0,5.959,0,8.938q2.736,2.193,5.475,4.383a1.182,1.182,0,0,1-1.456,1.861c-1.9-1.514-3.8-3.038-5.7-4.554a1.355,1.355,0,0,1-.691-1.12Q238.926,108.309,238.929,103.557Z"
            transform="translate(-222.352 -95.301)"
            fill="#7C3AED"
          ></path>
        </svg>
        <p className="text-sm mr-2 mt-1 text-[var(--dark-purple)]">{duration} ساعت</p>
      </div>
      <div className="card__course-desc mb-7 flex justify-between items-center">
        <div className="students-count flex items-center bg-[var(--light-gray)] rounded-full py-1 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 24.802 21.788"
          >
            <g transform="translate(0 -31.21)">
              <path
                d="M12.082,31.27a.945.945,0,0,1,.743.036q5.732,2.146,11.465,4.285a.764.764,0,0,1,.512.667v.052a.764.764,0,0,1-.515.672q-1.944.73-3.891,1.453-.006,2.439,0,4.878a2.381,2.381,0,0,1-.19,1.062,3.382,3.382,0,0,1-1.341,1.381,10.239,10.239,0,0,1-3.546,1.2,18.542,18.542,0,0,1-5.2.093,11.006,11.006,0,0,1-4.147-1.27,3.348,3.348,0,0,1-1.4-1.459,2.218,2.218,0,0,1-.162-.863c0-1.673,0-3.345,0-5.018-.985-.364-1.968-.735-2.952-1.1q0,5.167,0,10.334a1.805,1.805,0,0,0,.141.545c.426,1.287.861,2.57,1.282,3.859a.728.728,0,0,1-.644.922.761.761,0,0,1-.782-.615.754.754,0,0,1-.773.614A.735.735,0,0,1,0,52.305V36.262A.79.79,0,0,1,.194,35.8a1.339,1.339,0,0,1,.564-.3q5.663-2.112,11.324-4.227M4.77,35.547a4.307,4.307,0,0,0,.461.012h6.882a1.267,1.267,0,0,1,.626.087.724.724,0,0,1-.336,1.365c-2.471,0-4.943,0-7.414,0-.075,0-.15.006-.225.012,2.549.938,5.09,1.9,7.636,2.846q4.767-1.782,9.535-3.563c0-.011,0-.032,0-.043Q17.171,34.48,12.4,32.7c-2.544.948-5.085,1.9-7.631,2.846m1.092,3.432q0,2.141,0,4.281a1.113,1.113,0,0,0,.077.555,2.018,2.018,0,0,0,.7.667,7.063,7.063,0,0,0,1.88.776,14.553,14.553,0,0,0,3.3.464,14.91,14.91,0,0,0,4.921-.6,5.594,5.594,0,0,0,1.718-.849,1.058,1.058,0,0,0,.481-.766q0-2.263,0-4.526L12.723,41.3a.873.873,0,0,1-.643,0Q8.97,40.142,5.862,38.979Z"
                fill="#5e81d1"
              ></path>
            </g>
          </svg>
          <p className="mr-2 mt-[3px] text-sm text-[var(--dark-gray)]">{stdCount} نفر</p>
        </div>
        <p className="price text-[#00000099]">{price} تومان</p>
      </div>
      <div className="card__button-wrapper border-t flex justify-between items-center border-t-[#0000001f] pt-4">
        <Button classes="bg-[var(--dark-purple)] text-white py-2 px-6 rounded-lg">ثبت نام</Button>

        <Button to={`/courses/${courseId}`} classes='flex items-center text-[var(--dark-purple)]'>
        مشاهده دوره
        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 20.884 27.105"><path d="M9.358,6.463a5,5,0,0,1,8.388,0l4.347,6.7A5,5,0,0,1,17.9,20.884H9.205a5,5,0,0,1-4.194-7.722Z" transform="translate(0 27.105) rotate(-90)" fill="#7C3AED"></path></svg>
        </Button>
      </div>
    </div>
  );
}

export default CourseItem;
