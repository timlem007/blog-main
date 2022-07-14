import React from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { v4 as uuid } from 'uuid';

import { Avatar } from '../Avatar';
import { Tag } from '../Tag';
import { Like } from '../Like';

import classes from './Article.module.scss';

const Article = ({ title, author, date = '', tags, description, image, slug, favoritesCount, favorited }) => (
  <li className={classes.list}>
    <div className={classes.wrapper}>
      <Link className={classes.title} to={`/articles/${slug}`}>
        {title}
      </Link>

      <Like favorited={favorited} favoritesCount={favoritesCount} slug={slug} />
      <Avatar author={author} image={image} date={date} />
    </div>
    <div className={classes['tags-wrapper']}>
      {tags.map((element) => {
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
    <div className={classes.wrap}>
      <p className={classes.text}>{description}</p>
    </div>
  </li>
);

Article.defaultProps = {
  title: '',
  author: '',
  date: '',
  tags: [],
  description: '',
  image: '',
  slug: '',
  favoritesCount: 0,
  favorited: false,
};

Article.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  image: PropTypes.string,
  slug: PropTypes.string,
  favoritesCount: PropTypes.number,
  favorited: PropTypes.bool,
};

export default Article;
