import React from 'react';
import style from './style/layout.module.less';
import Header from './components/Header';
import Footer from './components/Footer';
const Layout = (props) => {


  return (
    <div>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
