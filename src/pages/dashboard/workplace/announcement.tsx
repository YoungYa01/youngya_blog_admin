import React, { useState, useEffect } from 'react';
import { Link, Card, Skeleton, Tag, Typography } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/announcement.module.less';

const announcement = [
  {
    key: '1',
    type: 'activity',
    content: '【活动】2021 年度前端技术大会'
  },
  {
    key: '2',
    type: 'info',
    content: '【通知】关于 2021 年度前端技术大会通知'
  },
  {
    key: '3',
    type: 'notice',
    content: '【公告】关于 2021 年度前端技术大会公告'
  }
];

function Announcement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const t = useLocale(locale);

  const fetchData = () => {
    setData(announcement);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function getTagColor(type) {
    switch (type) {
      case 'activity':
        return 'orangered';
      case 'info':
        return 'cyan';
      case 'notice':
        return 'arcoblue';
      default:
        return 'arcoblue';
    }
  }

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography.Title heading={6}>
          {t['workplace.announcement']}
        </Typography.Title>
        <Link>{t['workplace.seeMore']}</Link>
      </div>
      <Skeleton loading={loading} text={{ rows: 5, width: '100%' }} animation>
        <div>
          {data.map((d) => (
            <div key={d.key} className={styles.item}>
              <Tag color={getTagColor(d.type)} size="small">
                {t[`workplace.${d.type}`]}
              </Tag>
              <span className={styles.link}>{d.content}</span>
            </div>
          ))}
        </div>
      </Skeleton>
    </Card>
  );
}

export default Announcement;
