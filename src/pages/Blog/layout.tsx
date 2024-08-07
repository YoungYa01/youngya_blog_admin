import React from 'react';
import style from './style/layout.module.less';
import Header from './components/Header';
import { Divider } from '@arco-design/web-react';

const Layout = (props) => {
  const Footer = () => {
    return (
      <Divider orientation={'center'}>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: '#000' }}
        >
          蜀ICP备2023021028号-1
        </a>
      </Divider>
    );
  };

  return (
    <div>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
