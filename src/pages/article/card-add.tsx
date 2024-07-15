import React from 'react';
import { Card } from '@arco-design/web-react';
import cs from 'classnames';
import { IconPlus } from '@arco-design/web-react/icon';
import styles from './style/index.module.less';
import { useHistory } from 'react-router';

interface AddCardProps {
  description?: string;
}

function AddCard(props: AddCardProps) {
  const history = useHistory();
  return (
    <Card
      className={cs(styles['card-block'], styles['add-card'])}
      title={null}
      bordered={true}
      size="small"
      onClick={() => history.push('/edit',{ type: 'new'})}
    >
      <div className={styles.content}>
        <div className={styles['add-icon']}>
          <IconPlus />
        </div>
        <div className={styles.description}>{props.description}</div>
      </div>
    </Card>
  );
}

export default AddCard;
