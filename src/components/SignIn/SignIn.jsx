import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Spin } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import classes from './SignIn.module.scss';
import { signInValidation } from '../../validations/formsValidation';
import { authorization } from '../../redux/actionCreators/actionCreators';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuth, accountLoaded } = useSelector(({ error, isAuth, accountLoaded }) => ({
    error,
    isAuth,
    accountLoaded,
  }));

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!error && isAuth) {
      navigate('/articles');
    }

    if (error?.['email or password']) {
      setError('email', {
        type: 'server',
        message: '',
      });
      setError('password', {
        type: 'server',
        message: '',
      });
    }
  }, [error, isAuth]);

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(authorization(email, password));
  };

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Sign In</h2>
      <div className={classes['server-error-wrapper']}>
        {errors && errors.email && errors.email.type === 'server' && (
          <div className={classes['server-error']}>Email or Password is invalid</div>
        )}
      </div>
      <div className={classes.spinner}>{!accountLoaded && <Spin size="small" className={classes.spin} />}</div>

      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <label htmlFor="email" className={classes['form-item']}>
          <span className={classes['input-description']}>Email address</span>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                id="username"
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

        <label htmlFor="password" className={classes['form-item']}>
          <span className={classes['input-description']}>Password</span>

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                id="password"
                type="password"
                className={!errors.password ? classes.input : classes['input-error']}
                placeholder="Password"
                {...field}
              />
            )}
          />
          <div className={classes['form-error-wrapper']}>
            {errors.password && <span className={classes['form-error']}>{errors.password.message}</span>}
          </div>
        </label>

        <button type="submit" className={classes.button}>
          Login
        </button>
      </form>
      <div className={classes.footer}>
        Do not have an account?<Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
