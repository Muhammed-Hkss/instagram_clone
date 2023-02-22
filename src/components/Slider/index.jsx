import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getStories, GetUser } from '../../config';
import cls from './Slider.module.scss'
import { MdAddCircleOutline } from 'react-icons/md'


const Slider = () => {
  const accessToken = localStorage.getItem('accessToken');
  const [allStories, setAllStories] = useState(null);
  const [users , setUsers] = useState('')
  const navigate = useNavigate();



  useEffect(() => {
    getStories(accessToken).then((r) => {
      setAllStories(r.data);
    });

    
    
    GetUser(accessToken).then(r => {
      setUsers(r.data)
    })
    
  }, [accessToken]);


  
  return (
    <div className={cls.slider_container}>
      <div className={cls.slider_data}>

        <div onClick={() => navigate('/ToCreate')} className={cls.slider_profile_image_data}>
          {
            users?.avatar === null ? 
            <img className={cls.profile_image} src="https://yt3.ggpht.com/ytc/AMLnZu-YPuBClh-4dE-JroLTQDQ9-ANdt_zn6FjBifIfRw=s900-c-k-c0x00ffffff-no-rj" alt="" /> :
            <img className={cls.profile_image} src={users?.avatar} alt="" />
          }
          <div className={cls.add_btn}>
            <MdAddCircleOutline />
          </div>
        </div>

        {allStories?.length >= 1 &&
          allStories?.map((item) => (
          <div onClick={() => navigate(`/stories/${item.id}`)} key={item.id} className={cls.slider_image_data}>
            <img
              className={cls.slider_image}
              src={
                item?.file
                  ? item.file
                  : 'https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg'
              }
              alt=""
            />
            <span>
              {/* {
                user?.username.length >= 10
                  ? `${user?.username.slice(0, 9)}...`
                  : user?.username
              } */}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider