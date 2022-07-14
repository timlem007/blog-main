import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Checkbox, Spin } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { signUpValidation } from '../../validations/formsValidation';

import { register } from '../../redux/actionCreators/actionCreators';

import classes from './SignUp.module.scss';

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signUpValidation),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeat: '',
    },
  });

  const { error, isAuth, accountLoaded } = useSelector(({ error, isAuth, accountLoaded }) => ({
    error,
    isAuth,
    accountLoaded,
  }));

  useEffect(() => {
    if (isAuth && !error) {
      navigate('/articles');
    }

    if (error?.username) {
      setError('username', {
        type: 'server',
        message: 'This username is already taken',
      });
    }
    if (error?.email) {
      setError('email', {
        type: 'server',
        message: 'This email is already taken',
      });
    }
  }, [isAuth, error]);

  const onSubmit = (data) => {
    dispatch(register(data));
  };

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Create new account</h2>
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
        <label htmlFor="email" className={classes['form-item']}>
          <span className={classes['input-description']}>Email address</span>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                id="email"
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
        <label htmlFor="repeat" className={classes['form-item']}>
          <span className={classes['input-description']}>Repeat Password</span>
          <Controller
            name="repeat"
            control={control}
            render={({ field }) => (
              <input
                id="repeat"
                type="password"
                className={!errors.repeat ? classes.input : classes['input-error']}
                placeholder="Repeat Password"
                {...field}
              />
            )}
          />
          <div className={classes['form-error-wrapper']}>
            {errors.repeat && <span className={classes['form-error']}>{errors.repeat.message}</span>}
          </div>
        </label>
        <span className={classes.divider} />
        <label htmlFor="checkbox">
          <Controller
            name="checkbox"
            control={control}
            defaultValue
            render={() => (
              <Checkbox id="checkbox" className={classes.checkbox} checked>
                <span>I agree to the processing of my personal information</span>
              </Checkbox>
            )}
          />
        </label>
        <button type="submit" className={classes.button}>
          Create
        </button>
      </form>
      <div className={classes.footer}>
        Already have an account?<Link to="/sign-in">Sign In</Link>
      </div>
    </div>
  );
};

export default CreateAccount;
