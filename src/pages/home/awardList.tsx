import React from 'react';

import css from './style/awad-list.module.less';
import { Carousel } from '@arco-design/web-react';
import a1 from '@/assets/a1.jpg';
import a2 from '@/assets/a2.jpg';
import a3 from '@/assets/a3.jpg';
import a4 from '@/assets/a4.jpg';
import a5 from '@/assets/a5.jpg';
import a6 from '@/assets/a6.jpg';
import a7 from '@/assets/a7.jpg';

const AwardList = () => {
  const imageSrc = [
    a1, a2, a3, a4, a5, a6, a7
  ];

  const text = [
    '计算机能力挑战赛-全国二等奖',
    '蓝桥杯-四川省二等奖',
    '大学生计算机设计大赛-四川省三等奖',
    '大学生数字媒体大赛-四川省三等奖',
    '软件著作权一项',
    '西南科技大学校级三好学生连续两年（1%）',
    '西南科技大学校级优秀团员连续两年（1%）'
  ];


  return (
    <div className={css['content']}>
      <h2 className={css['title']}>
        获奖/荣誉
      </h2>
      <div>
        <Carousel
          autoPlay
          animation="card"
          showArrow="always"
          indicatorType="line"
          indicatorPosition="outer"
          style={{ width: '100%', height: 300 }}
        >
          {imageSrc.map((src, index) => (
            <div
              key={index}
              style={{ width: '60%' }}
            >
              <div
                className={css['carousel_item']}
              >
                <img
                  src={src}
                  style={{ width: '100%' }}
                />
                <p className={css['text']}>
                  {text[index]}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default AwardList;
