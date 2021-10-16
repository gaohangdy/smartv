import type { FC } from 'react';
import { Card, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import styles from './index.less';

export type ChartCardProps = {
  title?: string;
  size: number[];
  loading: boolean;
};

const menu = (
  <Menu>
    <Menu.Item>Reset</Menu.Item>
    <Menu.Item>Copy</Menu.Item>
    <Menu.Item>Delete</Menu.Item>
  </Menu>
);

const dropdownGroup = (
  <span className={styles.iconGroup}>
    <Dropdown overlay={menu} placement="bottomRight">
      <EllipsisOutlined />
    </Dropdown>
  </span>
);

const DcChartCard: FC<ChartCardProps> = (props) => {
  return (
    <div className="dc-chartcard">
      <Card
        loading={props.loading}
        bordered={false}
        title={props.title}
        className={styles.chartcard}
        extra={dropdownGroup}
        style={{
          height: '100%',
        }}
      >
        {props.children}
      </Card>
    </div>
  );
};

export default DcChartCard;
