import type { FC } from 'react';
import { Space, Card } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, useIntl } from 'umi';
// import styles from './style.less';

const { Meta } = Card;

const Dashboard: FC = () => {
  const intl = useIntl();

  return (
    <Space size="large">
      <Link to="/security/users">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<UserOutlined style={{ fontSize: '64px', color: '#08c', margin: '24px 0' }} />}
        >
          <Meta
            title={intl.formatMessage({
              id: 'pages.security.users.label',
              defaultMessage: 'Users',
            })}
            description={intl.formatMessage({
              id: 'pages.security.users.description',
              defaultMessage: 'Manage your users',
            })}
          />
        </Card>
      </Link>
      <Link to="/security/groups">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<TeamOutlined style={{ fontSize: '64px', color: '#08c', margin: '24px 0' }} />}
        >
          <Meta
            title={intl.formatMessage({
              id: 'pages.security.groups.label',
              defaultMessage: 'Groups',
            })}
            description={intl.formatMessage({
              id: 'pages.security.groups.description',
              defaultMessage: 'Manage your groups',
            })}
          />
        </Card>
      </Link>
    </Space>
  );
};

export default Dashboard;
