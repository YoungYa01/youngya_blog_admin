import React from 'react';
import Spline from '@splinetool/react-spline';
import style from './index.module.less';

export default () => {
  return (
    <div>
      <div className={style['first_screen']}>
        <div className={style['first_screen_left']}>
          <div>
          碌碌又为谁
          </div>
          <p>
              人生的最大遗憾莫过于错误地坚持了不该坚持的，轻易地放弃了不该放弃的。<br/>
              <div style={{textAlign: 'right'}}>
                  ——《<input type="text" maxLength={10}/>》
              </div>
          </p>
          <p>

          </p>
        </div>
        <Spline
          className={style['first_screen_right']}
          scene="https://prod.spline.design/xWsTJCxKKrmjXpRZ/scene.splinecode"
        />
      </div>
    </div>
  );
}
