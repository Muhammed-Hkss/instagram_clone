import React, { useEffect, useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { DelPost, GetPosts, getSaves, GetUser } from '../../config'
import { ProfileList } from '../../utils/Account'
import {  getPostsOfTheUser } from '../../config/index';
import cls from './Account.module.scss'
import { BASE_URL } from '../../config/api'


const Profile = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [posts, setPosts] = React.useState(null);
  const [active, setActive] = React.useState('posts');
  const [users , setUsers] = useState('')
  const [ saves, setSaves ] = React.useState(null)
  const navigate = useNavigate()





  useEffect(() => {
    GetUser(accessToken).then(r => {
      setUsers(r.data)
    })
  } , [accessToken])


  useEffect(() => {
    getPostsOfTheUser(users.id).then(r => {
      setPosts(r.data)
    })


    let savedPosts = []

    getSaves(accessToken, users.id)
    .then(saves => {
      GetPosts(accessToken)
      .then(res => {
          res.data.map(item => {
            return saves.data?.map(save => {
              return save.post === item.id ? savedPosts.push(item) : null
            })
          })
          setSaves(savedPosts.reverse())
      })
    })
  } , [users.id])





  // useEffect(() => {
  //   let savedPosts = []

  //   getSaves(accessToken, users.id)
  //   .then(saves => {
  //     GetPosts(accessToken)
  //     .then(res => {
  //         res.data.map(item => {
  //           return saves.data?.map(save => {
  //             return save.post === item.id ? savedPosts.push(item) : null
  //           })
  //         })
  //         setSaves(savedPosts.reverse())
  //     })
  //   })
  // }, [users.id])














  


  
  return (
    <div className={cls.container}>
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
                ?????????????????????????? ??????????????
              </button>
              <AiOutlineSetting className={cls.user_setting_btn}/>
            </div>
          </div>
          <div className={cls.publications_data}>
            <p style={{cursor:'pointer'}}>{posts?.length} ????????????????????</p>




            <span onClick={() => 
                users?.subscribers !== 0 &&
                navigate(`/users/${users?.id}/subscribers`)
              }
            >
              <p style={{cursor:'pointer'}}>{users?.subscribers} ????????????????????</p> 
            </span>
            <span
              onClick={() =>
                users?.subscriptions !== 0 &&
                navigate(`/users/${users?.id}/subscriptions`)
              }
            >
              <p style={{cursor:'pointer'}}>{users?.subscriptions} ????????????????</p> 
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

      {
        active === 'posts' ? 
        <div className={cls.posts_data}>
          {
            posts?.map(item => {

              
              const DeletePost = () => {
                            DelPost(item.id , accessToken).then(() => {
                              getPostsOfTheUser(users.id).then(r => {
                                setPosts(r.data)
                              })
                            })
              }


              return(
                <div className={cls.posts} 
                // onClick={() => navigate(`/posts/${item.id}`)}
                  key={item.id}
                >
                  {
                    item.post_images?.length >=1 ?
                    <img src={`${BASE_URL}${item.post_images[0]?.image}`} alt="404" /> :
                    <img src='https://pbs.twimg.com/media/ErBPC3MXUAYsTq1.jpg' alt="" />
                  }


                  <div >
                    <button 
                      onClick={() => {
                        DeletePost(item.id)
                        // &&
                        // window.location.reload();
                      }}
                    >
                      Delete post
                    </button>
                  </div> 
                </div>
            )})
          }
        </div>
        : 
        <div className={cls.saved_post_data}>
          {
            saves?.length === 0 ?
            <h3>
              NO SAVED POSTS
            </h3>
            :
            saves?.map(item => (
              <div className={cls.saved_posts} 
                onClick={() => navigate(`/posts/${item.id}`)}
                key={item.id}
              >
                {
                  item.post_images?.length >=1 ?
                  <img src={item.post_images[0]?.image} alt="404" /> :
                  <img src='https://pbs.twimg.com/media/ErBPC3MXUAYsTq1.jpg' alt="" />
                }
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}

export default Profile

