import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';

interface DashboardProps {
  totalCandidates: number;
  activeRecruiters: number;
  pendingInterviews: number;
}

const RecruiterDashboard: React.FC<DashboardProps> = ({
  totalCandidates,
  activeRecruiters,
  pendingInterviews,
}) => {
  return (
    <div className="dashboard">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Candidates" value={totalCandidates} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Active Recruiters" value={activeRecruiters} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Pending Interviews" value={pendingInterviews} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RecruiterDashboard; 