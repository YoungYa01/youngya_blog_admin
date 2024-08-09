import React, { useContext, useEffect, useState } from 'react';
import { MdEditor, Themes } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { GlobalContext } from '@/context';
import { config } from 'md-editor-rt';
import { uploadImgReq } from '@/api/public';
import { foldGutter } from '@codemirror/language';
import { lineNumbers } from '@codemirror/view';

// config({
//   codeMirrorExtensions(_theme, extensions) {
//     return [...extensions, lineNumbers(), foldGutter()];
//   }
// });

const MarkdownText = (props): JSX.Element => {
  const { textValue, setTextValue } = props;
  const [value, setValue] = useState( textValue || '**Hello world!!!**');
  const { theme } = useContext(GlobalContext);

  const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('file', file);
          uploadImgReq(form)
            .then((res) => {
              rev(res.data.data);
            })
            .catch((error) => {
              console.log(error);
              rej(error);
            });

        });
      })
    );

    callback(res.map((item) => {
      return `http://localhost:3000${item}`;
    }));
  };

  useEffect(() => {
    setTextValue(value);
  }, [value]);

  return (
    <>
      <MdEditor
        modelValue={value}
        onChange={setValue}
        style={{ height: 550 }}
        theme={theme as Themes}
        onUploadImg={onUploadImg}
      />
    </>
  );
};

export default MarkdownText;
