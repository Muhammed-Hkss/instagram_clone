import React, { useEffect, useState } from 'react'
import cls from './Card.module.scss'
import { AiOutlineSend } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { TbMessageCircle } from 'react-icons/tb'
import { BsBookmark } from 'react-icons/bs'
import { FaRegSmile } from 'react-icons/fa'
import { api, DeletePosts, GetPosts } from '../../../config'
import axios from 'axios'


const Card = () => {
  const accessToken = localStorage.getItem('accessToken')
  const [getPosts , setGetPosts] = useState('')

  const [users , setUsers] = useState(null)
  
  
  useEffect(() => {
    GetPosts(accessToken).then(r => {
      setGetPosts(r.data)
    })


  } , [])




  return (
    <div className={cls.card}>
      {
        getPosts && getPosts.map(item => {

          return(
            <div key={item.id}>
              {/* <button onClick={() => DeletePosts(item.id , accessToken)}>delete</button> */}
              <div className={cls.header}>
                  <div className={cls.userLogo_data}>
                    <img className={cls.userLogo} src={item.plofileImage} alt="" />
                    
                  </div>
                  <div className={cls.userData}>
                    <div className={cls.userName}>{item.userName}</div>
                    <div className={cls.userPosition}>{item.userPosition}</div>
                  </div>
                  <div className={cls.burger}>. . . </div>
              </div>
              <div className={cls.content_data}>
                  {
                    item.user === users ? '1111' : '2222'
                  }
                  <img className={cls.content} src={item.post_images[0]?.image} alt="" />
                  {/* <video className={cls.video} src={Video} autoPlay muted loop /> */}
              </div>
  
              <div className={cls.communication}>
  
                  <div className={cls.comm1}>
                    <AiOutlineSend /> 
                    <TbMessageCircle />
                    <MdFavoriteBorder />
                  </div>
  
                  <div className={cls.comm2}>
                    <BsBookmark/>
  
                  </div>
                  
  
              </div>
              <div>
                  <p>{item.title}</p>
              </div>
              <div className={cls.footer}>
                  <input className={cls.inputCommet} type="text" placeholder='Добавте комментарий'/>
                  <div className={cls.button}><FaRegSmile /></div>

              </div>
            </div> 
          )}
        )
      }



      
    </div>
  )
}

export default Card





