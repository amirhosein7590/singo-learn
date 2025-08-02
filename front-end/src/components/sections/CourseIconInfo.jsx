import { memo } from "react"

function CourseIconInfo({text , icon , title }) {
  return (
    <div className="course-icon-info w-3/12 aspect-3/2 flex flex-col items-center justify-center">
        <img src={icon} alt="" />
        <p className='mt-2 whitespace-nowrap text-xs text-[#00000099] text-center'>{text} {title}</p>
    </div>
  )
}

export default memo(CourseIconInfo);