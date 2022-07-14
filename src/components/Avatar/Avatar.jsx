import React from 'react';

import PropTypes from 'prop-types';

import { format } from 'date-fns';

import classes from './Avatar.module.scss';

const Avatar = ({ author = '', image, date }) => (
  <div className={classes.wrap}>
    <div className={classes.user}>
      <span className={classes.title}>{author}</span>
      {date && <span className={classes.date}>{format(new Date(date), 'PPP')}</span>}
    </div>
    <img src={image} alt="avatar" className={classes.image} />
  </div>
);

Avatar.propTypes = {
  author: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
};

Avatar.defaultProps = {
  author: '',
  image: '',
  date: '',
};

export default Avatar;
