import React from 'react';
import style from './style/full-screen.module.less';
import avatar from '@/assets/avatar1.png';
import TypeWord from '@/components/TypeWord';

const FullScreen = () => {


  return (
    <div className={style['root_content']}>
      <div className={style['info']}>
        <img src={avatar} alt="" />
        <TypeWord word={'Hi, I\'m Yang Jing hui.'} start={99} end={0} />
        <TypeWord word={"我叫杨景辉，来自西南科技大学"} />
      </div>

    </div>
  );
};

export default FullScreen;
