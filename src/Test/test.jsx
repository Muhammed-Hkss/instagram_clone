import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import { getFollowings } from '../config'
import cls from './Test.module.scss'

import { BiX } from 'react-icons/bi'

const Test = ({open , setOpen}) => {
  // const [open , setOpen] = useState(false)
  const [data, setData] = React.useState(null);
  // const { id } = useParams()
  const navigate = useNavigate();


    useEffect(() => {
      getFollowings('12').then((r) => 
        setData(r.data)
      );
    }, []);

    console.log(data);

  let menuRef = useRef()

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false)
      }
    }

    document.addEventListener("mousedown" , handler)


    return() =>{
      document.removeEventListener("mousedown" , handler)
    }
  } , [])



  return (
    <>
      <div className={`${cls.container} ${open? `${cls.active}` : `${cls.inactive}`}`}>
        <div className={cls.menu_container} ref={menuRef}>
          {/* <div className={cls.menu_trigger} onClick={() => {setOpen(!open)}}>
            <BiMenu className={cls.menuButton}/>
          </div> */}
          <div className={`${cls.dropdown_menu} ${open? `${cls.active}` : `${cls.inactive}`}`}>

            <div className={cls.logo_bix_btn_data}>
              <h3 className={cls.menuLogo}>
                Ваши подписки
              </h3>


                <BiX onClick={() => {setOpen(!open)}}/>
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

        <div className={cls.bacround}>
    
        </div>
      </div>
    </>
  )
}

export default Test