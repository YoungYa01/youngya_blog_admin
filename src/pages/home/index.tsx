import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { startSakura } from '@/components/Flowers';
import FullScreen from '@/pages/home/fullScreen';
import AboutMe from '@/pages/home/aboutMe';
import ProjectList from '@/pages/home/ProjectList';
import AwardList from '@/pages/home/awardList';
import Footer from '@/pages/home/footer';

const Home = (): JSX.Element => {
  const history = useHistory();
  useEffect(() => {
    startSakura();
    document.title = '一个求学的人 | 杨景辉';
  }, []);
  return (
    <>
      <FullScreen />
      {/*<Menu mode="horizontal" theme="dark" defaultSelectedKeys={['1']}*/}
      {/*>*/}
      {/*  <MenuItem key="0" style={{ padding: 0, marginRight: 38 }} disabled>*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        width: 80,*/}
      {/*        height: 30,*/}
      {/*        cursor: 'text',*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <img src={logo} alt="logo" height={40}/>*/}
      {/*    </div>*/}
      {/*  </MenuItem>*/}
      {/*  <MenuItem key="1">Home</MenuItem>*/}
      {/*  <MenuItem key="2">Solution</MenuItem>*/}
      {/*  <MenuItem key="3">Cloud Service</MenuItem>*/}
      {/*  <MenuItem key="4">Cooperation</MenuItem>*/}
      {/*</Menu>*/}
      <AboutMe />
      <AwardList />
      <ProjectList />
      <Footer />
    </>
  );
};

export default Home;
