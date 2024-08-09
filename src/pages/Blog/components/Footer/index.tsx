import { Divider } from '@arco-design/web-react';
import React from 'react';
import style from './index.module.less';
import { IconEmail, IconHome, IconQq } from '@arco-design/web-react/icon';

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.footer_content}>
        <div className={style.footer_content_left}>
          🕊️奔向远方
        </div>
        <div className={style.footer_content_right}>
          <div className={style.friend_chain}>
            <IconHome className={style.chain_icon} />
            <p>
              YoungYa.top
            </p>
          </div>
          <a
            href="tencent://message/?uin=1829594026&Site=&Menu=yes"
            target="_blank"
            rel="noreferrer"
          >
            <div className={style.friend_chain}>
              <IconQq className={style.chain_icon} />
              <p>
                1829594026
              </p>
            </div>
          </a>
          <a
            href="mailto:jhyoungy@163.com"
            rel="noreferrer"
          >
            <div className={style.friend_chain}>
              <IconEmail className={style.chain_icon} />
              <p>
                jhyoungy@163.com
              </p>
            </div>
          </a>
        </div>
      </div>
      <div className={style.footer_copyright}>
        <span style={{ color: '#fff' }}>
           Copyright © 2024 All Rights Reserved By YoungYa.
        </span>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: 'none', color: '#fff' }}
        >
          蜀ICP备2023021028号-1
        </a>
      </div>
    </div>
  );
};


export default Footer;
