import React, { useContext, useEffect } from 'react';
import { MdEditor, Themes } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { GlobalContext } from '@/context';
import { config } from 'md-editor-rt';
import { uploadImgReq } from '@/api/public';
import { foldGutter } from '@codemirror/language';
import { lineNumbers } from '@codemirror/view';
config({
  codeMirrorExtensions(_theme, extensions) {
    return [...extensions, lineNumbers(), foldGutter()];
  }
});

const MarkdownText = (props): JSX.Element => {
  const { textValue, setTextValue } = props;
  const [value, setValue] = React.useState(textValue || '**Hello world!!!**');
  const { theme } = useContext(GlobalContext);

  const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          const form = new FormData();
          form.append('files', file);


          uploadImgReq(form)
            .then((res) => {
              console.log(res.data);
              rev(res.data);
            })
            .catch((error) => {
              console.log(error);
              rej(error);
            });

        });
      })
    );

    callback(`localhost:1337${res[0].url}`)
    callback(res.map((item) => {
      console.log(item, `localhost:1337${item[0].url}`);
      return `http://localhost:1337${item[0].url}`;
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
        style={{ height: 500 }}
        theme={theme as Themes}
        onUploadImg={onUploadImg}
      />
    </>
  );
};

export default MarkdownText;
