import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Candidate } from '../types/candidate';
import candidateService from '../services/candidateService';
import AddCandidateForm from './AddCandidateForm';

const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const data = await candidateService.getAll();
      setCandidates(data);
    } catch (error) {
      message.error('Failed to fetch candidates');
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await candidateService.delete(id);
      message.success('Candidate deleted successfully');
      fetchCandidates();
    } catch (error) {
      message.error('Failed to delete candidate');
      console.error('Error deleting candidate:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (record: Candidate) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Candidate) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {/* TODO: Implement edit */}}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
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
          onClick={() => setModalVisible(true)}
        >
          Add Candidate
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={candidates}
        rowKey="id"
        loading={loading}
      />
      
      <AddCandidateForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSuccess={() => {
          setModalVisible(false);
          fetchCandidates();
        }}
      />
    </div>
  );
};

export default CandidateList; 