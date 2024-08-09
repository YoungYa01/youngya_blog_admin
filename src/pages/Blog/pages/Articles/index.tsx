import React, { useEffect, useRef, useState } from 'react';
import { articleReq } from '@/api/article';
import { List, Tag, Card, Pagination } from '@arco-design/web-react';
import style from './index.module.less';
import { abstractFn } from '@/utils/RichTextChange';
import { useHistory } from 'react-router-dom';

const COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray'
];


export default () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [titleList, setTitleList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const getList = (p?, ps?) => {

    articleReq({
      page: p ? p : page,
      pageSize: ps ? ps : pageSize
    })
      .then((response) => {
        setData(response.data.data);
        setTotal(response.data.total);
        setPage(response.data.page);
        setPageSize(response.data.pageSize);
        const titles = response.data.data.map(item => item.titleZH);
        setTitleList(titles);
      });
  };

  const handleItemClick = (data) => {
    history.push('/blog/articles/preview', { type: 'preview', data });
  };


  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={style['article_content']}>
      <List className={style['title_list']}>
        {
          titleList.map((item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                title={
                  <div style={{ gap: 10, display: 'flex', alignItems: 'center' }}>
                    <Tag color={COLORS[index]} bordered>{index + 1}</Tag>
                    <div>{item}</div>
                  </div>
                }
              />
            </List.Item>
          ))
        }
      </List>
      <List className={style['article_list']}>
        {data.map((item, index) => (
          <List.Item
            key={item.id}
            className={style['article_item']}
            onClick={() => handleItemClick(item)}
            extra={
              <Card
                className={style['article_card']}
                cover={
                  <div className={style['article_cover']}>
                    <img src={`${import.meta.env.VITE_BASE_URL}${item.cover}`} alt="" />
                  </div>
                }
              />
            }
          >
            <List.Item.Meta
              title={
                <div>
                  <Tag color={COLORS[index]} bordered>{index + 1}</Tag>
                  <h2 className={style['article_title']}>{item.titleZH}</h2>
                </div>
              }
              description={
                <p className={style['article_desc']}>
                  {abstractFn(item.content)}
                </p>
              }
            />
          </List.Item>
        ))}
      </List>
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Pagination
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={(page, pageSize) => {
            getList(page, pageSize);
          }}
          simple
          size="small" />
      </div>
    </div>
  );
}
