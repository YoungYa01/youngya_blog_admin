import React, { useState, useEffect } from 'react';
import { Card, Spin, Typography } from '@arco-design/web-react';
import { DonutChart } from 'bizcharts';
import useLocale from '@/utils/useLocale';
import locale from './locale';

const popularContent = [
  {
    type: '文本',
    count: Math.floor(Math.random() * 1000)
  },
  {
    type: '图文',
    count: Math.floor(Math.random() * 1000)
  },
  {
    type: '视频',
    count: Math.floor(Math.random() * 1000)
  }
];

function PopularContent() {
  const t = useLocale(locale);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setData(popularContent);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <Typography.Title heading={6}>
        {t['workplace.contentPercentage']}
      </Typography.Title>
      <Spin loading={loading} style={{ display: 'block' }}>
        <DonutChart
          autoFit
          height={340}
          data={data}
          radius={0.7}
          innerRadius={0.65}
          angleField="count"
          colorField="type"
          color={['#21CCFF', '#313CA9', '#249EFF']}
          interactions={[
            {
              type: 'element-single-selected'
            }
          ]}
          tooltip={{ showMarkers: false }}
          label={{
            visible: true,
            type: 'spider',
            formatter: (v) => `${(v.percent * 100).toFixed(0)}%`,
            style: {
              fill: '#86909C',
              fontSize: 14
            }
          }}
          legend={{
            position: 'bottom'
          }}
          statistic={{
            title: {
              style: {
                fontSize: '14px',
                lineHeight: 2,
                color: 'rgb(--var(color-text-1))'
              },
              formatter: () => '内容量'
            },
            content: {
              style: {
                fontSize: '16px',
                color: 'rgb(--var(color-text-1))'
              },
              formatter: (_, data) => {
                const sum = data.reduce((a, b) => a + b.count, 0);
                return Number(sum).toLocaleString();
              }
            }
          }}
        />
      </Spin>
    </Card>
  );
}

export default PopularContent;
