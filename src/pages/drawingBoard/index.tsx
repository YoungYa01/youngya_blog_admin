import React, { useContext, useEffect } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '@/store';
import { GlobalContext } from '@/context';
import { Theme } from '@excalidraw/excalidraw/types/element/types';

const DrawingBoard = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state: GlobalState) => state.settings);

  const { lang, theme } = useContext(GlobalContext);

  useEffect(() => {
    console.log(lang);
  }, [lang]);

  useEffect(() => {
    console.log(settings);
    dispatch({
      type: 'update-settings',
      payload: {
        settings: {
          ...settings,
          footer: false,
          breadcrumb: false
        }
      }
    });
    return () => {
      dispatch({
        type: 'update-settings',
        payload: { settings: { ...settings, footer: true, breadcrumb: true } }
      });
    };
  }, []);

  return (
    <div style={{ height: '90vh', width: '100%', marginBottom: -60 }}>
      <Excalidraw langCode={lang} theme={theme as Theme}/>
    </div>
  );
};


export default DrawingBoard;
