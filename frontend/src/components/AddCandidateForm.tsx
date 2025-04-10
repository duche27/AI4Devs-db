import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import { Candidate } from '../types/candidate';
import { Recruiter } from '../types/recruiter';
import candidateService from '../services/candidateService';
import { recruiterService } from '../services/recruiterService';

interface AddCandidateFormProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
}

interface CandidateFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  position: string;
  recruiterId?: number;
}

const AddCandidateForm: React.FC<AddCandidateFormProps> = ({
  visible,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loadingRecruiters, setLoadingRecruiters] = useState(false);

  const fetchRecruiters = async () => {
    try {
      setLoadingRecruiters(true);
      const data = await recruiterService.getAll();
      setRecruiters(data);
    } catch (error) {
      message.error('Failed to fetch recruiters');
    } finally {
      setLoadingRecruiters(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchRecruiters();
    }
  }, [visible]);

  const onFinish = async (values: CandidateFormData) => {
    try {
      await candidateService.create(values);
      message.success('Candidate added successfully');
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error('Failed to add candidate');
    }
  };

  return (
    <Modal
      title="Add Candidate"
      visible={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
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
          name="address"
          label="Address"
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
          name="recruiterId"
          label="Recruiter"
        >
          <Select
            loading={loadingRecruiters}
            placeholder="Select a recruiter"
            allowClear
          >
            {recruiters.map(recruiter => (
              <Select.Option key={recruiter.id} value={recruiter.id}>
                {recruiter.firstName} {recruiter.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCandidateForm; 