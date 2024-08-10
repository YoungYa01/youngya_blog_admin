import React, { useEffect, useState } from 'react';
import { MdCatalog, MdPreview } from 'md-editor-rt';
import { EditStateType } from '@/types';
import { useHistory } from 'react-router';
import 'md-editor-rt/lib/style.css';
import { IconDown, IconReply } from '@arco-design/web-react/icon';
import { Button, Dropdown, Menu, Tag } from '@arco-design/web-react';
import './style/index.less';
import { getRandomColor } from '@/utils/randomColor';

const setMDTheme = (v) => localStorage.setItem('md-theme', v);
const getMDTheme = localStorage.getItem('md-theme');

const Previewer = () => {
  const history = useHistory();

  const { data }: EditStateType = history.location.state;

  const [textValue] = useState(data.content || '');
  const [id] = useState('preview-only');
  const [scrollElement] = useState(document.documentElement);

  const [previewTheme, setPreviewTheme] = useState<string>(getMDTheme || 'default');


  const options = [
    'default',
    'github',
    'vuepress',
    'mk-cute',
    'smart-blue',
    'cyanosis'
  ];

  useEffect(() => {
      console.log(data);
    }, []
  );

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1em' }}>
        <Button icon={<IconReply style={{ fontSize: '1.5em' }} />} onClick={() => history.goBack()}></Button>
        <h1 style={{ textAlign: 'center' }}>
          {data.titleZH}<br />
          <i style={{fontSize: '0.6em',fontWeight: 500}}>{data.titleEN}</i>
        </h1>

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
          <Button type="text" className={'theme-select'}>
            主题 <IconDown className={'theme-select-icon'} />
          </Button>
        </Dropdown>
      </div>

      <div style={{
        textAlign: 'center',
        width: '100vw',
        height: '450px',
        overflow: 'hidden',
        margin: '0 auto',
        position: 'sticky',
        top: '0',
        zIndex: '-1'
      }}>
        <img src={`${import.meta.env.VITE_BASE_URL}${data.cover}`} alt="" width={'100%'} />
      </div>
      <div
        className={'tags-list'}
      >
        {
          data.tags.map((tag, index) => (
            <div key={index}>
              <Tag color={getRandomColor()}>{index + 1}</Tag>
              <div style={{display: 'inline-block', padding: '0.75em'}}></div>
              <Tag color={getRandomColor()} bordered>{tag.name}</Tag>
            </div>
          ))
        }
      </div>
      <MdPreview
        editorId={id}
        modelValue={textValue}
        previewTheme={previewTheme}
        className={'the_md_previewer'}
        style={{ }}
      />
      <div style={{
        width: '50vw',
        margin: '0 auto',
        height: '100px',
        color: '#808080'
      }}>
        <p>创建时间：{new Date(data.createdAt).toLocaleString()}</p>
      </div>
      <MdCatalog
        editorId={id}
        scrollElement={scrollElement}
        className={'md_catalog_list'}
        style={{
          background: '#eeeeee80',
          padding: '1.5em',
          borderRadius: '1em',
          border: '1px solid #eee',
          height: '70vh',
          overflow: 'scroll',
        }}
      />
    </>
  );
};

export default Previewer;
