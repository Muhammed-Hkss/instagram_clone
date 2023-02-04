import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'



const PrivateRoutes = () => {

  const accessToken = localStorage.getItem('accessToken')



  return  accessToken ? <Outlet/> : <Navigate to='/user/register'/>
}
export default PrivateRoutes