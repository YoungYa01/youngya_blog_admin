import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  Form,
  Select,
  Input,
  Grid,
  Space,
  Button,
  Message,
  Popconfirm,
  Switch
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import useLocale from '@/utils/useLocale';
import locale from './local';
import styles from '@/pages/edit/style/index.module.less';
import RichText from '@/components/RichText';
import { useHistory } from 'react-router';
import { IconStar } from '@arco-design/web-react/icon';
import { articleCreateReq, articleUpdateReq, tagsReq } from '@/api/article';
import MarkdownText from '@/components/MarkdownText';
import { EditStateType } from '@/types';
import UploadImage from '@/components/UploadImage';


const SearchForm = () => {
  const t = useLocale(locale);
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [paginate, setPaginate] = useState({
    page: 1,
    pageSize: 50
  });

  const { type, data }: EditStateType = history.location.state;

  const [textValue, setTextValue] = useState(type === 'edit' ? data.content : '');

  const [tags, setTags] = useState<Array<{
    label: string,
    value: string,
    extra: {
      id: number,
      name: string,
      color: string
    }
  }>>([]);

  const [isMd, setIsMd] = useState<boolean>(true);
  const [url,setUrl] = useState(data?.cover || null);

  useEffect(() => {
    console.log(data);
    tagsReq(paginate)
      .then(resp => {
        setTags(resp.data.data.map(item => (
          {
            label: item.name,
            value: item.id,
            extra: { ...item }
          }
        )));
      });
  }, []);


  function handleSubmit() {
    const res = formRef.current.getFieldsValue();
    setLoading(true);
    if (type === 'edit') {
      articleUpdateReq(data.id, {
        tagList: res.tags,
        content: textValue,
        titleZH: res.titleZH,
        titleEN: res.titleEN,
        cover: url
      })
        .then(resp => {
          Message.success(resp.data.message);
        })
        .catch(error => {
          Message.error(error.response.data.error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      articleCreateReq({
        tagList: res.tags,
        content: textValue,
        titleZH: res.titleZH,
        titleEN: res.titleEN,
        cover: url
      })
        .then(resp => {
          Message.success(t['groupForm.submitSuccess']);
        })
        .catch(error => {
          Message.error(error.response.data.error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function handleReset() {
    formRef.current.resetFields();
    setTextValue('');
  }


  useEffect(() => {
    if (type === 'new') {
      return;
    }
    const { titleZH, titleEN, tags } = data;
    formRef.current.setFieldsValue({
      titleZH,
      titleEN,
      tags: tags.map((item) => item.id),
    });
  }, []);

  return (
    <div className={styles.container}>
      <Form layout="horizontal" ref={formRef} className={styles['form-group']}>
        <Card>
          <Grid.Row gutter={80}>
            <Grid.Col span={10}>
              <Form.Item
                label={t['edit.form.titleZH']}
                field="titleZH"
              >
                <Input placeholder={
                  t['edit.form.placeholder.titleZH']
                }
                />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={10}>
              <Form.Item
                label={t['edit.form.titleEN']}
                field="titleEN"
              >
                <Input placeholder={
                  t['edit.form.placeholder.titleEN']
                }
                />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row gutter={80}>
            <Grid.Col span={10}>
              <Form.Item
                label={t['edit.form.tags']}
                field="tags"
              >
                <Select
                  placeholder={
                    t['edit.form.placeholder.tags']
                  }
                  mode="multiple"
                  options={tags}
                  renderFormat={(option, value) => (
                    option ? (
                      <span>
                        <IconStar
                          style={{
                            color: option.extra.color
                          }}
                        />
                        {option.children}
                      </span>
                    ) : (
                      value
                    )
                  )}
                >
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={10}>
              <Form.Item
                label={t['edit.form.cover']}
                field="classifications"
              >
                <UploadImage url={url} setUrl={setUrl}/>
              </Form.Item>
            </Grid.Col><Grid.Col span={4}>
            <Form.Item
              field="type"
            >
              <Switch
                checkedText={t['edit.form.content.type.richText']}
                uncheckedText={t['edit.form.content.type.markdown']}
                type="round"
                checked={isMd}
                onChange={(checked) => setIsMd(checked)}
              />
            </Form.Item>
          </Grid.Col>
          </Grid.Row>
        </Card>
      </Form>

      {
        isMd ?
          <MarkdownText textValue={textValue} setTextValue={setTextValue} />
          : <RichText textValue={textValue} setTextValue={setTextValue}></RichText>
      }
      <div className={styles.actions}>
        <Space>
          <Button onClick={() => history.goBack()} size="large">
            {t['groupForm.goBack']}
          </Button>
          <Popconfirm
            focusLock
            title={null}
            content={t['groupForm.confirm.content']}
            onOk={handleReset}
          >
            <Button size="large" status={'warning'}>
              {t['groupForm.reset']}
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            size="large"
          >
            {type === 'edit' ? t['groupForm.submit'] : t['groupForm.new']}
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default SearchForm;




