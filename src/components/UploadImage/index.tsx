import { Button, Popover, Upload } from '@arco-design/web-react';
import React from 'react';
import { uploadImgReq } from '@/api/public';


const UploadImage = (props) => {
  const { url, setUrl } = props;

  const handleFileUpload = (file: File, filesList: File[]): boolean => {
    console.log(file, filesList);
    const formData = new FormData();
    formData.append('file', file);
    uploadImgReq(formData)
      .then((res) => {
        console.log(res);
        setUrl(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return true;
  };

  return (
    <div>
      {
        !url ? <Upload
            action="/api/upload/image"
            listType={'text'}
            beforeUpload={handleFileUpload}
            limit={1}
          /> :
          <>
            <Popover
              position="right"
              title={null}
              content={
                <Button
                  type={'outline'}
                  status={'danger'}
                  onClick={() => setUrl(null)}>
                  Delete
                </Button>

              }>
              <img src={`http://localhost:3000${url}`} alt="" style={{ height: 150, background: 'grey' }} />
            </Popover>
          </>
      }
    </div>
  );
};

export default UploadImage;
