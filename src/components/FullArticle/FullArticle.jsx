import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import gfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

import { Popconfirm, Button, Spin } from 'antd';

import { Avatar } from '../Avatar';
import { Tag } from '../Tag';
import { Like } from '../Like';

import { deletePost, getFullArticle } from '../../redux/actionCreators/actionCreators';

import classes from './FullArticle.module.scss';

const ArticleFull = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { fullArticle, isAuth, token, isDeleteItem } = useSelector(({ fullArticle, isAuth, token, isDeleteItem }) => ({
    fullArticle,
    isAuth,
    token,
    isDeleteItem,
  }));

  useEffect(() => {
    if (isAuth && !isDeleteItem) {
      dispatch(getFullArticle(slug, token));
    } else if (!isAuth && !isDeleteItem) {
      dispatch(getFullArticle(slug));
    }
    if (isDeleteItem) {
      navigate('/articles');
    }
  }, [slug, isAuth, isDeleteItem]);

  const confirmDelete = () => {
    dispatch(deletePost(slug, token));
  };

  return !fullArticle.articleLoaded ? (
    <div className={classes.list}>
      <div className={classes.wrapper}>
        <h5 className={classes.title}>{fullArticle.title}</h5>
        <Like favorited={fullArticle.favorited} slug={fullArticle.slug} favoritesCount={fullArticle.favoritesCount} />
        <Avatar author={fullArticle.author.username} image={fullArticle.author.image} date={fullArticle.createdAt} />
      </div>
      <div className={classes['tags-wrapper']}>
        {fullArticle.tagList &&
          fullArticle.tagList.map((element) => {
            if (element.trim()) {
              return (
                <Tag key={uuid()} className={classes.tags}>
                  {element}
                </Tag>
              );
            }
            return null;
          })}
      </div>

      <div className={classes.container}>
        <p className={classes.descr}>{fullArticle.description}</p>
        {isAuth && fullArticle.author.username === JSON.parse(localStorage.getItem('user')).username && (
          <>
            <Popconfirm
              placement="rightTop"
              title="Are you sure to delete this task?"
              onConfirm={confirmDelete}
              okText="Yes"
              cancelText="No"
              className={classes['button-delete-notification']}
            >
              <Button className={classes['button-delete']} danger>
                Delete
              </Button>
            </Popconfirm>
            <Link to={`/articles/${slug}/edit`}>
              <Button className={classes['button-edit']}>Edit</Button>
            </Link>
          </>
        )}
      </div>
      <div className={classes.info}>
        <ReactMarkdown className={classes.text} remarkPlugins={[gfm]}>
          {fullArticle.body}
        </ReactMarkdown>
      </div>
    </div>
  ) : (
    <div className={classes.spinner}>
      <Spin size="large" />
    </div>
  );
};

export default ArticleFull;
