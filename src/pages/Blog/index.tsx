import React, { useEffect } from 'react';
import Layout from '@/pages/Blog/layout';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Articles from './pages/Articles';
import MagicBoard from './pages/MagicBoard';
import Previewer from './pages/Previewer';

const Blog = () => {
  useEffect(() => {
    document.title = 'Blog | YoungYa';
  }, []);
  return (
    <Layout>
      <Route path="/blog/" exact component={Home}></Route>
      <Route path="/blog/articles" exact component={Articles}></Route>
      <Route path="/blog/articles/preview" exact component={Previewer}></Route>
      <Route path="/blog/magic-board" exact component={MagicBoard}></Route>
    </Layout>
  );
};

export default Blog;
