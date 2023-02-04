import React, { useEffect, useState } from 'react'
import cls from './Accounts.module.scss'
import { AiOutlineSetting } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { ProfileList } from '../../utils/Account'
import { getPostsOfTheUser, GetUsersId, postFollow, unFollow } from '../../config'
import { BASE_URL } from '../../config/api'

const Accounts = () => {
  const accessToken = localStorage.getItem('accessToken')
  const user = JSON.parse(localStorage.getItem('user'))
  const [users , setUsers] = useState(null)
  const [posts, setPosts] = React.useState(null);
  const [active, setActive] = React.useState('posts');
  const [follow, setFollow] = React.useState(false);
  const navigate  = useNavigate()
  const { id } = useParams()
  

  useEffect(() => {
    GetUsersId(id).then(r => {
      setUsers(r.data)
    })
  } , [id])



  useEffect(() => {
    getPostsOfTheUser(id).then(r => {
      setPosts(r.data)
    })
  } , [id])


  // const to__follow = () => {
  //   if(accessToken){
  //     postFollow({to_user: Number(id)}, accessToken )
  //     .then((r) => {
  //       if (r) {
  //         setFollow(true);
  //         localStorage.setItem('user', {...user, subscribers: user.subscribers+1})
  //       }
  //     });
  //   }
  // }


  const to__follow = () => {
    postFollow(
      {
        to_user: Number(id),
      },
      accessToken,
    ).then((r) => {
      if (r) {
        setFollow(true);
      }
    });

    getPostsOfTheUser(id).then(r => {
      setPosts(r.data)
    })
  };

  const un_Follow = () => {
    unFollow(Number(id), accessToken).then((r) => {
      setFollow(false);
    });

    
    getPostsOfTheUser(id).then(r => {
      setPosts(r.data)
    })
  };



console.log(follow);

  

  return (
    <div className={cls.container}>

      <div>
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
                  className={!follow ? 'folow_btn' : 'un_follow_btn'}
                  onClick={() => (!follow ? to__follow() : un_Follow())}>
                  {follow ? 'Following' : 'Follow'}
                </button>

                

                <button className={cls.user_name_button}>Отправить сообщение</button>

                <AiOutlineSetting className={cls.user_setting_btn}/>

              </div>
            </div>


            <div className={cls.publications_data}>
              <p style={{cursor:'pointer'}}>{posts?.length} публикаций</p>

              <span onClick={() => users?.subscribers !== 0 && navigate(`/users/${users?.id}/subscribers`)}>
                <p style={{cursor:'pointer'}}>{users?.subscribers} подписчики </p> 
              </span>

              <span
                onClick={() => users?.subscriptions !== 0 && navigate(`/users/${users?.id}/subscriptions`)}>
                <p style={{cursor:'pointer'}}>{users?.subscriptions} подписки </p> 
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
            posts?.map(item =>{ 
              console.log(item.post_images[0]?.image);
              return(
              <div className={cls.posts} onClick={() => navigate(`/posts/${item.id}`)} key={item.id}>
                {/* <button onClick={() => DeletePosts(item.id)}>delete posts</button> */}
                {
                  item.post_images?.length >=1 ?
                  <img src={`${BASE_URL}${item.post_images[0]?.image}`} alt="404" /> :
                  <img src='https://pbs.twimg.com/media/ErBPC3MXUAYsTq1.jpg' alt="" />
                }
              </div>
            )}
            )
          
          }
        </div>
      </div>

      
    </div>
  )
}

export default Accounts
