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
import { PaginateType, TagType } from '@/types';

const Tags = () => {
  const t = useLocale(local);
  const [tags, setTags] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = useState<'new' | 'edit'>('edit');
  const [history, setHistory] = useState([]);
  const [curTag, setCurTag] = useState<TagType>({ icon: '', color: '', createdAt: '', name: '', id: 0 });
  const [paginate, setPaginate] = useState<PaginateType>({
    page: 1,
    pageSize: 50,
    total: 0
  });
  const [loading, setLoading] = useState(false);

  const getList = () => {
    setLoading(true);
    tagsReq(paginate)
      .then(resp => {
        setTags(resp.data.data);
        setLoading(false)
      })
      .catch(error => {
        Message.error(error.response.data.data);
      })
      .finally(() => {
          setLoading(false)
        }
      )
  };

  const onSearch = (value) => {
    tagFuzzyReq({ name: value },paginate)
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
        name: curTag.name,
        color: curTag.color,
        icon: curTag.icon
      })
        .then(resp => {
          const { code, msg } = resp.data;
          if (code === 200) {
            getList();
            Message.success(msg);
            return setVisible(false);
          }
          Message.error(msg);
        });
    } else {
      tagUpdateReq(curTag.id, {
        name: curTag.name,
        color: curTag.color,
        icon: curTag.icon
      })
        .then(resp => {
          getList();
          Message.success('更新成功');
          setVisible(false);
        })
        .catch(error => {
          Message.error(error.response.data.error.message);
        });
    }
  };

  const onDelete = () => {
    tagDeleteReq(curTag.id)
      .then(resp => {
        const { code, msg } = resp.data;
        if (code === 200) {
          setVisible(false);
          getList();
          return Message.success('删除成功');
        }
        return Message.error(msg);
      });
  };

  const addHistory = (visible) => {
    if (!visible) {
      const newHistory = [...history.slice(-10), curTag.color];
      setHistory(newHistory);
    }
  };

  const Footer = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {
          type === 'edit' &&
          <Button type={'outline'} status={'danger'} onClick={onDelete} size={'large'}>{t['modal.delete.text']}</Button>
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
          setCurTag({ color: '', createdAt: '', name: '', icon: '', id: 0 });
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
        loading={loading}
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
                    color={item.color}
                    className={style['tag']}
                    onClick={() => {
                      setVisible(true);
                      setCurTag(item);
                      setType('edit');
                    }}
                  >
                    {item.name}
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
                value={curTag.name}
                maxLength={10}
                showWordLimit
                placeholder={t['modal.input.placeholder']}
                style={{ width: 300 }}
                onChange={(value) => setCurTag({
                  ...curTag,
                  name: value
                })}
              />
            }, {
              label: t['modal.color.label'],
              value: <ColorPicker
                value={curTag.color}
                historyColors={history}
                showPreset
                showHistory
                showText
                onChange={color => {
                  setCurTag({
                    ...curTag,
                    color: color
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
