import React, { useEffect, useState } from 'react';
import style from './index.module.less';
import { IconEmail, IconHome, IconQq } from '@arco-design/web-react/icon';
import { getAccessCountReq, getPraiseCountReq } from '@/api/public';
import { Card } from '@arco-design/web-react';
import { IconAccess } from '@/components/Icon';

const Footer = () => {

  const [praiseCount, setPraiseCount] = useState(0);
  const [accessCount, setAccessCount] = useState(0);

  const getCount = () => {
    getAccessCountReq()
      .then((res) => {
        setAccessCount(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getPraiseCountReq()
      .then((res) => {
        setPraiseCount(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCount();
  }, []);

  const NumCard = (props) => {
    const { title, icon } = props;
    return (
      <Card
        className={style.num_card}
        cover={icon}
      >
        <Card.Meta
          title={<span className={style.white_color}>{title}</span>}
          description={
            <span className={style.white_color}>
              {props.children}
            </span>
          }
        />
      </Card>
    );
  };

  return (
    <div className={style.footer}>
      <div className={style.count_container}>
        <NumCard
          title="点赞数"
          icon={
            <h1>❤️</h1>
          }
        >
        {praiseCount}
        </NumCard>
        <NumCard
          title={'访问数'}
          icon={<IconAccess size={30}/>}
        >
          {accessCount}
        </NumCard>
      </div>
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
