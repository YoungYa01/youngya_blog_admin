import React, { useEffect, useState } from 'react';
import { Tabs, Card, Input, Typography, Grid, Message } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from '@/pages/article/style/index.module.less';
import CardBlock from './card-block';
import AddCard from './card-add';
import './mock';
import { articleFuzzyReq, articleReq } from '@/api/article';
import RichText from '@/components/RichText';

const { Title } = Typography;
const { Row, Col } = Grid;

export default function Article() {
  const t = useLocale(locale);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [activeKey, setActiveKey] = useState('all');

  const dataTransform = (data) => data.map(({ id, attributes }) => {
    return {
      id,
      ...attributes,
      classifications: attributes.classifications.data.map(({ id, attributes }) => ({ id, ...attributes })),
      tags: attributes.tags.data.map(({ id, attributes }) => ({ id, ...attributes }))
    };
  });

  const getData = () => {
    articleReq()
      .then(resp => {
        const { data: { data } } = resp;
        const result = dataTransform(data);
        setData(result);
      })
      .catch(error => {
        Message.error(error.response.data.error.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };

  const onSearch = (value: string) => {
    setLoading(true);
    articleFuzzyReq(value)
      .then(resp => {
        const { data: { data } } = resp;
        const result = dataTransform(data);
        setData(result);
        setLoading(false);
      });

  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <Card>
      <Title heading={6}>{t['menu.list.card']}</Title>
      <Tabs
        activeTab={activeKey}
        type="rounded"
        onChange={setActiveKey}
        extra={
          <Input.Search
            style={{ width: '240px' }}
            placeholder={t[`cardList.tab.${activeKey}.placeholder`]}
            onSearch={onSearch}
          />
        }
      >
        <Tabs.TabPane key="all" title={t['cardList.tab.title.all']} />
        <Tabs.TabPane key="quality" title={t['cardList.tab.title.quality']} />
        <Tabs.TabPane key="service" title={t['cardList.tab.title.service']} />
        <Tabs.TabPane key="rules" title={t['cardList.tab.title.rules']} />
      </Tabs>
      <div className={styles.container}>
        <div>
          <Title heading={6}>{t[`cardList.tab.title.${1}`]}</Title>

          <Row gutter={24} className={styles['card-content']}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
              <AddCard description={t['cardList.add.quality']} />
            </Col>
            {data.map((item, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} key={index}>
                <CardBlock card={item} loading={loading} />
              </Col>
            ))}
          </Row>

        </div>
      </div>
    </Card>
  );
}
