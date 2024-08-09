import {
  Form,
  Input,
  Checkbox,
  Button,
  Space, Message
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconLock, IconPaste, IconUser } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import useStorage from '@/utils/useStorage';
import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';
import { useHistory } from 'react-router-dom';
import { registReq } from '@/api/public';

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const t = useLocale(locale);


  const [captcha, setCaptcha] = useState(import.meta.env.VITE_IMAGE_URL + '/api/auth/code' + '?t=' + new Date().getTime());


  function onSubmitClick() {

    formRef.current.validate().then((values) => {
      registReq(values)
        .then(response=>{
          if(response.data.code === 200){
            Message.success(response.data.message);
            history.push('/');
            return;
          }
          Message.error(response.data.message);
        })
    });
  }

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
          />
        </Form.Item>
        <Form.Item
          field="rePassword"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconPaste />}
            placeholder={t['login.form.rePassword.placeholder']}
          />
        </Form.Item>
        <Form.Item
          field="email"
          rules={[{ required: true, message: t['login.form.email.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.email.placeholder']}
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
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.register']}
          </Button>
          <Button
            type="text"
            long
            className={styles['login-form-register-btn']}
            onClick={() => history.push('/login')}
          >
            {t['login.form.login']}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
