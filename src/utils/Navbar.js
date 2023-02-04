import {RiCompass3Line , RiCompass3Fill , RiSearch2Line , RiSearch2Fill , RiAccountCircleLine , RiAccountCircleFill} from 'react-icons/ri'
import { AiOutlineHome , AiTwotoneHome } from 'react-icons/ai'
import {BsPlusSquareFill , BsPlusSquare} from 'react-icons/bs'






export const NavbarList = [
  {
    id: 1,
    logo:<AiOutlineHome />,
    active:<AiTwotoneHome /> ,
    setSearch: false ,
    setActive:'home',
    title:'Главная',
    path:'/'
  },
  {
    id: 2,
    logo:<RiSearch2Line />,
    active: <RiSearch2Fill /> ,
    setSearch: true ,
    setActive:'search',
    title:'Поисковый запрос',
  },
  {
    id: 3,
    logo:<RiCompass3Line />,
    active:<RiCompass3Fill /> ,
    setSearch: false ,
    setActive:'interesting',
    title:'Интересное',
  },
  {
    id: 4,
    logo:<BsPlusSquare />,
    active:<BsPlusSquareFill /> ,
    setSearch: false ,
    setActive:'ToCreate',
    title:'Создать',
    path:'/ToCreate'
  },
  {
    id: 5,
    logo:<RiAccountCircleLine />,
    active:<RiAccountCircleFill/> ,
    setSearch: false ,
    setActive:'account',
    title:'Профиль',
    path:'/account'
  },
]
