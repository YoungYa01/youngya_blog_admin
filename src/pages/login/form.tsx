import {
  Form,
  Input,
  Checkbox,
  Button,
  Space, Message
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import useStorage from '@/utils/useStorage';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { loginReq } from '@/api/public';
import { getUserToken, setUserInfo, setUserState, setUserToken } from '@/utils/localstorage';
import { useHistory } from 'react-router-dom';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');
  const history = useHistory();

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

  const [captcha, setCaptcha] = useState(import.meta.env.VITE_IMAGE_URL + '/api/auth/code' + '?t=' + new Date().getTime());

  function afterLoginSuccess(params, token, user) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      removeLoginParams();
    }
    // 记录登录状态
    setUserState('login');
    // 记录Token
    setUserToken(token);
    // 记录User
    setUserInfo(user);
    localStorage.setItem('userRole', 'admin');
    // 跳转首页
    window.location.href = '/';
  }

  function login(params) {
    setErrorMessage('');
    setLoading(true);
    loginReq(params)
      .then((resp) => {
        if (resp.data.code !== 200) {
          return Message.error(resp.data.message);
        }
        const { token } = resp.data;
        afterLoginSuccess(params, token, { ...params, role: 'admin' });
      })
      .catch(error => {
        Message.error(error.response.data.message);
        setErrorMessage(error.response.data.message || t['login.form.login.errMsg']);
      })
      .finally(() => {
        setCaptcha(import.meta.env.VITE_BASE_URL + '/api/auth/code' + '?t=' + new Date().getTime());
        setLoading(false);
      });
  }

  function onSubmitClick() {

    formRef.current.validate().then((values) => {
      login({ ...values, role: 'admin' });
    });
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  useEffect(() => {
    const token = getUserToken();
    if (token) {
      window.location.href = '/';
    }
  }, []);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t['login.form.title']}</div>
      <div className={styles['login-form-sub-title']}>
        {t['login.form.title']}
      </div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ username: '', password: '', captcha: '' }}
      >
        <Form.Item
          field="username"
          rules={[{ required: true, message: t['login.form.userName.errMsg'] }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t['login.form.userName.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item
            field="captcha"
            rules={[{ required: true, message: t['login.form.captcha.errMsg'] }]}
          >
            <Input
              placeholder={t['login.form.captcha.placeholder']}
              onPressEnter={onSubmitClick}
              style={{ flex: 1 }}
            />
          </Form.Item>
          <img src={captcha} alt=""
            style={{ flex: 1 }}
            onClick={() => setCaptcha(import.meta.env.VITE_IMAGE_URL + '/api/auth/code' + '?t=' + new Date().getTime())} />
        </Space>
        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
            {/*<Link>{t['login.form.forgetPassword']}</Link>*/}
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
            onClick={() => history.push('/regist')}
          >
            {t['login.form.register']}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
