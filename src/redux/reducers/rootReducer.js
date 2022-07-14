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
  DELETE_POST,
  PROFILE_EDITED,
  CREATE_ARTICLE,
} from '../actions/actions';

const initialState = {
  articles: [],
  articlesCount: null,
  loaded: false,
  accountLoaded: true,
  currentPage: 1,
  fullArticle: {
    author: {},
    articleLoaded: false,
  },
  error: null,
  otherErrors: false,
  token: '',
  username: '',
  logo: '',
  isAuth: false,
  isDeleteItem: false,
  profileEdited: false,
};

if (localStorage.getItem('user')) {
  initialState.isAuth = true;
  initialState.token = JSON.parse(localStorage.getItem('user')).token;
  initialState.username = JSON.parse(localStorage.getItem('user')).username;
  initialState.logo = JSON.parse(localStorage.getItem('user')).image;
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.payload.currentPage,
        loaded: true,
        error: null,
        isDeleteItem: false,
        profileEdited: false,
      };

    case GET_FULL_ARTICLE:
      return {
        ...state,
        isDeleteItem: false,
        fullArticle: { ...action.payload.article, articleLoaded: false },
      };

    case LOADING_ARTICLE:
      return {
        ...state,
        fullArticle: { ...state.fullArticle, articleLoaded: true },
      };

    case LOADING_ARTICLES:
      return {
        ...state,
        loaded: false,
      };

    case ACCOUNT_LOADING:
      return {
        ...state,
        accountLoaded: false,
      };

    case ERROR:
      return {
        ...state,
        error: action.payload,
        accountLoaded: true,
      };

    case OTHER_ERRORS:
      return {
        ...state,
        otherErrors: true,
        loading: true,
      };

    case TOKEN:
      return {
        ...state,
        error: null,
        token: action.payload,
        isAuth: true,
      };

    case AUTH:
      return {
        ...state,
        isAuth: true,
        error: null,
        token: action.payload.token,
        username: action.payload.username,
        logo: action.payload.image,
        accountLoaded: true,
      };

    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        token: '',
        accountLoaded: true,
      };

    case DELETE_POST:
      return {
        ...state,
        isDeleteItem: true,
      };

    case PROFILE_EDITED:
      return {
        ...state,
        profileEdited: true,
        accountLoaded: true,
        username: action.payload.username,
        logo: action.payload.image,
      };

    case CREATE_ARTICLE:
      return {
        ...state,
        accountLoaded: true,
        error: null,
      };

    default:
      return state;
  }
};
