import './style/global.less';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConfigProvider, Message } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import rootReducer from './store';
import PageLayout from './layout';
import { GlobalContext } from './context';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';
import { adminInfoReq } from '@/api/user';
import { generatePermission } from '@/routes';
import Home from './pages/home';
import { removeUserToken } from '@/utils/localstorage';
import Blog from '@/pages/Blog';
import Regist from '@/pages/regist';

const store = createStore(rootReducer);

function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'en-US');
  const [theme, setTheme] = useStorage('arco-theme', 'light');
  const [_, setUserStatus] = useStorage('userStatus');

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  function fetchUserInfo() {
    store.dispatch({
      type: 'update-userInfo',
      payload: { userLoading: true }
    });

    adminInfoReq()
      .then(resp => {
        store.dispatch({
          type: 'update-userInfo',
          payload: {
            userInfo: {
              ...resp.data,
              avatar: import.meta.env.VITE_BASE_URL + resp.data.avatar ?? '',
              permissions: generatePermission('admin')
            },
            userLoading: false
          }
        });
      })
      .catch(error => {
        setUserStatus('logout');
        removeUserToken();
        location.href = '/login';
        Message.error(error.response.message);
      });
  }

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo();
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      if (window.location.pathname.includes('main')) {
        return;
      }
      if (window.location.pathname.includes('blog')) {
        return;
      }
      window.location.pathname = '/blog';
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousewheel', function(event: KeyboardEvent) {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
      }
    }, { passive: false });

    //firefox
    window.addEventListener('DOMMouseScroll', function(event: KeyboardEvent) {
      if (event.ctrlKey === true || event.metaKey) {
        event.preventDefault();
      }
    }, { passive: false });
    //+_
    window.addEventListener('keydown', function(event: KeyboardEvent) {
      console.log(event);
      if ((event.ctrlKey === true || event.metaKey === true)
        && (event.which === 61 || event.which === 107
          || event.which === 173 || event.which === 109
          || event.which === 187 || event.which === 189)) {
        event.preventDefault();
      }
    }, false);
    // window.onload = function() {
    // };
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme
  };

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={getArcoLocale()}
        componentConfig={{
          Card: {
            bordered: false
          },
          List: {
            bordered: false
          },
          Table: {
            border: false
          }
        }}
      >
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path="/main" component={Home} />
              <Route path="/blog" component={Blog} />
              <Route path="/login" component={Login} />
              <Route path="/regist" component={Regist} />
              <Route path="/" component={PageLayout} />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

console.log(import.meta.env.VITE_ENV);
console.log(import.meta.env.VITE_BASE_URL);
console.log(import.meta.env.VITE_APP_TITLE);

ReactDOM.render(<Index />, document.getElementById('root'));
