import React from 'react';
import Layout from '@/pages/Blog/layout';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';

const Blog = (props) => {
  return (
    <Layout>
      <Route path="/blog/" exact component={Home}></Route>
      <Route path="/blog/articles" exact component={Articles}></Route>
    </Layout>
  );
};

export default Blog;
