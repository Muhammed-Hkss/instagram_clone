import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { api, DeletePosts, GetUser } from '../../config'
import { ProfileList } from '../../utils/Account'
import { getLikedUser, getPostsOfTheUser } from '../../config/index';
import cls from './Account.module.scss'
import Test from '../../Test/test'


const Profile = () => {
  const accessToken = localStorage.getItem('accessToken');
  const data = JSON.parse(localStorage.getItem('user'));
  const [posts, setPosts] = React.useState(null);
  const [liked, setLiked] = React.useState(null)
  const [active, setActive] = React.useState('posts');
  const [users , setUsers] = useState('')
  const navigate = useNavigate()


  useEffect(() => {
    GetUser(accessToken).then(r => {
      setUsers(r.data)
    })
  } , [])


  useEffect(() => {
    getPostsOfTheUser(data.id).then(r => {
      setPosts(r.data)
    })
  } , [])



  console.log(posts);

  return (
    <div className={cls.container}>



      {/* <button
        // onClick={setOpen(true)}
        onClick={() => {setOpen(!open)}}
      >
        cdfhdghsdhdfhd
      </button> */}

      {/* <Test
        open={open}
        setOpen ={setOpen}
      /> */}


      <div className={cls.profile_header_data}>
        <div className={cls.profile_image_data}>
          {
            users?.avatar === null ? 
            <img className={cls.profile_image} src="https://yt3.ggpht.com/ytc/AMLnZu-YPuBClh-4dE-JroLTQDQ9-ANdt_zn6FjBifIfRw=s900-c-k-c0x00ffffff-no-rj" alt="" /> :
            <img className={cls.profile_image} src={users?.avatar} alt="" />
          }
        </div>
        <div className={cls.profile_text_data}>
          <div className={cls.user_name_data}>
            <p className={cls.user_name}>{users?.username}</p>
            <div className={cls.user_name_button_data}>
              <button 
                className={cls.user_name_button}
                onClick={() => navigate('/account/edit')}
              >
                Редактировать профиль
              </button>
              <AiOutlineSetting className={cls.user_setting_btn}/>
            </div>
          </div>
          <div className={cls.publications_data}>
            <p style={{cursor:'pointer'}}>{posts?.length} публикаций</p>
            {/* <p>{users?.subscribers} подписчики </p>
            <p>{users?.subscriptions } подписки </p> */}




            <span onClick={() => 
                users?.subscribers !== 0 &&
                navigate(`/users/${users?.id}/subscribers`)
                // setOpen(!open)
              }
            >
              <p style={{cursor:'pointer'}}>{users?.subscribers} подписчики</p> 
            </span>
            <span
              onClick={() =>
                users?.subscriptions !== 0 &&
                navigate(`/users/${users?.id}/subscriptions`)
              }
            >
              <p style={{cursor:'pointer'}}>{users?.subscriptions} подписки</p> 
            </span>













          </div>
          <div className={cls.about_profile_data}>
            <p>{users?.first_name}  {users?.last_name}</p>
            <p>{users?.bio}</p>
          </div>
        </div>


      </div>


      <div className={cls.profile_list_data}>
        <div className={cls.profile_list}>
          {
            ProfileList.map(item => (
              <span
                key={item.id}
                className={active === item.setActive ? `${cls.span_active}` : `${cls.span}`}
                onClick={() => setActive(item.setActive)}
              >
                {item.logo} {item.title}
              </span>
            ))
          }
        </div>
      </div>

      <div className={cls.posts_data}>
        {
          posts?.map(item => (
            <div className={cls.posts} onClick={() => navigate(`/posts/${item.id}`)} key={item.id}>
              {/* <button onClick={() => DeletePosts(item.id)}>delete posts</button> */}
              <img
                src={
                  item.post_images?.length >= 1 ?
              
                  item.post_images[0]?.image : 
                  'https://kartinkin.net/uploads/posts/2021-07/1625153619_35-kartinkin-com-p-anime-van-pis-anime-krasivo-55.jpg'
                  // 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
                }
                alt="404"
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Profile

