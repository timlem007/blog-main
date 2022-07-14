import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';

import classes from '../Header.module.scss';

const AuthButtons = () => (
  <div className={classes.buttons}>
    <Link to="sign-in">
      <Button size="large" type="text" className={classes['sign-in']}>
        Sign In
      </Button>
    </Link>
    <Link to="sign-up">
      <Button size="large" type="text" className={classes['sign-up']}>
        Sign Up
      </Button>
    </Link>
  </div>
);

export default AuthButtons;
