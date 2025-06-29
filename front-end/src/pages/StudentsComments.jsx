import {useEffect} from 'react'

function StudentsComments() {
  useEffect(()=>{
          document.title = 'نظرات دانشجویان'
      },[])
  return (
    <div>StudentsComments</div>
  )
}

export default StudentsComments