import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar'

const LFNRCP = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <Outlet />
      </div>
    </>
  )
}

export default LFNRCP