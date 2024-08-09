import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './index.module.less';
import { Button, Drawer } from '@arco-design/web-react';
import { IconClose, IconMenu } from '@arco-design/web-react/icon';

const Header = (props): JSX.Element => {
  const { setIsHome } = props;
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const items = [
    { name: 'Home', path: '/' },
    { name: 'Magic Board', path: '/magic-board' },
    { name: 'Article', path: '/articles' },
    { name: 'Login', path: '/login' }
  ];

  const handleItemClick = (path: string) => {
    setIsHome(path === '/');
    if (path === '/login') {
      history.push(`${path}`);
      return;
    }
    history.push(`/blog${path}`);
  };
  return (
    <div className={style['header-root']}>
      <div className={style['header']}>
        <div className={style['header-logo']}>
          &lt;YoungYa /&gt;
        </div>
        <Button
          icon={<IconMenu />}
          className={style['phone_btn']}
          onClick={() => setVisible(true)}
        ></Button>
        <div className={style['header-menu']}>
          {
            items.map((item, index) => (
              <div
                className={style['header-menu-item']}
                key={index}
                onClick={() => handleItemClick(item.path)}
              >
                {item.name}
              </div>
            ))
          }
        </div>

        <Drawer
          width={'50%'}
          title={null}
          footer={null}
          style={{
            backgroundColor: '#21262a',
            color: 'white'
          }}
          visible={visible}
          closeIcon={
            <IconClose
              style={{ color: 'white' }}
              onClick={() => setVisible(false)}
            />
          }
        >
          {
            items.map((item, index) => (
              <div
                style={{
                  padding: '10px 0',
                  cursor: 'pointer',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
                key={index}
                onClick={() => handleItemClick(item.path)}
              >
                {item.name}
              </div>
            ))
          }
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
