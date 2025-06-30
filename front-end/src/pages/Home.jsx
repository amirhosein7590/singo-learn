import { useEffect } from "react"
import Button from "../components/ui/Button"

function Home(){

    useEffect(()=>{
        document.title = 'صفحه اصلی'
    },[])
    
    return(
        <>
        <section className="flex flex-col">
            <div className="row flex flex-col lg:flex-row items-center">
                <div className="banner w-full lg:w-1/2 flex justify-center lg:order-2">
                <img src="./public/images/banner.jpeg" alt="" />
            </div>
            <div className="text mt-6 w-full lg:w-1/2">
                <h1 className="vazir-bold text-[23px] md:text-[40px] lg:text-[60px] mb-4 w-full">آموزش برنامه نویسی با<br /> سینگو لرن</h1>
                <h3 className="text-[#757575] text-[14px] md:text-[16px] lg:text-[18px]">آموزش هدفمند، پروژه محور و جامع برنامه نویسی همراه با پشتیبانی دائمی جزو استاندارد های آموزشی سینگو لرن است که بدون شک باعث ورود شما به بازار کار خواهد شد.</h3>
            </div> 
            </div>

            <div className="row flex my-8 lg:my-0">
                <Button to='/courses' classes="bg-[var(--dark-purple)] flex text-white rounded-2xl items-center">
                    مشاهده دوره ها
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 20.884 27.105"><path d="M9.358,6.463a5,5,0,0,1,8.388,0l4.347,6.7A5,5,0,0,1,17.9,20.884H9.205a5,5,0,0,1-4.194-7.722Z" transform="translate(0 27.105) rotate(-90)" fill="#fff"></path></svg>
                </Button>

                <Button to='/students-comments' classes="mr-4 bg-[var(--light-purple)] text-[var(--dark-purple)] py-2.5 px-5 rounded-2xl">
                    نظرات دانشجویان
                </Button>
            </div>
           
        </section>
        </>
    )   
}
export default Home
