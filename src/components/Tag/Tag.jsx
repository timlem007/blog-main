import React from 'react';
import PropTypes from 'prop-types';

import classes from './Tag.module.scss';

const Tag = ({ children }) => <span className={classes.tag}>{children}</span>;

Tag.defaultProps = {
  children: '',
};

Tag.propTypes = {
  children: PropTypes.string,
};

export default Tag;
