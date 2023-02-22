import cls from './Navbar.module.scss'
import {BiLogOut } from 'react-icons/bi'
import {AiOutlineInstagram , AiOutlineHeart} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import React, { useEffect, useState } from 'react'
import { NavbarList } from '../../utils/Navbar'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Search from '../Search'
import { GetUsers } from '../../config'


function Navbar() {
  const [active, setActive] = useState('home')
  const [search, setSearch] = useState(false)
  const accessToken = localStorage.getItem('accessToken')
  const navigate = useNavigate()
  const [users , setUsers] = useState(null)
  const [username, setUsername] = useState("");

  

  useEffect(() => {
    GetUsers(accessToken).then(r => {
      setUsers(r.data)
    })
  } , [accessToken])


  const debouncedSearchTerm = useDebounce(username, 400);

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
  
    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      },[value, delay]);
    return debouncedValue;
  }

  const SearchUsers = users && users.filter(item =>item.username.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ? item : null)
  

  const isMobile = useMediaQuery({
    query: "(max-width: 770px)"
  })




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
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className={cls.like_data}>
                <AiOutlineHeart />
              </div>
            </div>
            <ul 
              className={debouncedSearchTerm.length < 2 ? `${cls.active}` : `${cls.search_users_data}`}
            >
              {
                debouncedSearchTerm.length < 2 ? '' :
                SearchUsers.length < 2 ?


                SearchUsers && SearchUsers.map(item => {
                    return(
                      <li 
                        onClick={() => 
                          navigate(`/users/${item.id}` , setSearch(false))
                        }
                        key={item.id}
                      >
                        <p>{item.username}</p>
                      </li>
                    )
                }) : 
                
                SearchUsers && SearchUsers.map(item => {
                    return(
                      <li 
                        onClick={() => 
                          navigate(`/users/${item.id}` , setSearch(false))
                        }
                        key={item.id}
                      >
                        {
                          item.avatar === null ? 
                          <img className={cls.profile_image} src="https://bazametrov.ru/uploads/new-agency/default_logo_user.jpg" alt="" /> : 
                          <img className={cls.profile_image} src={item.avatar} alt="" />
                        }
                        <div>
                          <p>{item.username}</p>
                          <p>{item.bio}</p>
                        </div> 
                      </li>
                    )
                })
              }
            </ul>


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
