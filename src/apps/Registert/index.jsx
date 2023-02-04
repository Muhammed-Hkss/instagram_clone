import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { signUp, Token } from '../../config'
import FormButton from '../../hooks/FormButton'
import cls from './Register.module.scss'

const Register = () => {
  const navigate = useNavigate()
  const [ file, setFile ] = React.useState(null)




  const {
    register,
    handleSubmit,
		formState: { isValid },
  } = useForm({
    mode:'onChange'
  })

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('username', data.username);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('bio', data.bio);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_repeat', data.password_repeat);

    signUp(formData)
			.then(r => {
        localStorage.setItem('user', JSON.stringify(r.data));
        Token({ username: data.username, password: data.password }).then((r) => {
          if (r) {
            localStorage.setItem('accessToken', r.data.access);
            localStorage.setItem('refreshToken', r.data.refresh);
            navigate('/');
          }
        });
       
			}
		)
  };


  return (
    <div className={cls.container}>
      <div className={cls.row}>

        <form 
          onSubmit={handleSubmit(onSubmit)}
          className={cls.register_form}
        >

          <h1 className={cls.register_form_logo}>
            instagram
          </h1>
          <p className={cls.register_form_logo}>Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.</p>
          <div>
            <p >
              Люди, которые пользуются нашим сервисом, могли загрузить вашу контактную информацию в Instagram. <Link to={'/detailed'}>Подробнее</Link>
            </p>
            <p >
              Регистрируясь, вы принимаете наши <Link>Условия</Link> , <Link>Политику конфиденциальности</Link> и <Link>Политику в отношении файлов cookie</Link> . 
            </p>
          </div>
          <div className={cls.register_input_data}>

            <input
              type="file"
              onChange={e => setFile(e.target.files[0])}
            />
            <input 
              type="text"
              placeholder='username'
              {...register("username")}
            />
            <input 
              type="text"
              placeholder='first_name'
              {...register("first_name")}
            />
            <input 
              type="text"
              placeholder='last_name'
              {...register("last_name")}
            />
            <input 
              type="text"
              placeholder='bio'
              {...register("bio")}
            />
            <input 
              type="email"
              placeholder='email'
              {...register("email")}
            />
            <input 
              type="password"
              placeholder='password'
              {...register("password")}
            />
            <input 
              type="password"
              placeholder='password_repeat'
              {...register("password_repeat")}
            />

          <FormButton isValid={isValid} buttonText='Войти'/>
        </div>

        </form>
        <div className={cls.register_route_data}>
          <Link to='/auth/login'>Есть аккаунт? Вход</Link>
        </div>

        {/* style={{color:'gray' , textAlign:'center'}}  */}
        <p  className={cls.dowlooad_text}>Установите приложение.</p>

        <div className={cls.dowlooad_image_data}>
          <img
            onClick={() => navigate('https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DsignupPage%26ig_mid%3DF49C67A6-67C4-4036-A5B4-DA567FCF4972%26utm_content%3Dlo%26utm_medium%3Dbadge')} 
            className={cls.dowlooad_image} 
            src="https://static.cdninstagram.com/rsrc.php/v3/yr/r/fDjwyLC88oO.png" alt="" 
          />
          <img 
            onClick={() => navigate('ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1920%2C1040')} 
            className={cls.dowlooad_image} 
            src="https://static.cdninstagram.com/rsrc.php/v3/yv/r/_UbeIRgTpG-.png" alt="" 
          />
        </div>

      </div>
    </div>
  )
}

export default Register
