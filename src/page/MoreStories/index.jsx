import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DelStories, getMoreStories } from '../../config'
import { BiX } from 'react-icons/bi';
import cls from './getMoreStories.module.scss'

const MoreStories = () => {
  const accessToken = localStorage.getItem('accessToken');  
  const [moreStories , setMoreStories] = useState('')
  const { id } = useParams();
  const navigate = useNavigate()


    
  useEffect(() => {
    getMoreStories(accessToken).then((r) => {
      setMoreStories(r.data?.filter((item) => item?.id === Number(id))[0]);
    });
  }, [accessToken , id]);




  const [ storyId, setStoryId ] = React.useState(0)




  const delete_story = (id) => {
    DelStories(accessToken, id)
    if(storyId === moreStories?.length || storyId + 1 === moreStories?.length){
      // setActive(false)
      navigate('/')
    }
    // else{
    //   setStoryId(storyId + 1)
    // }
  }


   const delete_story2 = () => {
    DelStories(accessToken, moreStories?.id)
    if(moreStories?.id){
      navigate('/')
    }
  }


  console.log(storyId);








  return (
    <div className={cls.container_more_story}>
      <div className={cls.row}>
        
        <div className={cls.header_storry}>
          <div className={cls.user_avatar_data}>
            <img className={cls.avatar} src="" alt="" />
          </div>
          <div className={cls.bix_btn_data}>
            <BiX onClick={() => delete_story2(moreStories?.id)} />
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
