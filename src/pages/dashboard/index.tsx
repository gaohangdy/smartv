import type { FC } from 'react';
import { Card, Row, Col } from 'antd';
import {
  CustomerServiceOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  AccountBookOutlined,
  HistoryOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link, useIntl } from 'umi';
import styles from './style.less';

const { Meta } = Card;

const Security: FC = () => {
  const intl = useIntl();

  return (
    <Row justify="center">
      <Col span={12}>
        <Row justify="center" gutter={[48, 16]}>
          <Col span={8}>
            <Link to="/dashboard/customer">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <CustomerServiceOutlined
                    style={{ fontSize: '64px', color: '#08c', margin: '24px 0' }}
                  />
                }
              >
                <Meta
                  className={styles.metatitle}
                  title={intl.formatMessage({
                    id: 'pages.dashboard.customer.label',
                    defaultMessage: 'Users',
                  })}
                />
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/dashboard/store">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <ShoppingOutlined style={{ fontSize: '64px', color: '#08c', margin: '24px 0' }} />
                }
              >
                <Meta
                  className={styles.metatitle}
                  title={intl.formatMessage({
                    id: 'pages.dashboard.store.label',
                    defaultMessage: 'Groups',
                  })}
                />
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/dashboard/monitor">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <ShoppingCartOutlined
                    style={{ fontSize: '64px', color: '#08c', margin: '24px 0' }}
                  />
                }
              >
                <Meta
                  className={styles.metatitle}
                  title={intl.formatMessage({
                    id: 'pages.dashboard.product.label',
                    defaultMessage: 'Groups',
                  })}
                />
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/dashboard/workplace">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <AccountBookOutlined
                    style={{ fontSize: '64px', color: '#08c', margin: '24px 0' }}
                  />
                }
              >
                <Meta
                  className={styles.metatitle}
                  title={intl.formatMessage({
                    id: 'pages.dashboard.sales.label',
                    defaultMessage: 'Groups',
                  })}
                />
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/list/table-list">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <HistoryOutlined style={{ fontSize: '64px', color: '#08c', margin: '24px 0' }} />
                }
              >
                <Meta
                  className={styles.metatitle}
                  title={intl.formatMessage({
                    id: 'pages.dashboard.history.label',
                    defaultMessage: 'Groups',
                  })}
                />
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/dashboard/store">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <SettingOutlined style={{ fontSize: '64px', color: '#08c', margin: '24px 0' }} />
                }
              >
                <Meta
                  className={styles.metatitle}
                  title={intl.formatMessage({
                    id: 'pages.dashboard.customize.label',
                    defaultMessage: 'Groups',
                  })}
                />
              </Card>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Security;
