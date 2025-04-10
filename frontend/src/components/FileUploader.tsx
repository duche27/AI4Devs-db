import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

interface FileUploaderProps {
  onUploadSuccess: (fileUrl: string) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

const { Dragger } = Upload;

const FileUploader: React.FC<FileUploaderProps> = ({
  onUploadSuccess,
  acceptedFileTypes = ['.pdf', '.doc', '.docx'],
  maxFileSize = 5, // in MB
}) => {
  const [uploading, setUploading] = useState(false);

  const props = {
    name: 'file',
    multiple: false,
    accept: acceptedFileTypes.join(','),
    action: '/api/upload',
    onChange(info: any) {
      const { status } = info.file;
      if (status === 'uploading') {
        setUploading(true);
      } else if (status === 'done') {
        setUploading(false);
        message.success(`${info.file.name} file uploaded successfully.`);
        onUploadSuccess(info.file.response.url);
      } else if (status === 'error') {
        setUploading(false);
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file: File) {
      const isValidType = acceptedFileTypes.some(type => 
        file.name.toLowerCase().endsWith(type)
      );
      if (!isValidType) {
        message.error('You can only upload PDF or Word files!');
        return false;
      }
      
      const isLessThanMaxSize = file.size / 1024 / 1024 < maxFileSize;
      if (!isLessThanMaxSize) {
        message.error(`File must be smaller than ${maxFileSize}MB!`);
        return false;
      }
      
      return true;
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for PDF and Word documents. Max file size: {maxFileSize}MB
      </p>
    </Dragger>
  );
};

export default FileUploader; 