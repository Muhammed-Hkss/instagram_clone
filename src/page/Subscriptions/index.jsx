import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getFollowings } from '../../config';
import cls from './Subscriptions.module.scss'

const Subscriptions = () => {
    const [data, setData] = React.useState(null);
    const { id } = useParams()
    const navigate = useNavigate();


    useEffect(() => {
      getFollowings(id).then((r) => 
        setData(r.data)
      );
    }, []);

    console.log(data);

  if(!data) return <div><h1>ssdsddsddfhdfhhdf</h1></div>
  return (
    <div>
      {/* <div className="subscriptions">
        {data?.length >= 1 &&
          data?.map((obj) => (
            <div key={obj?.id} onClick={() => navigate(`/users/${obj?.to_user}`)}>
              <img
                src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
                alt=""
              />
              <span>user</span>
            </div>
        ))}
      </div> */}

      <div className={cls.container}>
        <div  className={cls.subscriptions_data}>

          <div className={cls.logo_bix_btn_data}>
            <h3 className={cls.menuLogo}>
              Ваши подписки
            </h3>


          </div>


          <div className={cls.subscriptions_data}>
              {
                data?.length >= 1 &&
                data?.map((obj) => (
                  <div className={cls.subscriptions} key={obj?.id} onClick={() => navigate(`/users/${obj?.to_user}`)}>
                    <img
                      src="https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
                      alt=""
                    />

                    <div className={cls.user_name}>
                      <h2>user</h2>
                      <p>LastName FirstName</p>
                    </div>

                    <button className={cls.subscriptions_btn}>Подписки</button>
                  </div>
                ))
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscriptions
