import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Spin } from 'antd';

import { Tags } from '../Tags';

import { editableValidation } from '../../validations/formsValidation';

import { createArticle } from '../../redux/actionCreators/actionCreators';

import classes from './CreateArticle.module.scss';

const CreateArticle = () => {
  const { isAuth, token, error, fullArticle, accountLoaded } = useSelector(
    ({ isAuth, token, error, fullArticle, accountLoaded }) => ({
      isAuth,
      token,
      error,
      fullArticle,
      accountLoaded,
    })
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug, edit } = useParams();

  const {
    handleSubmit,
    control,
    // reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(editableValidation),
    defaultValues: {
      tagList: !edit
        ? [
            {
              name: '',
            },
          ]
        : fullArticle.tagList?.map((tag) => ({ name: tag })),
      title: edit ? fullArticle.title : '',
      description: edit ? fullArticle.description : '',
      text: edit ? fullArticle.body : '',
    },
  });

  useEffect(() => {
    if (!isAuth) {
      navigate('/sign-in');
    }
    if (isAuth && !error && isSubmitSuccessful) {
      navigate('/articles');
    }

    if (slug !== fullArticle.slug && edit) {
      navigate('/articles');
    }
  }, [isAuth, error, isSubmitSuccessful]);

  const onSubmit = (data) => {
    dispatch(createArticle(data.title, data.description, data.text, data.tagList, token, edit, fullArticle.slug));
  };

  return (
    <div className={classes.wrapper}>
      <h5 className={classes.title}>{edit ? 'Edit Article' : 'Create new Article'}</h5>
      <div className={classes.spinner}>{!accountLoaded && <Spin size="small" className={classes.spin} />}</div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <label htmlFor="title" className={classes['form-item']}>
          <span className={classes['input-title']}>Title</span>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                id="title"
                type="text"
                className={!errors.title ? classes.input : classes['input-error']}
                placeholder="Title"
                {...field}
                autoFocus
              />
            )}
          />
          <div className={classes['form-error-wrapper']}>
            {errors.title && <span className={classes['form-error']}>{errors.title.message}</span>}
          </div>
        </label>
        <label htmlFor="description" className={classes['form-item']}>
          <span className={classes['input-title']}>Short description</span>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input
                id="description"
                type="text"
                className={!errors.description ? classes.input : classes['input-error']}
                placeholder="Title"
                {...field}
              />
            )}
          />
          <div className={classes['form-error-wrapper']}>
            {errors.description && <span className={classes['form-error']}>{errors.description.message}</span>}
          </div>
        </label>
        <label htmlFor="text" className={classes['form-item']}>
          <span className={classes['input-title']}>Text</span>
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <textarea
                id="text"
                type="text"
                className={!errors.title ? classes['text-input'] : classes['text-input-error']}
                placeholder="Text"
                {...field}
              />
            )}
          />
          <div className={classes['form-error-wrapper']}>
            {errors.text && <span className={classes['form-error']}>{errors.text.message}</span>}
          </div>
        </label>
        <div className={classes['tags-wrapper']}>
          <Tags control={control} />
        </div>
        <button type="submit" className={classes['submit-button']}>
          Send
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
