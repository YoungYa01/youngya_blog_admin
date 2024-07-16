import React, { useState, useRef, useEffect } from 'react';
import {
  Typography,
  Card,
  Form,
  Select,
  Input,
  Grid,
  Space,
  Button,
  Message, Popconfirm, Switch
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from '@/pages/edit/style/index.module.less';
import RichText from '@/components/RichText';
import { useHistory } from 'react-router';
import { IconStar } from '@arco-design/web-react/icon';
import { articleCreateReq, articleUpdateReq, classificationsReq, tagsReq } from '@/api/article';
import MarkdownText from '@/components/MarkdownText';


const SearchForm = () => {
  const t = useLocale(locale);
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { type, data }: {
    type: 'edit' | 'new',
    data: {
      id: number,
      content: never,
      titleZH: string,
      titleEN: string,
      tags: Array<{ name: string }>,
      classifications: Array<{ title: string }>,
      isMarkdown: boolean
    }
  } = history.location.state;

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
  const [classifications, setClassifications] = useState<Array<{
    label: string,
    value: string,
    extra: {
      id: number,
      name: string,
      color: string
    }
  }>>([]);
  const [respTags, setRespTags] = useState([]);
  const [respClssifications, setClassificationsResponseData] = useState([]);

  const [isMd, setIsMd] = useState<boolean>(data?.isMarkdown || false);

  useEffect(() => {
    tagsReq()
      .then(resp => {
        setRespTags(resp.data.data);
        const data = resp.data.data.map(item => (
          {
            label: item.attributes.name,
            value: item.attributes.name,
            extra: { ...item.attributes }
          }
        ));
        setTags(data);
      });
  }, []);
  useEffect(() => {
    classificationsReq()
      .then(resp => {
        setClassificationsResponseData(resp.data.data);
        const data = resp.data.data.map(item => (
          {
            label: item.attributes.title,
            value: item.attributes.title,
            extra: { ...item.attributes }
          }
        ));
        setClassifications(data);
      });
  }, []);


  function handleSubmit() {
    const res = formRef.current.getFieldsValue();
    setLoading(true);
    if (type === 'edit') {
      articleUpdateReq(data.id, {
        data: {
          tags: respTags.filter(item => res.tags.includes(item.attributes.name)),
          classifications: respClssifications.filter(item => res.classifications.includes(item.attributes.title)),
          content: textValue,
          titleZH: res.titleZH,
          titleEN: res.titleEN
        }
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
    } else {
      articleCreateReq({
        data: {
          tags: respTags.filter(item => res.tags.includes(item.attributes.name)),
          classifications: respClssifications.filter(item => res.classifications.includes(item.attributes.title)),
          content: textValue,
          titleZH: res.titleZH,
          titleEN: res.titleEN
        }
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
  }


  useEffect(() => {
    if (type === 'new') {
      return;
    }
    const { titleZH, titleEN, tags, classifications } = data;
    formRef.current.setFieldsValue({
      titleZH,
      titleEN,
      tags: tags.map((item) => item.name),
      classifications: classifications.map((item) => item.title)
    });
  }, []);

  return (
    <div className={styles.container}>
      <Form layout="horizontal" ref={formRef} className={styles['form-group']}>
        <Card>
          {/*<Typography.Title heading={6}>*/}
          {/*  {t['groupForm.title.video']}*/}
          {/*</Typography.Title> */}
          <Grid.Row gutter={80}>
            <Grid.Col span={10}>
              <Form.Item
                label={t['edit.form.titleZH']}
                field="titleZH"
                /*initialValue={'custom'}*/
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
                /*initialValue={'custom'}*/
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
                        {option.value}
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
                label={t['edit.form.classfications']}
                field="classifications"
              >
                <Select
                  placeholder={
                    t['edit.form.placeholder.classfications']
                  }
                  mode="multiple"
                  options={classifications}
                  renderFormat={(option, value) => (
                    option ? (
                      <span>
                        <IconStar
                          style={{
                            color: option.extra.color
                          }}
                        />
                        {option.value}
                      </span>
                    ) : (
                      value
                    )
                  )}
                >
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={4}>
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




