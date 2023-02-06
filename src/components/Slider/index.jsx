import React from 'react'
import { useNavigate } from 'react-router-dom';
import { getStories } from '../../config';
import cls from './Slider.module.scss'


const Slider = () => {


  const accessToken = localStorage.getItem('accessToken');
  const [allStories, setAllStories] = React.useState(null);
  const navigate = useNavigate();



  React.useEffect(() => {
    getStories(accessToken).then((r) => {
      setAllStories(r.data);
    });
  }, [accessToken]);

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