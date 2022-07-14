import React, { useEffect } from 'react';
import { Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuid } from 'uuid';

import { Article } from '../Article';

import { getArticles } from '../../redux/actionCreators/actionCreators';

import classes from './ArticleList.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();

  const { articles, loaded, articlesCount, currentPage } = useSelector(
    ({ articles, loaded, articlesCount, currentPage }) => ({
      articles,
      loaded,
      articlesCount,
      currentPage,
    })
  );

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  useEffect(() => {
    dispatch(getArticles(1, token));
  }, []);

  const result = loaded ? (
    articles.map((element) => (
      <Article
        key={uuid()}
        title={element.title}
        author={element.author.username}
        date={element.createdAt}
        tags={element.tagList}
        description={element.description}
        image={element.author.image}
        slug={element.slug}
        favoritesCount={element.favoritesCount}
        favorited={element.favorited}
      />
    ))
  ) : (
    <div className={classes.spinner}>
      <Spin size="large" />
    </div>
  );

  return (
    <>
      <ul>{result}</ul>
      <div className={classes.pag}>
        {loaded ? (
          <Pagination
            size="small"
            total={articlesCount}
            pageSize={5}
            onChange={(page) => dispatch(getArticles(page, token))}
            current={currentPage}
            showSizeChanger={false}
          />
        ) : null}
      </div>
    </>
  );
};

export default ArticleList;
