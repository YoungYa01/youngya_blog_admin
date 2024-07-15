import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichText = (props): JSX.Element => {

  const { textValue, setTextValue } = props;

  const [value, setValue] = useState(textValue);

  useEffect(() => {
    setTextValue(value);
  }, [value]);


  return (
    <div>
      <ReactQuill
        value={value}
        onChange={(value) => setValue(value)}
        id="rich_text"
        theme="snow"
        style={{ height: '550px' }}
      />
    </div>
  );
};

export default RichText;
