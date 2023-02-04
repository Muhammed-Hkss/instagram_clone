import cls from './Navbar.module.scss'
import {BiLogOut } from 'react-icons/bi'
import {AiOutlineInstagram , AiOutlineHeart} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import React, { useRef, useState } from 'react'
import { NavbarList } from '../../utils/Navbar'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Search from '../Search'
// import Notif from '../Notifications'


function Navbar() {
  const [active, setActive] = useState('home')
  const [search, setSearch] = useState(false)
  // const [notif, setNotif] = useState(false)
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // const onClickClear = () => {
  //   setValue('')
  //   inputRef.current?.focus()
  // }

  const isMobile = useMediaQuery({
    query: "(max-width: 770px)"
  })

  // const isTablet = useMediaQuery({
  //   query: "(max-width: 1265px)"
  // }) 



  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };




    return (
      <>

        <div className={cls.container}>

          <div className={cls.mobile_sidebare}>

            <div 
              className={cls.mobile_logo_data}
              onClick={() => {
                navigate('/');
                setActive('home');
              }}
            >
              <AiOutlineInstagram/>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
                alt="instagram"
              />
            </div>


            <div className={cls.search_block}>
              <div className={cls.search}>
                  <BsSearch />
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setValue(e.target.value)}
                    ref={inputRef}
                    value={value}
                  />
              </div>
              <div className={cls.like_data}>
                <AiOutlineHeart />
              </div>
            </div>


          </div>


          <div 
            className={`${cls.sidebare} ${search ? cls.active : ''}`}
          >
            <div 
              className={cls.logo_data}
              onClick={() => {
                navigate('/');
                setActive('home');
              }}
            >
              <AiOutlineInstagram/>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png"
                alt="instagram"
              />
            </div>



            <ul className={cls.nav_list}>
              {
                NavbarList.map((item) => {  
                  return( 
                    <li key={item.id}>
                      <a 
                          onClick={() => {
                            setSearch(item.setSearch)
                            // setNotif(false)
                            setActive(item.setActive)
                          }}
                          href={item.path}
                          className={active === item.setActive ? `${cls.active}` : `${cls.active2}`}
                        >
                            {active === item.setActive ? <i>{item.active}</i> : <i>{item.logo}</i>}

                          <span className={cls.links_name}>{item.title}</span>
                      </a>
                      <span className={cls.tooltip}>{item.span}</span>
                    </li>
                  )
                })
              }
            </ul>



            <div className={cls.menu_data}>
              
              <div
                className={cls.menu} 
                onClick={logOut}
              >
                  <BiLogOut className={cls.menu_btn} />
                  <p 
                    className={cls.menu_text}
                  >
                    Log out
                  </p>
              </div>
            </div>
          </div>
          
          {
            search && !isMobile && <Search setSearch={setSearch}/>
          }
          
        </div>
      </>
    );
}

export default Navbar;
