import React, { useEffect } from 'react';
import Footer from '@/components/Footer';
import Logo from '@/assets/Y.png';
import LoginForm from './form';
import styles from './style/index.module.less';
import { useHistory } from 'react-router-dom'
/**
 *  登录页
 * @returns React.ReactNode login
 */
function Login() {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  const navigate = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={Logo} style={{ cursor: 'pointer'}} onClick={() => navigate.push('/blog')}></img>
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
