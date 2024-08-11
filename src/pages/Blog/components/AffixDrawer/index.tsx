import React, { JSX, useState } from 'react';
import style from './index.module.less';
import { IconClose, IconExpand, IconMenuFold, IconShrink, IconToBottom } from '@arco-design/web-react/icon';
import { Button, Drawer } from '@arco-design/web-react';


interface T {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  buttonIcon?: JSX.Element;
  children?: JSX.Element;
}

const AffixDrawer = (props: T): JSX.Element => {
  const [isShow, setIsShow] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <>
      {
        !isShow &&
        <div
          className={style['affix_btn']}
          style={{
            top: props.top,
            left: props.left,
            right: props.right,
            bottom: props.bottom
          }}
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          <div className={style['affix_btn_icon']}>
            {
              props.buttonIcon ? props.buttonIcon : <IconMenuFold />
            }
          </div>
        </div>
      }
      <Drawer
        closable
        title={'目录'}
        visible={isShow}
        footer={null}
        focusLock
        escToExit
        unmountOnExit
        placement={'bottom'}
        height={isFullScreen ? '50vh' : '100vh'}
        closeIcon={
          <div style={{
            width: 50,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {
              isFullScreen ?
                <Button icon={
                  <IconExpand onClick={() => setIsFullScreen(!isFullScreen)} />
                } />
                :
                <Button
                  icon={
                    <IconShrink onClick={() => setIsFullScreen(!isFullScreen)} />
                  } />
            }
            {'     '}
            <Button
              icon={
                <IconClose />
              } />
          </div>
        }
        onOk={() => {
          setIsShow(false);
        }}
        onCancel={() => {
          setIsShow(false);
        }}
      >
        {
          props.children
        }
      </Drawer>
    </>
  );
};

export default AffixDrawer;
