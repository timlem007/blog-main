import { toLocalStorage } from '../../utils/toLocalStorage';
import { joinTags } from '../../utils/tagsFilter';
import { isImage } from '../../utils/isImage';

import {
  GET_ARTICLES,
  GET_FULL_ARTICLE,
  LOADING_ARTICLE,
  LOADING_ARTICLES,
  ACCOUNT_LOADING,
  ERROR,
  OTHER_ERRORS,
  TOKEN,
  AUTH,
  LOGOUT,
  LIKE,
  DELETE_POST,
  PROFILE_EDITED,
  CREATE_ARTICLE,
} from '../actions/actions';

export const getArticles =
  (page = 1, token = '') =>
  async (dispatch) => {
    dispatch({ type: LOADING_ARTICLES });
    try {
      const result = await fetch(`https://kata.academy:8021/api/articles?limit=5&offset=${(page - 1) * 5}`, {
        headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: token ? `Token ${token}` : null },
      });
      const json = await result.json();
      if (result.ok) {
        dispatch({ type: GET_ARTICLES, payload: { ...json, currentPage: page } });
      }
    } catch (error) {
      dispatch({ type: OTHER_ERRORS });
    }
  };

export const getFullArticle =
  (slug = '', token = '') =>
  async (dispatch) => {
    dispatch({ type: LOADING_ARTICLE });
    try {
      const result = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
        headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: token ? `Token ${token}` : null },
      });

      const json = await result.json();

      if (result.ok) {
        dispatch({ type: GET_FULL_ARTICLE, payload: { ...json } });
      }
    } catch (error) {
      dispatch({ type: OTHER_ERRORS });
    }
  };

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNT_LOADING });
    const result = await fetch(`https://kata.academy:8021/api/users`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }),
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });

    const json = await result.json();
    if (result.status === 422) {
      dispatch({ type: ERROR, payload: json.errors });
    }

    if (result.ok) {
      toLocalStorage(json);
      dispatch({ type: TOKEN, payload: json.user });
      dispatch({ type: AUTH, payload: json.user });
    }
  } catch (err) {
    dispatch({ type: OTHER_ERRORS });
  }
};

export const authorization = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNT_LOADING });
    const result = await fetch(`https://kata.academy:8021/api/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    });

    const json = await result.json();
    if (result.ok) {
      toLocalStorage(json);
      dispatch({ type: AUTH, payload: json.user });
    } else if (result.status === 422) {
      dispatch({ type: ERROR, payload: json.errors });
    }
  } catch (error) {
    dispatch({ type: OTHER_ERRORS });
  }
};

export const logOut = () => {
  localStorage.clear();
  return { type: LOGOUT };
};

export const like = (slug, liked) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  try {
    const result = await fetch(`https://kata.academy:8021/api/articles/${slug}/favorite`, {
      method: !liked ? 'POST' : 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: `Token ${token}` },
    });
    const json = await result.json();
    if (result.ok) {
      dispatch({ type: LIKE, payload: json });
    }
  } catch (errors) {
    dispatch({ type: OTHER_ERRORS });
  }
};

export const deletePost = (slug, token) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_ARTICLE });
    const result = await fetch(`https://kata.academy:8021/api/articles/${slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: token ? `Token ${token}` : null },
    });
    if (result.ok) {
      dispatch({ type: DELETE_POST });
    }
  } catch (error) {
    dispatch({ type: OTHER_ERRORS });
  }
};

export const editProfile = (username, email, password, image, token) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNT_LOADING });
    const imageChecked = await isImage(image);
    if (!imageChecked && image) {
      const error = new Error();
      error.code = 422;
      throw error;
    }
    const result = await fetch(`https://kata.academy:8021/api/user`, {
      method: 'PUT',
      body: JSON.stringify({
        user: {
          email,
          username,
          image: image || undefined,
          password: password || undefined,
        },
      }),
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: token ? `Token ${token}` : null },
    });

    const json = await result.json();
    if (result.ok) {
      toLocalStorage(json);
      dispatch({ type: AUTH, payload: json.user });
      dispatch({ type: PROFILE_EDITED, payload: json.user });
    } else if (result.status === 422) {
      console.log(json.errors);
      dispatch({ type: ERROR, payload: json.errors.body });
    }
  } catch (error) {
    if (error.code === 422) {
      dispatch({ type: ERROR, payload: { image: 'Input correct image URL' } });
    } else {
      dispatch({ type: OTHER_ERRORS });
    }
  }
};

export const createArticle = (title, description, body, tagList, token, edit, slug) => async (dispatch) => {
  try {
    dispatch({ type: ACCOUNT_LOADING });
    const result = await fetch(`https://kata.academy:8021/api/articles/${edit ? slug : ''}`, {
      method: edit ? 'PUT' : 'POST',
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList ? joinTags(tagList) : undefined,
        },
      }),
      headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: token ? `Token ${token}` : null },
    });

    const json = await result.json();
    if (result.ok) {
      dispatch({ type: CREATE_ARTICLE });
    }
    if (result.status === 422) {
      dispatch({ type: ERROR, payload: json.errors });
    }
  } catch (error) {
    dispatch({ type: OTHER_ERRORS });
  }
};
