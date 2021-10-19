import { Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import NoticeIconView from '../NoticeIcon';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="Search"
        defaultValue=""
        options={[
          {
            label: <a href="https://www.yahoo.co.jp/">Yahoo</a>,
            value: 'yahoo',
          },
          {
            label: <a href="https://www.google.com/">Google</a>,
            value: 'google',
          },
          {
            label: <a href="https://www.apple.com/">Apple</a>,
            value: 'apple',
          },
          {
            label: <a href="https://www.microsoft.com/">Microsoft</a>,
            value: 'microsoft',
          },
        ]} // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://www.pactera.com');
        }}
      >
        <QuestionCircleOutlined />
      </span>
      {/* <NoticeIconView /> */}
      <Avatar menu />
      <SelectLang className={styles.action} />
    </Space>
  );
};

export default GlobalHeaderRight;
