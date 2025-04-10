import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { Candidate } from '../types/candidate';
import candidateService from '../services/candidateService';

interface EditCandidateFormProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  initialValues: Candidate;
}

const EditCandidateForm: React.FC<EditCandidateFormProps> = ({
  visible,
  onCancel,
  onSuccess,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        firstName: initialValues.firstName,
        lastName: initialValues.lastName,
        email: initialValues.email,
        phone: initialValues.phone,
        address: initialValues.address,
        position: initialValues.position,
        status: initialValues.status
      });
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      if (!initialValues?.id) {
        throw new Error('Invalid candidate data: ID is required for update');
      }
      
      await candidateService.update(initialValues.id, values);
      
      message.success('Candidate updated successfully');
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error('Failed to update candidate');
      console.error('Error updating candidate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Edit Candidate"
      open={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      destroyOnClose
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
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
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="position"
          label="Position"
          rules={[{ required: true, message: 'Please input position!' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select status!' }]}
        >
          <Select>
            <Select.Option value="NEW">New</Select.Option>
            <Select.Option value="IN_REVIEW">In Review</Select.Option>
            <Select.Option value="INTERVIEW">Interview</Select.Option>
            <Select.Option value="OFFER">Offer</Select.Option>
            <Select.Option value="HIRED">Hired</Select.Option>
            <Select.Option value="REJECTED">Rejected</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCandidateForm; 