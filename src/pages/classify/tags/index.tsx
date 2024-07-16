import React, { useEffect, useState } from 'react';
import { tagCreateReq, tagDeleteReq, tagFuzzyReq, tagsReq, tagUpdateReq } from '@/api/article';
import {
  Card,
  Input,
  Tabs,
  Tag,
  Grid,
  Modal,
  ColorPicker,
  Descriptions,
  Message,
  Button
} from '@arco-design/web-react';
import useLocale from '@/utils/useLocale';
import local from '@/pages/classify/tags/local';
import style from './index.module.less';
import { IconRefresh } from '@arco-design/web-react/icon';

const Tags = () => {
  const t = useLocale(local);
  const [tags, setTags] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = useState<'new' | 'edit'>('edit');
  const [history, setHistory] = useState([]);
  const [curTag, setCurTag] = useState<{
    id: number;
    attributes: {
      name: string;
      color: string;
      createdAt: string;
      updatedAt: string;
    };
  }>({ attributes: { color: '', name: '', updatedAt: '', createdAt: '' }, id: 0 });

  const getList = () => {
    tagsReq()
      .then(resp => {
        console.log(resp.data.data);
        setTags(resp.data.data);
      });
  };

  const onSearch = (value) => {
    console.log(value);
    tagFuzzyReq(value)
      .then(resp => {
        Message.success('搜索成功');
        setTags(resp.data.data);
      })
      .catch(error => {
        Message.error(error.response.data.error.message);
      });
  };

  const onSubmit = () => {
    if (type === 'new') {
      tagCreateReq({
        data: {
          name: curTag.attributes.name,
          color: curTag.attributes.color
        }
      })
        .then(resp => {
          Message.success('创建成功');
          getList();
        })
        .catch(error => {
          Message.error(error.response.data.error.message);
        });
    } else {
      tagUpdateReq(curTag.id, {
        data: {
          id: curTag.id,
          name: curTag.attributes.name,
          color: curTag.attributes.color
        }
      })
        .then(resp => {
          Message.success('更新成功');
          getList();
        })
        .catch(error => {
          Message.error(error.response.data.error.message);
        });
    }
  };

  const onDelete = () => {
    tagDeleteReq(curTag.id)
      .then(() => {
        Message.success('删除成功');
        setVisible(false);
        getList();
      })
      .catch(error => {
        Message.error(error.response.data.error.message);
      });
  };

  const addHistory = (visible) => {
    if (!visible) {
      const newHistory = [...history.slice(-10), curTag.attributes.color];
      setHistory(newHistory);
    }
  };

  const Footer = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {
          type === 'edit' && <Button type={'outline'} status={'danger'} onClick={onDelete} size={'large'}>{t['modal.delete.text']}</Button>
        }
        <Button
          type={'outline'}
          status={'success'}
          onClick={onSubmit}
          size={'large'}
        >{type === 'new' ? t['modal.ok.text.new'] : t['modal.ok.text.edit']}</Button>
        <Button type={'outline'} onClick={() => setVisible(false)} size={'large'}>{t['modal.cancel.text']}</Button>
      </div>
    );
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Card>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: 50, marginBottom: 20 }}>
        <Button type={'outline'} onClick={() => {
          setVisible(true);
          setType('new');
          setCurTag({ attributes: { color: '', createdAt: '', name: '', updatedAt: '' }, id: 0 });
        }} size={'large'}>{t['modal.ok.text.new']}</Button>
        <div>
          <Input.Search
            style={{ width: '240px' }}
            placeholder={t['search.placeholder']}
            onSearch={onSearch}
          />
          <Button icon={<IconRefresh />} onClick={getList}></Button>
        </div>
      </div>
      <Card
        bordered>
        <Grid.Row className="grid-demo">
          {
            tags && tags.map(item => {
              return (
                <Grid.Col
                  key={item.id}
                  xs={2}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                  xxl={2}
                >
                  <Tag
                    size={'large'}
                    color={item.attributes.color}
                    className={style['tag']}
                    onClick={() => {
                      setVisible(true);
                      setCurTag(item);
                      setType('edit');
                    }}
                  >
                    {item.attributes.name}
                  </Tag>
                </Grid.Col>
              );
            })
          }
        </Grid.Row>
      </Card>
      <Modal
        title={type === 'new' ? t['modal.title'] : t['modal.title.new']}
        visible={visible}
        autoFocus={false}
        focusLock={true}
        footer={<Footer />}
        closable={false}
      >
        <Descriptions
          colon=" :"
          layout="inline-horizontal"
          title={null}
          column={1}
          labelStyle={{ width: 50, textAlign: 'right' }}
          data={[
            {
              label: t['modal.input.label'],
              value: <Input
                value={curTag.attributes.name}
                maxLength={10}
                showWordLimit
                placeholder={t['modal.input.placeholder']}
                style={{ width: 300 }}
                onChange={(value) => setCurTag({
                  ...curTag,
                  attributes: {
                    ...curTag.attributes,
                    name: value
                  }
                })}
              />
            }, {
              label: t['modal.color.label'],
              value: <ColorPicker
                value={curTag.attributes.color}
                historyColors={history}
                showPreset
                showHistory
                showText
                onChange={color => {
                  setCurTag({
                    ...curTag,
                    attributes: {
                      ...curTag.attributes,
                      color: color
                    }
                  });
                }}
                onVisibleChange={addHistory}
              />
            }
          ]} />


      </Modal>
    </Card>
  );
};

export default Tags;
