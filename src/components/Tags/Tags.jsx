import React from 'react';
import PropTypes from 'prop-types';

import { useFieldArray, Controller } from 'react-hook-form';

import classes from './Tags.module.scss';

const Tags = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  return (
    <ul>
      <span className={classes['input-title']}>Tags:</span>
      {fields.map((item, index) => (
        <li key={item.id} className={classes.tag}>
          <Controller
            name={`tagList.${index}.name`}
            control={control}
            defaultValue={item.name}
            render={({ field }) => <input className={classes.input} {...field} placeholder="Tag" type="text" />}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className={fields.length > 1 ? classes['delete-button'] : classes['delete-button-disabled']}
            disabled={fields.length === 1}
          >
            Delete
          </button>
          {index === fields.length - 1 && (
            <button type="button" className={classes['add-button']} onClick={() => append({ name: '' })}>
              Add tag
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

Tags.defaultProps = {
  control: {},
};

Tags.propTypes = {
  control: PropTypes.objectOf(PropTypes.any),
};

export default Tags;
