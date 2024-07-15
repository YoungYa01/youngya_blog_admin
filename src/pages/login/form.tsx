import {
  Form,
  Input,
  Checkbox,
  Link,
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
import { Simulate } from 'react-dom/test-utils';
import { setUserInfo, setUserState, setUserToken } from '@/utils/localstorage';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

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
    localStorage.setItem('userRole','admin')
    // 跳转首页
    window.location.href = '/';
  }

  function login(params) {
    setErrorMessage('');
    setLoading(true);
    loginReq(params)
      .then((resp) => {
        console.log(resp);
        const { data: { jwt, user } } = resp;
        afterLoginSuccess(params, jwt, user);
      })
      .catch(error => {
        Message.error(error.response.data.error.message);
        setErrorMessage(error.response.data.error.message || t['login.form.login.errMsg']);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmitClick() {

    formRef.current.validate().then((values) => {
      console.log(values);
      login(values);
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
        initialValues={{ identifier: 'yonghu', password: 'Yonghu123' }}
      >
        <Form.Item
          field="identifier"
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
          {/*<Button*/}
          {/*  type="text"*/}
          {/*  long*/}
          {/*  className={styles['login-form-register-btn']}*/}
          {/*>*/}
          {/*  {t['login.form.register']}*/}
          {/*</Button>*/}
        </Space>
      </Form>
    </div>
  );
}