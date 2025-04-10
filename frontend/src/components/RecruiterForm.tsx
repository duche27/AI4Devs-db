import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { Recruiter, CreateRecruiterDto } from '../types/recruiter';
import { recruiterService } from '../services/recruiterService';
import axios from 'axios';

interface RecruiterFormProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  initialValues?: Recruiter | null;
}

const RecruiterForm: React.FC<RecruiterFormProps> = ({
  visible,
  onCancel,
  onSuccess,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (initialValues?.id) {
        await recruiterService.update(initialValues.id, values);
        message.success('Recruiter updated successfully');
      } else {
        await recruiterService.create(values as CreateRecruiterDto);
        message.success('Recruiter created successfully');
      }
      form.resetFields();
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        message.error('A recruiter with this email already exists');
      } else {
        message.error('Failed to save recruiter');
      }
      console.error('Error saving recruiter:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={initialValues ? 'Edit Recruiter' : 'Add Recruiter'}
      open={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      destroyOnClose
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues || {}}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input email!' },
            { type: 'email', message: 'Please input a valid email!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="department"
          label="Department"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RecruiterForm; 