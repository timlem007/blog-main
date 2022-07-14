import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Spin } from 'antd';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { editProfileValidation } from '../../validations/formsValidation';
import { editProfile } from '../../redux/actionCreators/actionCreators';

import classes from './EditProfile.module.scss';

const EditProfile = () => {
  const { isAuth, token, profileEdited, accountLoaded, error } = useSelector(
    ({ isAuth, token, profileEdited, accountLoaded, error }) => ({
      isAuth,
      token,
      profileEdited,
      accountLoaded,
      error,
    })
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(editProfileValidation),
    defaultValues: {
      username: isAuth ? JSON.parse(localStorage.getItem('user')).username : '',
      email: isAuth ? JSON.parse(localStorage.getItem('user')).email : '',
      password: '',
      image: '',
    },
  });

  useEffect(() => {
    if (!isAuth) {
      navigate('/sign-in');
    }

    if (isAuth && profileEdited) {
      navigate('/articles');
    }

    if (error?.image) {
      setError('image', {
        type: 'server',
        message: 'Input correct image URL',
      });
    }
  }, [isAuth, profileEdited, error]);

  const onSubmit = (data) => {
    const { username, email, password, image } = data;
    dispatch(editProfile(username, email, password, image, token));
  };

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Edit Profile</h2>
      <div className={classes.spinner}>{!accountLoaded && <Spin size="small" className={classes.spin} />}</div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <label htmlFor="username" className={classes['form-item']}>
          <span className={classes['input-description']}>Username</span>

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                id="username"
                type="text"
                className={!errors.username ? classes.input : classes['input-error']}
                placeholder="Username"
                {...field}
              />
            )}
          />
          <div className={classes['form-error-wrapper']}>
            {errors.username && <span className={classes['form-error']}>{errors.username.message}</span>}
          </div>
        </label>
        <label className={classes['form-item']} htmlFor="email">
          <span className={classes['input-description']}>Email address</span>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                id="email"
                type="text"
                className={!errors.email ? classes.input : classes['input-error']}
                placeholder="Email address"
                {...field}
              />
            )}
          />
          <div className={classes['form-error-wrapper']}>
            {errors.email && <span className={classes['form-error']}>{errors.email.message}</span>}
          </div>
        </label>
        <label className={classes['form-item']} htmlFor="password">
          <span className={classes['input-description']}>New Password</span>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                id="password"
                type="text"
                className={!errors.password ? classes.input : classes['input-error']}
                placeholder="New Password"
                {...field}
              />
            )}
          />
          <div className={classes['form-error-wrapper']}>
            {errors.password && <span className={classes['form-error']}>{errors.password.message}</span>}
          </div>
        </label>

        <label className={classes['form-item']} htmlFor="image">
          <span className={classes['input-description']}>Avatar image (url)</span>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input
                id="image"
                type="text"
                className={!errors.image ? classes.input : classes['input-error']}
                placeholder="Avatar image"
                {...field}
              />
            )}
          />
          <div className={classes['form-error-wrapper']}>
            {errors.image && <span className={classes['form-error']}>{errors.image.message}</span>}
          </div>
        </label>

        <button type="submit" className={classes.button}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
