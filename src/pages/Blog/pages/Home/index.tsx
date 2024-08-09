import React, { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import style from './index.module.less';
import { IconDoubleDown, IconThumbUp } from '@arco-design/web-react/icon';
import ConfettiButton from '@arco-materials/confetti-button';
import { Button } from '@arco-design/web-react';
import { accessReq, praiseReq } from '@/api/public';

export default () => {

  const [awesome, setAwesome] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    accessReq();
  }, []);

  const handleClick = () => {
    if (!awesome) {
      setLoading(true);
      praiseReq()
        .then(() => {
          setAwesome(true);
        })
        .catch(() => {
          setAwesome(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <div className={style['first_screen']}>
        <div className={style['first_screen_left']}>
          <div>
            碌碌又为谁
          </div>
          <div className={style['p']}>
            人生的最大遗憾莫过于错误地坚持了不该坚持的，轻易地放弃了不该放弃的。<br />
            <div style={{ textAlign: 'right' }}>
              ——《<input type="text" maxLength={10} />》
            </div>
          </div>
          <div>
            <ConfettiButton disabled={awesome}>
              <Button
                type={!awesome ? 'outline' : 'primary'}
                shape="circle"
                size="large"
                loading={loading}
                style={!awesome ?
                  { color: '#fff', backgroundColor: '#000', borderColor: '#fff' }
                  : { color: '#000', backgroundColor: '#fff', borderColor: '#fff' }
                }
                icon={<IconThumbUp style={{ fontSize: 18, verticalAlign: -4 }} />}
                onClick={handleClick}
              />
            </ConfettiButton>
          </div>
        </div>
        <Spline
          className={style['first_screen_right']}
          scene="https://prod.spline.design/xWsTJCxKKrmjXpRZ/scene.splinecode"
        />
        <IconDoubleDown className={style['down_btn']} />
      </div>
    </div>
  );
}
