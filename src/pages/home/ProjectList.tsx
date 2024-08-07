import React from 'react';
import { Card, Grid } from '@arco-design/web-react';
import css from '@/pages/home/style/projectList.module.less';
import project1 from '@/assets/project1.jpg';
import project2 from '@/assets/project2.jpg';
import project3 from '@/assets/project3.jpg';
import project4 from '@/assets/project4.png';

const { Row, Col } = Grid;

const ProjectList = () => {
  const data = [
    {
      title: '四川省软件行业协会数字化平台',
      desc: <span>该项目是为四川省软件协会打造的一款数字化管理平台，用于管理四川省各大软件企业信息，包括企业注册、加入软协会员、双软评估等业务，<strong>我主要负责前端项目的构建部署，人员分配，完成企业信息管理、企业打标、双软评审管理等业务的开发工作。</strong></span>,
      img: project2,
      url: 'http://www.scsia.org'
    },
    {
      title: '程序设计在线考试作弊检测系统',
      desc: '本项目旨在设计和实现一个基于深度学习的程序设计在线考试作弊检测系统。系统将提供利用深度学习模型提取图像中的特征，通过屏幕抓取规则进行抓取，对比临近时间内抓取的图像的相似度和差异度，识别考生是否作弊。同时，系统还将提供关键字识别功能，对抓取的屏幕截图进行关键字识别，进一步提高作弊检测的准确性。',
      img: project1,
      url: 'https://gitee.com/Young_Ya/cheating-detection-client'
    },
    {
      title: '基于智能题库的测试平台',
      desc: '该项目是面向计算机学院全体学生的在线练题平台，主要针对与单选题、多选题、判断题等客观题，学生端可考试，可自主练题，教师端可导入学生，管理学生做题题库，发布由系统智能组合的测试卷、导出学生的做题结果等数据',
      img: project3,
      url: 'https://github.com/5120205942/learning-platform'
    },
    {
      title: '各地代表公司股票数据可视化分析',
      desc: '该项目是根据全国各地的代表公司股票数据，分析数据的独特性，并绘制多种不同类型的图表，包括条形图、区域图、词云图、K线图和全国地图，以展示数据的多样性和趋势。在全地图上通过点击相应的省份实现将相关数据呈现在K线图、区域图、条形图、词云图、滚动图等，根据图表信息分析得出股票价值与地区分布的关系',
      img: project4,
      url: 'https://gitee.com/Young_Ya/d3visual'
    }
  ];

  const Cover = (item) => {
    return (
      <div className={css['image-container']}>
        <img
          className={item.index % 2 ? css['image-odd'] : css['image-even']}
          src={item.img}
          alt="" />
        {
          item.url && <a href={item.url} className={css['url']}>{item.url}</a>
        }
      </div>
    );
  };

  return (
    <>
      <p className={css.title}>
        项目经历
      </p>
      <p style={{ marginBottom: 10, marginTop: 10, textAlign: 'center', fontSize: 16 }}>
        本科期间大一便加入数据与知识工程实验室，积极参与到实验室的学习中去，在实验室中积极参与老师的科研活动。<br />
        无论是论文搜集、开发工作、数据抓取等，都认真且积极的完成。<br />
        回想暑假主动留校留实验室的时光，从早上八九点一直到晚上九十点才离开，那段时间犹如就在昨日。<br />
        平时钻研代码，耐心找寻问题的答案，实验室的学习让我有了丰富的项目经验。<br />
      </p>
      <Row style={{ padding: 5 }} gutter={{ md: 8, lg: 24, xl: 32 }}>
        {data.map((item, index) => (
          <Col xs={23} sm={11} md={8} lg={8} xl={6} xxl={6} key={index}>
            <Card
              bordered
              hoverable
              style={{ width: '100%', margin: 5 }}
              cover={<Cover {...item} index={index} />}
            >
              <Card.Meta
                title={<h3>{item.title}</h3>}
                description={item.desc}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProjectList;
