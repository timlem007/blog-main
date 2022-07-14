import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { like } from '../../redux/actionCreators/actionCreators';

import classes from './Like.module.scss';

const Like = ({ favorited, slug, favoritesCount }) => {
  const dispatch = useDispatch();

  const isAuth = useSelector(({ isAuth }) => isAuth);

  const [liked, setLiked] = useState(favorited);
  const [likeCount, setLikeCount] = useState(favoritesCount);

  useEffect(() => {
    setLiked(favorited);
    setLikeCount(favoritesCount);
  }, [favoritesCount, favorited]);

  const onChange = () => {
    dispatch(like(slug, liked));
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  };

  return (
    <label className={classes.label}>
      <input
        className={classes.checkbox}
        type="checkbox"
        name="heart"
        disabled={!isAuth}
        checked={liked && isAuth}
        onChange={onChange}
      />
      <span className={classes.heart} />
      <span>{likeCount}</span>
    </label>
  );
};

Like.defaultProps = {
  favorited: false,
  slug: '',
  favoritesCount: 0,
};

Like.propTypes = {
  favorited: PropTypes.bool,
  slug: PropTypes.string,
  favoritesCount: PropTypes.number,
};

export default Like;
