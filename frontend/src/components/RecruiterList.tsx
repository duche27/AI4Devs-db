import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tag, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Recruiter } from '../types/recruiter';
import { recruiterService } from '../services/recruiterService';
import RecruiterForm from './RecruiterForm';

const RecruiterList: React.FC = () => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecruiter, setEditingRecruiter] = useState<Recruiter | null>(null);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const data = await recruiterService.getAll();
      setRecruiters(data);
    } catch (error) {
      message.error('Failed to fetch recruiters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await recruiterService.delete(id);
      message.success('Recruiter deleted successfully');
      fetchRecruiters();
    } catch (error) {
      message.error('Failed to delete recruiter');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'name',
      render: (text: string, record: Recruiter) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Recruiter) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingRecruiter(record);
              setModalVisible(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => {
              Modal.confirm({
                title: 'Are you sure you want to delete this recruiter?',
                onOk: () => handleDelete(record.id),
              });
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingRecruiter(null);
            setModalVisible(true);
          }}
        >
          Add Recruiter
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={recruiters}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <RecruiterForm
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingRecruiter(null);
        }}
        onSuccess={() => {
          setModalVisible(false);
          setEditingRecruiter(null);
          fetchRecruiters();
        }}
        initialValues={editingRecruiter}
      />
    </div>
  );
};

export default RecruiterList; 