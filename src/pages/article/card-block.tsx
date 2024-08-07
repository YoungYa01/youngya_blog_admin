import React, { useEffect, useState } from 'react';
import cs from 'classnames';
import {
  Button,
  Switch,
  Tag,
  Card,
  Descriptions,
  Typography,
  Dropdown,
  Menu,
  Skeleton, Divider, Popover, Message, Popconfirm
} from '@arco-design/web-react';
import {
  IconStarFill,
  IconThumbUpFill,
  IconSunFill,
  IconFaceSmileFill,
  IconPenFill,
  IconCheckCircleFill,
  IconCloseCircleFill,
  IconMore
} from '@arco-design/web-react/icon';
import PermissionWrapper from '@/components/PermissionWrapper';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import { QualityInspection, BasicCard } from './interface';
import styles from './style/index.module.less';
import { Label } from 'bizcharts';
import { convertToPlainText } from '@/utils/RichTextChange';
import { useHistory } from 'react-router';
import { articleDeleteReq } from '@/api/article';

interface CardBlockType {
  type: 'quality' | 'service' | 'rules';
  card: QualityInspection & BasicCard;
  loading?: boolean;
}

const IconList = [
  IconStarFill,
  IconThumbUpFill,
  IconSunFill,
  IconFaceSmileFill,
  IconPenFill
].map((Tag, index) => <Tag key={index} />);

const { Paragraph } = Typography;

function CardBlock(props) {
  const { type, card = {}, getList } = props;
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(props.loading);

  const t = useLocale(locale);

  const history = useHistory();

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  const handleEdit = () => {
    history.push('/edit', { type: 'edit', data: card });
  };

  const handlePreview = () => {
    history.push('/preview', { type: 'preview', data: card });
  };

  const handleDelete = () => {
    articleDeleteReq(card.id)
      .then(resp => {
        if (resp.data.code === 200) {
          Message.success(resp.data.message);
          getList();
          return;
        }
        Message.error(resp.data.message);
      })
      .catch(err => {
        console.log(err);
      });

  };

  const getButtonGroup = () => {
    return (
        <Button.Group style={{width: 200}}>
          <Button
            type="primary"
            status={'success'}
            loading={loading}
            onClick={handlePreview}
            shape="round"
          >
            {t['cardList.options.previewIt']}
          </Button>
          <Button
            type="outline"
            loading={loading}
            onClick={handleEdit}
          >
            {t['cardList.options.qualityInspection']}
          </Button>
          <Popconfirm
            focusLock
            title={`确定要删除《${card.titleZH}》吗?`}
            icon={<span style={{ fontSize: 36 }}>⚠️</span>}
            onOk={handleDelete}
          >
            <Button
              loading={loading}
              shape="round"
              status={'danger'}
            >{t['cardList.options.remove']}</Button>
          </Popconfirm>
        </Button.Group>
    );

  };


  const TagsList = (props) => (
    <div style={{ marginRight: 20, flexWrap: 'wrap' }}>
      {
        props.tags && props.tags.map((tag, index) => (
          <Tag
            key={index}
            color={tag.color}
            style={{ marginRight: '8px' }}
          >
            {tag.name}
          </Tag>
        ))
      }
    </div>
  );

  const Classfication = (props) => (
    <>
      {
        props.classifications && props.classifications.map((classification, index) => (
          <Tag
            key={index}
            color={classification.color}
            style={{ marginRight: '8px' }}
          >
            {classification.title}
          </Tag>
        ))
      }
    </>
  );

  const className = cs(styles['card-block'], styles[`${type}-card`]);

  return (
    <Card
      bordered={true}
      className={className}
      size="small"
      title={
        loading ? (
          <Skeleton
            animation
            text={{ rows: 1, width: ['100%'] }}
            style={{ width: '120px', height: '24px' }}
            className={styles['card-block-skeleton']}
            image
          />
        ) : (
          <>
            <div
              className={cs(styles.title, {
                [styles['title-more']]: visible
              })}
            >
              {/*<Popover*/}
              {/*  title="分类"*/}
              {/*  content={*/}
              {/*    <Classfication classifications={card.classifications} />*/}
              {/*  }*/}
              {/*>*/}
              {/*</Popover>*/}
              <div>{card.titleZH}</div>

              <TagsList tags={card.tags} />
              {/*<Dropdown*/}
              {/*  droplist={*/}
              {/*    <Menu>*/}
              {/*      {['操作1', '操作2'].map((item, key) => (*/}
              {/*        <Menu.Item key={key.toString()}>{item}</Menu.Item>*/}
              {/*      ))}*/}
              {/*    </Menu>*/}
              {/*  }*/}
              {/*  trigger="click"*/}
              {/*  onVisibleChange={setVisible}*/}
              {/*  popupVisible={visible}*/}
              {/*>*/}
              {/*  <div className={styles.more}>*/}
              {/*    <IconMore />*/}
              {/*  </div>*/}
              {/*</Dropdown>*/}
            </div>

          </>
        )
      }
    >
      {
        loading ? <Skeleton
            animation
            text={{ rows: 4, width: ['100%', '50%', '75%', '20%'] }}
            style={{ width: '100%', height: '100%' }}
            className={styles['card-block-skeleton']}
          />
          : <>
            <div className={styles.content}>
              {
                convertToPlainText(card.content)
              }
            </div>

          </>
      }
      <div className={styles.extra}>
        {
          loading ? <Skeleton
              animation
              text={{ rows: 1, width: ['50%'] }}
              style={{ width: '120px', height: '100%', marginTop: 10 }}
              className={styles['card-block-skeleton']}
            />
            : <div className={styles.time}>{new Date(card.createdAt).toLocaleString()}</div>
        }
        {getButtonGroup()}
      </div>
    </Card>
  )
    ;
}

export default CardBlock;
