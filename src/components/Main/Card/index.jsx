import React, { useEffect, useState } from 'react'
import cls from './Card.module.scss'
import { AiFillHeart , AiOutlineHeart } from 'react-icons/ai'
import { FaRegSmile , FaBookmark , FaRegBookmark } from 'react-icons/fa'
import { FiMessageCircle , FiSend } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { DisLike, Like, PostSave, UnSave } from '../../../config'


const Card = ({item , users , refresh , likes , setRefresh , saves}) => {
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('accessToken')   
  const [CurUser , setCurUser] = useState('')
  const [ savedStatus, setSavedStatus ] = React.useState(false)
  const [ savedId, setSavedId ] = useState('')
  const [ likedStatus, setLikedStatus ] = React.useState(false)
  const [ likedId, setLikedId ] = React.useState('')


  const like = (id) => {
    Like(accessToken, {post: id})
  }

  const dislike = (id) => {
    DisLike(accessToken, id)
  }

  const save = (id) => {
    PostSave(accessToken, {post: id})
  }

  const unsave = (id) => {
    UnSave(accessToken, id)
  }


  useEffect(() => {
    const likedState = likes?.find(likes => likes.post === item.id ? setLikedStatus(true) : '')
    const likedId = likes?.find(likes => likes.post === item.id ? setLikedId(likes.id) : '') 

    const savedState = saves?.find(saves => saves.post === item.id ? setSavedStatus(true) : '') 
    const savedId = saves?.find(saves => saves.post === item.id ? setSavedId(saves.id) : '') 

    const avatar = users && users.map(curUser => curUser.id === item.user ? setCurUser(curUser) : '')

  }, [users , refresh])


  
  return (
    <div className={cls.card}>
      <div key={item.id}>
        <div className={cls.header}>
          <div
            className={cls.userLogo_data}
            onClick={() => navigate(`/users/${CurUser.id}`)}
          >
            {
              CurUser === null ? 
              <img className={cls.userLogo} src="https://cs11.pikabu.ru/post_img/2020/09/09/5/og_og_1599637132217836620.jpg" alt="" /> :
              <img className={cls.userLogo} src={CurUser.avatar} alt="" />
            }
            
          </div>
          <div className={cls.userData}>
            <div className={cls.userName}>{item.userName}</div>
            <div className={cls.userPosition}>{item.userPosition}</div>
          </div>
          <div className={cls.burger}>. . .</div>
        </div>

        <div 
          onClick={() => navigate(`/posts/${item.id}`)}
          className={cls.content_data}
        >
          {
            item.post_images?.length >=1 ?
            <img className={cls.content} src={item.post_images[0]?.image} alt="404" /> :
            <img className={cls.content} src='https://proprikol.ru/wp-content/uploads/2020/11/kartinki-oshibki-32.jpeg' alt="505" />
          }
        </div>
  
        <div className={cls.communication}>
  
          <ul className={cls.comm1}>


            <li
              onClick={() => {
                likedStatus ? dislike(likedId) : like(item.id)
              }}
            >
              {
                likedStatus ? <AiFillHeart /> : <AiOutlineHeart />
              }
            </li>

            <li>
              <FiMessageCircle />
            </li>
            <li>
              <FiSend />
            </li>

            

          </ul>
  
          <ul className={cls.comm2}>
            <li
              onClick={() => {
                savedStatus ? unsave(savedId) : save(item.id)
              }}
            >
              {savedStatus ? <FaBookmark /> : <FaRegBookmark />}

            </li>
          </ul>                  
        </div>

        <div>
          <p>{item.title}</p>
        </div>
        <div className={cls.footer}>
          <input className={cls.inputCommet} type="text" placeholder='Добавте комментарий'/>
          <div className={cls.button}><FaRegSmile /></div>
        </div>
      </div> 
    </div>
  )
}

export default Card





