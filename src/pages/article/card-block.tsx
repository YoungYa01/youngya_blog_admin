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
  Skeleton, Divider, Popover
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
  const { type, card = {} } = props;
  const [visible, setVisible] = useState(false);

  const [loading, setLoading] = useState(props.loading);

  const t = useLocale(locale);

  const history = useHistory();

  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  const handleEdit = () => {
    history.push('/edit', { type: 'edit', data: card })
  };

  const getButtonGroup = () => {
    return (
      <>
        <Button
          type="primary"
          style={{ marginLeft: '12px' }}
          loading={loading}
          onClick={handleEdit}
        >
          {t['cardList.options.qualityInspection']}
        </Button>
        <Button loading={loading}>{t['cardList.options.remove']}</Button>

      </>
    );

  };



  const TagsList = (props) => (
    <div style={{marginRight:20}}>
      {
        props.tags.map((tag, index) => (
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
        props.classifications.map((classification, index) => (
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
              <Popover
                title="分类"
                content={
                  <Classfication classifications={card.classifications} />
                }
              >
                <div>{card.titleZH}</div>
              </Popover>

              <TagsList tags={card.tags} />
              <Dropdown
                droplist={
                  <Menu>
                    {['操作1', '操作2'].map((item, key) => (
                      <Menu.Item key={key.toString()}>{item}</Menu.Item>
                    ))}
                  </Menu>
                }
                trigger="click"
                onVisibleChange={setVisible}
                popupVisible={visible}
              >
                <div className={styles.more}>
                  <IconMore />
                </div>
              </Dropdown>
            </div>

          </>
        )
      }
    >
      {
        loading ? <Skeleton
            animation
            text={{ rows: 2, width: ['100%', '50%'] }}
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
              text={{ rows: 1, width: ['100%'] }}
              style={{ width: '120px', height: '100%', marginTop: 10 }}
              className={styles['card-block-skeleton']}
            />
            : <div className={styles.time}>{card.createdAt}</div>
        }
        {getButtonGroup()}
      </div>
    </Card>
  )
    ;
}

export default CardBlock;
