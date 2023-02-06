import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMoreStories } from '../../config'
import { BiX } from 'react-icons/bi';
import cls from './getMoreStories.module.scss'

const MoreStories = () => {
  const accessToken = localStorage.getItem('accessToken');  
  const [moreStories , setMoreStories] = useState('')
  const { id } = useParams();


    
  useEffect(() => {
    getMoreStories(accessToken).then((r) => {
      setMoreStories(r.data?.filter((item) => item?.id === Number(id))[0]);
    });
  }, [accessToken , id]);



  return (
    <div className={cls.container_more_story}>
      <div className={cls.row}>
        
        <div className={cls.header_storry}>
          <div className={cls.user_avatar_data}>
            <img className={cls.avatar} src="" alt="" />
          </div>
          <div className={cls.bix_btn_data}>
            <BiX />
          </div>
        </div>

        <div className={cls.image_data}>
          <img src={moreStories?.file} alt="" />
        </div>
      </div>
    </div>
  )
}

export default MoreStories
