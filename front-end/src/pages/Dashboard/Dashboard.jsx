import {useEffect} from 'react'

function Dashboard() {
  useEffect(()=>{
        document.title = 'داشبورد'
    },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard