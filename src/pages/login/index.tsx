import React, { useEffect } from 'react';
import Footer from '@/components/Footer';
import Logo from '@/assets/Y.png';
import LoginForm from './form';
import LoginBanner from './banner';
import styles from './style/index.module.less';
import { Image } from '@arco-design/web-react';

/**
 *  登录页
 * @returns React.ReactNode login
 */
function Login() {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={Logo}></Image>
      </div>
      <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <LoginBanner />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <LoginForm />
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
Login.displayName = 'LoginPage';

export default Login;