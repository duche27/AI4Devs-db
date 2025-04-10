import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import CandidateList from './components/CandidateList';
import RecruiterList from './components/RecruiterList';
import './App.css';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <Link to="/">Candidates</Link>,
    },
    {
      key: '2',
      icon: <TeamOutlined />,
      label: <Link to="/recruiters">Recruiters</Link>,
    },
  ];

  return (
    <Router>
      <Layout className="app-container">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={menuItems}
          />
        </Header>
        <Content className="site-layout-content">
          <Routes>
            <Route path="/" element={<CandidateList />} />
            <Route path="/recruiters" element={<RecruiterList />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
