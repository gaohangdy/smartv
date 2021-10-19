import React from 'react';
import { List } from 'antd';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
  strong: <span className="strong">Strong</span>,
  medium: <span className="medium">Normal</span>,
  weak: <span className="weak">Weak</span>,
};

const SecurityView: React.FC = () => {
  const getData = () => [
    {
      title: 'Password',
      description: (
        <>
          Password strong：
          {passwordStrength.strong}
        </>
      ),
      actions: [<a key="Modify">Edit</a>],
    },
    {
      title: 'TEL',
      description: `XXX****XX`,
      actions: [<a key="Modify">Edit</a>],
    },
    {
      title: 'Question',
      description: 'Answer for remind password.',
      actions: [<a key="Set">Edit</a>],
    },
    {
      title: 'Backup mail',
      description: `Used mail：ant***sign.com`,
      actions: [<a key="Modify">Edit</a>],
    },
    // {
    //   title: 'MFA 设备',
    //   description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    //   actions: [<a key="bind">绑定</a>],
    // },
  ];

  const data = getData();
  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};

export default SecurityView;
