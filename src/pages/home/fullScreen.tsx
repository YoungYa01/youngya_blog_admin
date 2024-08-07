import React from 'react';
import style from './style/full-screen.module.less';
import avatar from '@/assets/avatar1.png';
import TypeWord from '@/components/TypeWord';
import Spline from '@splinetool/react-spline';

const FullScreen = () => {


  return (
    <div className={style['root_content']}>
      <div className={style['spline_container']}>
        <div className={style['spline']}>
          {/*<Spline*/}
          {/*  scene="https://prod.spline.design/RwzADMuvlW9Q42Ot/scene.splinecode"*/}
          {/*  width={534}*/}
          {/*  height={400}*/}
          {/*/>*/}
          <Spline
            scene="https://prod.spline.design/R8TYfTWAsj9GngLZ/scene.splinecode"
            width={480}
            height={512}
          />
        </div>
      </div>
      <div className={style['info']}>
        <img src={avatar} alt="" />
        <TypeWord word={'Hi, I\'m Yang Jing hui.'} start={99} end={0} />
        <TypeWord word={'我叫杨景辉，来自西南科技大学'} />
      </div>

    </div>
  );
};

export default FullScreen;
