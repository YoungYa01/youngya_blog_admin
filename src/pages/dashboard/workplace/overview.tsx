import React, { useState, useEffect, ReactNode } from 'react';
import {
  Grid,
  Card,
  Typography,
  Divider,
  Skeleton,
  Link,
} from '@arco-design/web-react';
import { useSelector } from 'react-redux';
import { IconCaretUp } from '@arco-design/web-react/icon';
import OverviewAreaLine from '@/components/Chart/overview-area-line';
import axios from 'axios';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import styles from './style/overview.module.less';
import IconCalendar from './assets/calendar.svg';
import IconComments from './assets/comments.svg';
import IconContent from './assets/content.svg';
import IconIncrease from './assets/increase.svg';

const { Row, Col } = Grid;

type StatisticItemType = {
  icon?: ReactNode;
  title?: ReactNode;
  count?: ReactNode;
  loading?: boolean;
  unit?: ReactNode;
};

function StatisticItem(props: StatisticItemType) {
  const { icon, title, count, loading, unit } = props;
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <Skeleton loading={loading} text={{ rows: 2, width: 60 }} animation>
          <div className={styles.title}>{title}</div>
          <div className={styles.count}>
            {count}
            <span className={styles.unit}>{unit}</span>
          </div>
        </Skeleton>
      </div>
    </div>
  );
}

type DataType = {
  allContents?: string;
  liveContents?: string;
  increaseComments?: string;
  growthRate?: string;
  chartData?: { count?: number; date?: string }[];
  down?: boolean;
};

function Overview() {
  const [data, setData] = useState<DataType>({});
  const [loading, setLoading] = useState(false);
  const t = useLocale(locale);

  const userInfo = useSelector((state: any) => state.userInfo || {});


  return (
    <Card>
      <Typography.Title heading={5}>
        {t['workplace.welcomeBack']}
        {userInfo.name}
      </Typography.Title>
      <Divider />
      <Row>
        <Col flex={1}>
          <StatisticItem
            icon={<IconCalendar />}
            title={t['workplace.totalOnlyData']}
            count={99}
            loading={loading}
            unit={t['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconContent />}
            title={t['workplace.contentInMarket']}
            count={66}
            loading={loading}
            unit={t['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconComments />}
            title={t['workplace.comments']}
            count={996}
            loading={loading}
            unit={t['workplace.pecs']}
          />
        </Col>
        <Divider type="vertical" className={styles.divider} />
        <Col flex={1}>
          <StatisticItem
            icon={<IconIncrease />}
            title={t['workplace.growth']}
            count={
              <span>
                {21}{' '}
                <IconCaretUp
                  style={{ fontSize: 18, color: 'rgb(var(--green-6))' }}
                />
              </span>
            }
            loading={loading}
          />
        </Col>
      </Row>
      <Divider />
      {/*<div>*/}
      {/*  <div className={styles.ctw}>*/}
      {/*    <Typography.Paragraph*/}
      {/*      className={styles['chart-title']}*/}
      {/*      style={{ marginBottom: 0 }}*/}
      {/*    >*/}
      {/*      {t['workplace.contentData']}*/}
      {/*      <span className={styles['chart-sub-title']}>*/}
      {/*        ({t['workplace.1year']})*/}
      {/*      </span>*/}
      {/*    </Typography.Paragraph>*/}
      {/*    <Link>{t['workplace.seeMore']}</Link>*/}
      {/*  </div>*/}
      {/*  <OverviewAreaLine data={data.chartData} loading={loading} />*/}
      {/*</div>*/}
    </Card>
  );
}

export default Overview;
