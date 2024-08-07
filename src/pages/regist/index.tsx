import React, { useEffect } from 'react';
import Footer from '@/components/Footer';
import Logo from '@/assets/Y.png';
import RegistForm from './form';
import styles from './style/index.module.less';
import { Image } from '@arco-design/web-react';

/**
 *  登录页
 * @returns React.ReactNode login
 */
function Regist() {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={Logo}></Image>
      </div>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <RegistForm />
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
Regist.displayName = 'LoginPage';

export default Regist;
