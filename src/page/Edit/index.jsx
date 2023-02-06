import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GetUser, putUser } from '../../config';
import cls from './Edit.module.scss';

const Edit = () => {
  const {
    register,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });


  
  const accessToken = localStorage.getItem('accessToken');
  const [passValue, setPassValue] = useState('');
  const [repValue, setRepValue] = useState('');
  const navigate = useNavigate();
  const [users , setUsers] = useState('')
  

  useEffect(() => {
    GetUser(accessToken).then(r => {
      setUsers(r.data)
    })
  } , [accessToken , users.id])


  const onSubmit = (data) => {
    putUser(users.id, data, accessToken).then((r) => {
      localStorage.setItem('user', JSON.stringify(r.data));
      navigate('/profile');
    });
  };

  return (
    <div className={cls.edit}>
      <div className={cls.edit_container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cls.form_block}>
            <div>
              <img
                src={
                  users?.avatarka
                    ? ''
                    : 'https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg'
                }
                alt=""
              />
            </div>
            <div className={cls.d_flex}>
              <h2>{users?.username}</h2>
              <input type="file" placeholder="Change profile photo" />
            </div>
          </div>
          <div className={cls.form_body}></div>
          <div>
            <input
              type="text"
              placeholder="Email"
              {...register('email', {
                required: 'Required field!',
              })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="First name"
              {...register('first_name', {
                required: 'Required field!',
              })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last name"
              {...register('last_name', {
                required: 'Required field!',
              })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              {...register('username', {
                required: 'Required field!',
              })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              {...register('phone_number', {
                required: 'Required field!',
              })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="About"
              {...register('bio', {
                required: 'Required field!',
              })}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={passValue}
              onInput={(e) => setPassValue(e.target.value)}
              {...register('password', {
                required: 'Required field!',
              })}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password Repeat"
              value={repValue}
              onInput={(e) => setRepValue(e.target.value)}
              {...register('password_repeat', {
                required: 'Required field!',
              })}
            />
          </div>
          <div className={cls.btn_data}>
            <button
              type="submit"
              className={cls.btn}>
              Changed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
