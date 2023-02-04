import React, { useState } from 'react'
// import Navbar from '../Navbar'
import Recommendations from '../Recommendations'
import Slider from '../Slider'
import Card from './Card'
import cls from './Main.module.scss'

const Main = () => {



  return (
    
    <>
      {/* <div>
        <Navbar />
      </div> */}

      <div className={cls.container}>
        







        <div className={cls.slider_card}>
          <Slider />
          <Card />

        </div>
        <div className={cls.recommendations}>
          <Recommendations />
        </div>
      </div>
    </>
  )
}


export default Main