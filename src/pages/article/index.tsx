import React, { useEffect, useState } from 'react';
import { Tabs, Card, Input, Typography, Grid, Message, Pagination } from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from '@/pages/article/style/index.module.less';
import CardBlock from './card-block';
import AddCard from './card-add';
import { articleFuzzyReq, articleReq } from '@/api/article';

const { Title } = Typography;
const { Row, Col } = Grid;

export default function Article() {
  const t = useLocale(locale);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState([]);
  const [activeKey, setActiveKey] = useState('all');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const getData = (p?) => {
    articleReq(p ? p : { page, pageSize })
      .then(resp => {
        const { data } = resp;
        setPage(data.page);
        setPageSize(data.pageSize);
        setTotal(data.total);
        setData(data.data);
      })
      .catch(error => {
        Message.error(error.response.data.error.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 666);
      });
  };

  const onSearch = (value: string) => {
    setLoading(true);
    articleFuzzyReq({ titleZH: value })
      .then(resp => {
        console.log(resp);
        setData(resp.data.data);
        setLoading(false);
      });

  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <Card>
      <Tabs
        activeTab={activeKey}
        type="rounded"
        onChange={setActiveKey}
        extra={
          <Input.Search
            style={{ width: '240px' }}
            placeholder={t['search.placeholder']}
            onSearch={onSearch}
          />
        }
      >
      </Tabs>
      <div className={styles.container}>
        <div>
          <Title heading={6}>{t[`cardList.tab.title.${1}`]}</Title>

          <Row gutter={24} className={styles['card-content']}>
            <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
              <AddCard description={t['cardList.add']} />
            </Col>
            {data.map((item, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} key={index}>
                <CardBlock card={item} loading={loading} getList={getData} />
              </Col>
            ))}
          </Row>
          <Pagination
            total={total}
            current={page}
            pageSize={pageSize}
            showTotal
            sizeCanChange
            onChange={((page, pageSize) => {
              const v = { page, pageSize };
              getData(v);
              setPage(page);
              setPageSize(pageSize);
            })}
          />
        </div>
      </div>
    </Card>
  );
}
