import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Button } from 'antd';

import { logOut } from '../../../redux/actionCreators/actionCreators';

import classes from '../Header.module.scss';

const NotAuthButtons = () => {
  const dispatch = useDispatch();

  const { username, logo } = useSelector(({ username, logo }) => ({ username, logo }));

  const onClick = () => {
    dispatch(logOut());
  };

  const img = logo || 'https://static.productionready.io/images/smiley-cyrus.jpg';

  return (
    <div className={classes.buttons}>
      <Link to="/new-article">
        <Button size="large" type="text" className={classes['create-article']}>
          Create article
        </Button>
      </Link>
      <Link to="/profile">
        <div className={classes.profile}>
          <span className={classes['profile-name']}>{username}</span>
          <img src={img} alt="logo" className={classes['profile-image']} />
        </div>
      </Link>
      <Button size="large" type="text" className={classes['log-out']} onClick={onClick}>
        <span>Log Out</span>
      </Button>
    </div>
  );
};

export default NotAuthButtons;
