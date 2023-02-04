import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getStories, GetUsersId } from '../../config';
import cls from './Slider.module.scss'


const Slider = () => {

  const test = [
    {
      id:1,
      image:'https://images8.alphacoders.com/882/882408.jpg',
      title:'almazesh_'
    },
    {
      id:2,
      image:'https://i.pinimg.com/originals/b0/b6/8b/b0b68bc6dfd21f9df09802be25b9162e.jpg',
      title:'sytfadp'
    },
    {
      id:3,
      image:'https://img2.goodfon.ru/original/1280x1024/a/1e/renault-megane-trophy-yellow.jpg',
      title:'itacademy.kg'
    },
    {
      id:4,
      image:'https://s1.1zoom.me/big7/625/BUGATTI_2005-11_Bugatti_Veyron_Black_526459_2560x1706.jpg',
      title:'uras.benlioglu'
    },
    {
      id:5,
      image:'https://pbs.twimg.com/media/C4Rhg1-UEAAE_Hb?format=jpg&name=medium',
      title:'bmwkg'
    },
  ]
  // getStories

  const accessToken = localStorage.getItem('accessToken');
  const [allStories, setAllStories] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  console.log(allStories);
  // console.log(user);


  React.useEffect(() => {
    getStories(accessToken).then((r) => {
      setAllStories(r.data);
    });
  }, []);

  return (
    <div className={cls.slider_container}>
      <div className={cls.slider_data}>
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
              {
                user?.username.length >= 10
                  ? `${user?.username.slice(0, 9)}...`
                  : user?.username
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider