import React, { useEffect, useRef, useState } from 'react';
import css from './style/aboutMe.module.less';
import { Descriptions, Statistic } from '@arco-design/web-react';
import { IconArrowRise } from '@arco-design/web-react/icon';
import { StatisticProps } from '@arco-design/web-react/es/Statistic/interface';

const AboutMe = (): JSX.Element => {

  const aRef = useRef<StatisticProps>();
  const bRef = useRef<StatisticProps>();

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
      value: <div id="n1"><Statistic
        title={null}
        ref={aRef}
        value={3.83}
        countDuration={5000}
        precision={3}
        countUp

        styleValue={{ color: '#0fbf60' }}
      /></div>
    },
    {
      label: '排名',
      value: <div id="n2"><Statistic
        ref={bRef}
        title={null}
        value={11}
        countFrom={225}
        suffix={<span style={{ color: '#000' }}>/225</span>}
        countUp
        countDuration={8000}
        styleValue={{ color: '#ee4d38' }}
      /></div>
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (aRef.current && bRef.current) {
            aRef.current.countUp();
            bRef.current.countUp();
          }
        }
      });
      console.log(entries, observer);
    });
    observer.observe(document.getElementById('n1'));
    observer.observe(document.getElementById('n2'));
  }, []);

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
      <p className={css['about_content_table']}>
        <Descriptions
          column={2}
          valueStyle={{ textAlign: 'center', width: 100 }}
          colon=" :"
          layout="inline-horizontal"
          data={data} />
      </p>
    </div>
  );
};

export default AboutMe;
