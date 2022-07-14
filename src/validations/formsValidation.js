import * as yup from 'yup';

export const signInValidation = yup.object().shape({
  email: yup.string().email('Input correct e-mail address').required('Required field'),
  password: yup
    .string()
    .min(6, 'Your password must be 6-40 characters')
    .max(40, 'Your password must be 6-40 characters.')
    .required('Required field'),
});

export const signUpValidation = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be 3-20 characters')
    .max(20, 'Username must be 3-20 characters')
    .required('Required field'),
  email: yup.string().email('Input correct e-mail address').required('Required field'),
  password: yup
    .string()
    .min(6, 'Your password must be 6-40 characters')
    .max(40, 'Your password must be 6-40 characters')
    .required('Required field'),
  repeat: yup
    .string()
    .min(6, 'Your password must be 6-40 characters')
    .max(40, 'Your password must be 6-40 characters')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Required field'),
});

export const editableValidation = yup.object().shape({
  title: yup.string().required('Required field'),
  description: yup.string().required('Required field'),
  text: yup.string().required('Required field'),
});

export const editProfileValidation = yup.object().shape(
  {
    username: yup.string().min(3, 'Username must be 3-20 characters').max(20, 'Username must be 3-20 characters'),
    email: yup.string().email('Input correct e-mail address'),
    password: yup
      .string()
      .nullable()
      .notRequired()
      .when('password', {
        is: (value) => value?.length,
        then: (rule) =>
          rule.min(6, 'Your password must be 6-40 characters').max(40, 'Your password must be 6-40 characters'),
      }),
    image: yup
      .string()
      .nullable()
      .notRequired()
      .when('image', {
        is: (value) => value?.length,
        then: (rule) =>
          rule
            .url('Input correct image URL')
            .matches(/\.(jpg|jpeg|png|webp|bmp|avif|gif|svg)$/, 'Input correct image URL'),
      }),
  },
  [
    ['password', 'password'],
    ['image', 'image'],
  ]
);
