import React from 'react';
import css from './style/aboutMe.module.less';
import { Descriptions } from '@arco-design/web-react';

const AboutMe = (): JSX.Element => {
  const data = [
    {
      label: '电话',
      value: <a href="tel:15075771860" style={{ color: '#1d2129' }}>15075771860</a>
    },
    {
      label: '邮箱',
      value: <a href="mailto:15075771860@163.com" target="_blank" rel="noreferrer"
                style={{ color: '#1d2129' }}>15075771860@163.com</a>
    },
    {
      label: 'GPA',
      value: '3.841'
    },
    {
      label: '排名',
      value: <span><span style={{ fontWeight: 600 }}>11</span>/225</span>
    }
  ];

  return (
    <div className={css.root}>
      <p className={css.title}>
        关于我
      </p>
      <p className={css.titleEN}>
        About Me
      </p>
      <p className={css['about_content']}>
        你好！我叫<span className={css['hight_weight']}>杨景辉</span>，来自<span
        className={css['hight_light']}>西南科技大学</span>，专业是<span
        className={css['hight_light']}>计算机科学与技术专业（卓越计划）</span>。
      </p>
      <p className={css['about_content']}>
        <Descriptions
          column={2}
          style={{ width: '35vw', margin: 'auto' }}
          valueStyle={{ textAlign: 'center', width: 100 }}
          colon=" :"
          layout="inline-horizontal"
          data={data} />
      </p>
      <div style={{ height: 200 }}></div>
    </div>
  );
};

export default AboutMe;
