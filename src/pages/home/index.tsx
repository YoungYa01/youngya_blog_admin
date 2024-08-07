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
      <AboutMe />
      <AwardList />
      <ProjectList />
      <Footer />
    </>
  );
};

export default Home;
