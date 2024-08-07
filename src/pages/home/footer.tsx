import React from 'react';
import { Divider } from '@arco-design/web-react';
import Spline from '@splinetool/react-spline';

const Footer = () => {
  return (
    <div>

      <div style={{ display: 'flex', width: '100vw', overflow: 'hidden' }}>
        <div style={{ margin: 'auto' }}>
          <Spline
            scene="https://prod.spline.design/z7uL6arEjrGC5Vbj/scene.splinecode"
            width={512}
            height={512}
          />
        </div>
      </div>
      <p style={{ textAlign: 'center', fontSize: '18px' }}>
        时光飞逝，这三年的时光让我收获了丰富的项目经验，让我学会了自我学习、不惧困难、耐心钻研等精神，同时也让我收获了很多项目上的奖项。<br />
        本科期间我收获了<span
        style={{ fontWeight: 600, color: 'skyblue' }}>编码的能力</span>，研究生阶段，我的目标是锻炼<span
        style={{ fontWeight: 600, color: 'skyblue' }}>解决问题的能力</span>，
        我相信我会将这些能力保持住，带着我的<span style={{ fontWeight: 600, color: 'skyblue' }}>目标</span>，跟随导师度过我充实的研究生生活。
      </p>
      <p style={{ textAlign: 'center', fontSize: '21px', fontWeight: 800, margin: 52.1 }}>
        谢谢您的耐心阅读。
      </p>
      <Divider orientation={'center'}>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank" rel="noreferrer"
          style={{ textDecoration: 'none', color: '#000' }}
        >
          蜀ICP备2023021028号-1
        </a>
      </Divider>
    </div>
  );
};

export default Footer;
