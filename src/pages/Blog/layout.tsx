import React, { useEffect, useState } from 'react';
import style from './style/layout.module.less';
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = (props) => {

  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
      setIsHome(location.pathname === '/blog/');
    }, []
  );

  return (
    <div>
      <Header setIsHome={setIsHome}></Header>
      {props.children}
      {
        isHome && <Footer></Footer>
      }
    </div>
  );
};

export default Layout;
