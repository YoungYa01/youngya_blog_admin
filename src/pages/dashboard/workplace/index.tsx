import React from 'react';
import { Carousel, Space } from '@arco-design/web-react';
import Overview from '@/pages/dashboard/workplace/overview';
import ContentPercentage from '@/pages/dashboard/workplace/content-percentage';
import styles from '@/pages/dashboard/workplace/style/index.module.less';
import Shortcuts from '@/pages/dashboard/workplace/shortcuts';
import Announcement from '@/pages/dashboard/workplace/announcement';


const Workplace = () => {

  return (
    <div style={{ width: '100%', display: 'flex', gap: 12 }}>
      <Space
        direction={'vertical'}
        style={{ width: '100%' }}
      >
        <Overview />
        <ContentPercentage />
      </Space>
      <Space direction={'vertical'}>
        <Shortcuts />
        <Announcement />
      </Space>
      {/*<Space size={24} align="start">*/}
      {/*  <Space size={24} direction="vertical">*/}
      {/*  </Space>*/}
      {/*  <Space className={styles.right} size={24} direction="vertical">*/}
      {/*    /!*<Docs />*!/*/}
      {/*  </Space>*/}
      {/*</Space>*/}
    </div>
  );
};

export default Workplace;
