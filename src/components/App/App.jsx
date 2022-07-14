import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Alert } from 'antd';

import { Header } from '../Header';

import { ArticleList } from '../ArticleList';
import { FullArticle } from '../FullArticle';
import { SignUp } from '../SignUp';
import { SignIn } from '../SignIn';
import { EditProfile } from '../EditProfile';
import { CreateArticle } from '../CreateArticle';

import 'antd/dist/antd.css';
import classes from './App.module.scss';

const App = () => {
  const otherErrors = useSelector(({ otherErrors }) => otherErrors);

  return (
    <>
      <Header />
      {!otherErrors ? (
        <Routes>
          <Route index path="/" element={<ArticleList />} />
          <Route index path="/articles" element={<ArticleList />} />
          <Route path="/articles/:slug" element={<FullArticle />} />
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/articles/:slug/:edit" element={<CreateArticle />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<EditProfile />} />
        </Routes>
      ) : (
        <div className={classes['alert-wrapper']}>
          <Alert
            className={classes.alert}
            message="Ooops!"
            description="Something went wrong. Try to reload Page."
            type="error"
            showIcon
          />
        </div>
      )}
    </>
  );
};
export default App;
