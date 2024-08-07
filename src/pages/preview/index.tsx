import React, { useState } from 'react';
import { MdCatalog, MdPreview } from 'md-editor-rt';
import { EditStateType } from '@/types';
import { useHistory } from 'react-router';
import 'md-editor-rt/lib/style.css';
import { IconCaretUp, IconDown, IconReply } from '@arco-design/web-react/icon';
import { BackTop, Button, Dropdown, Menu } from '@arco-design/web-react';
import './style/index.less'

const setMDTheme = (v) => localStorage.setItem('md-theme', v);
const getMDTheme = localStorage.getItem('md-theme');

const Preview = () => {
  const history = useHistory();

  const { data }: EditStateType = history.location.state;

  const [textValue, setTextValue] = useState(data.content || '');
  const [id] = useState('preview-only');
  const [scrollElement] = useState(document.documentElement);

  const [previewTheme, setPreviewTheme] = useState<string>(getMDTheme || 'default');

  // const [catalogList, setList] = useState([]);
  // const [state] = useState({
  //   text: '# 标题',
  //   scrollElement: document.documentElement
  // });

  const options = [
    'default',
    'github',
    'vuepress',
    'mk-cute',
    'smart-blue',
    'cyanosis'
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button icon={<IconReply style={{ fontSize: '1.5em' }} />} onClick={() => history.goBack()}></Button>
        <Dropdown droplist={
          <Menu onClickMenuItem={t => {
            setPreviewTheme(t);
            setMDTheme(t);
          }}>
            {
              options.map(v => <Menu.Item key={v}>{v}</Menu.Item>)
            }
          </Menu>
        } position="bl">
          <Button type='text' className={'theme-select'}>
            主题 <IconDown className={'theme-select-icon'}/>
          </Button>
        </Dropdown>
      </div>
      <MdPreview
        editorId={id}
        modelValue={textValue}
        previewTheme={previewTheme}
        // onGetCatalog={setList}
      />
      <MdCatalog editorId={id} scrollElement={scrollElement} className={"md_catalog_list"}/>
    </>
  );
};

export default Preview;



