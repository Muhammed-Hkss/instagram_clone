import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getFollowers } from '../../config';
import cls from './Subscribers.module.scss'

const Subscribers = () => {
    const [data, setData] = useState(null);
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
      getFollowers(id).then((r) => 
        setData(r.data)
      );
      
    }, [id]);

    console.log(data);


  if(!data) return <div><h1>ssdsddsddfhdfhhdf</h1></div>

  return (
    // <div>
    //   <div className="subscriptions">
    //     {
    //       data?.length >= 1 &&
    //         data?.map((item) => (
    //         <div key={item?.id} onClick={() => navigate(`/users/${item?.to_user}`)}>
    //           <img
    //             src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
    //             alt=""
    //           />
    //           <span>user</span>
    //         </div>
    //     ))}
    //   </div>
    // </div>
    <div className={cls.container}>
      <div  className={cls.subscribers_data}>

          <div className={cls.logo_bix_btn_data}>
            <h3 className={cls.menuLogo}>
              Подписчики
            </h3>


          </div>


          <div className={cls.subscribers_data}>
              {
                data?.length >= 1 &&
                data?.map((item) => (
                  <div className={cls.subscribers} key={item?.id} onClick={() => navigate(`/users/${item?.from_user}`)}>
                    <img
                      src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
                      alt=""
                    />

                    <div className={cls.user_name}>
                      <h2>user</h2>
                      <p>LastName FirstName</p>
                    </div>

                    <button className={cls.subscribers_btn}>Подписки</button>
                  </div>
                ))
              }
          </div>
      </div>
    </div>
  )
}

export default Subscribers
