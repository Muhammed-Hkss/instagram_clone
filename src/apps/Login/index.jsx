import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Token } from '../../config'
import FormButton from '../../hooks/FormButton'
import FormInput from '../../hooks/FormInput'
import cls from './Login.module.scss'
const Login = () => {
  const navigate = useNavigate()
  

  const {
    register,
    handleSubmit,
		formState: { errors, isValid },
  } = useForm({
    mode:'onChange'
  })


  const onSubmit = (data) => {
    if(data){
      Token(data).then(r => {
        if(r.data){
          localStorage.setItem('accessToken', r.data.access);
          localStorage.setItem('refreshToken', r.data.refresh);
          navigate('/');
        }
      }).catch((e) => window.alert(e));
    }
  }

  return (
    <div className={cls.container}>
      <div className={cls.row}>
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className={cls.login_form}
        >
          <h1 className={cls.login_form_logo}>
            instagram
          </h1>
          <div>
            <FormInput
              inputType='text'
              placeholder='Ваш username'
              registerName='username'
              register={register}
              errors={errors.username?.message}
            />
            <FormInput
              inputType='password'
              placeholder='Введите пароль'
              registerName='password'
              register={register}
              errors={errors.password?.message}
            />
          </div>

          <FormButton isValid={isValid} buttonText='Войти'/>
        </form>

        <div className={cls.login_route_data}>
          <Link to='/user/register'>У вас ещё нет аккаунта? Зарегистрироваться</Link> 
        </div>

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

export default Login