import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { queryCurrent } from '../service';
import { queryProvince, queryCity } from '../service';

import styles from './BaseView.less';

const validatorPhone = (rule: any, value: string[], callback: (message?: string) => void) => {
  if (!value[0]) {
    callback('Please input your area code!');
  }
  if (!value[1]) {
    callback('Please input your phone number!');
  }
  callback();
};
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>Avatar</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          Edit
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView: React.FC = () => {
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  const getAvatarURL = () => {
    // if (currentUser) {
    //   if (currentUser.avatar) {
    //     return currentUser.avatar;
    //   }
    //   const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    //   return url;
    // }
    // return '';
    const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  };

  const handleFinish = async () => {
    message.success('Basic info saved.');
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: 'Edit Basic Info',
                },
              }}
              initialValues={{
                ...currentUser,
                phone: currentUser?.phone.split('-'),
              }}
              hideRequiredMark
            >
              <ProFormText
                initialValue="demo@cloud.analytics.com"
                width="md"
                name="email"
                label="Mail"
                rules={[
                  {
                    required: true,
                    message: 'Please input your mail!',
                  },
                ]}
              />
              <ProFormText
                initialValue="デモ　太郎"
                width="md"
                name="name"
                label="Nick Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input nick name!',
                  },
                ]}
              />
              <ProFormTextArea
                initialValue={`はじめまして、デモ太郎です。
デモ用のユーザーです。
よろしくお願いします。`}
                name="profile"
                label="Introduction"
                rules={[
                  {
                    required: true,
                    message: 'Please input introduction!',
                  },
                ]}
                placeholder="introduction"
              />
              <ProFormSelect
                initialValue="Japan"
                width="sm"
                name="country"
                label="Country/Region"
                rules={[
                  {
                    required: true,
                    message: 'Please input country or region!',
                  },
                ]}
                options={[
                  {
                    label: '日本',
                    value: 'Japan',
                  },
                ]}
              />

              <ProForm.Group title="State" size={8}>
                <ProFormSelect
                  initialValue="Tokyo"
                  rules={[
                    {
                      required: true,
                      message: 'Please input state!',
                    },
                  ]}
                  options={[
                    {
                      label: '東京',
                      value: 'Tokyo',
                    },
                  ]}
                  width="sm"
                  // fieldProps={{
                  //   labelInValue: true,
                  // }}
                  name="province"
                // className={styles.item}
                // request={async () => {
                //   return queryProvince().then(({ data }) => {
                //     return data && data.map((item) => {
                //       return {
                //         label: item.name,
                //         value: item.id,
                //       };
                //     });
                //   });
                // }}
                />
                <ProFormDependency name={['province']}>
                  {({ province }) => {
                    return (
                      <ProFormSelect
                        initialValue="Minato"
                        params={{
                          key: province?.value,
                        }}
                        name="city"
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: 'Please input city!',
                          },
                        ]}
                        options={[
                          {
                            label: '港区',
                            value: 'Minato',
                          },
                        ]}
                        disabled={!province}
                        className={styles.item}
                      // request={async () => {
                      //   if (!province?.key) {
                      //     return [];
                      //   }
                      //   return queryCity(province.key || '').then(({ data }) => {
                      //     return data && data.map((item) => {
                      //       return {
                      //         label: item.name,
                      //         value: item.id,
                      //       };
                      //     });
                      //   });
                      // }}
                      />
                    );
                  }}
                </ProFormDependency>
              </ProForm.Group>
              <ProFormText
                initialValue="海岸１−２−３  "
                width="md"
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'Please input address!',
                  },
                ]}
              />
              <ProFormFieldSet
                value={['81', '7012345678']}
                name="phone"
                label="TEL"
                rules={[
                  {
                    required: true,
                    message: 'Please input TEL!',
                  },
                  // { validator: validatorPhone },
                ]}
              >
                <Input className={styles.area_code}/>
                <Input className={styles.phone_number}/>
              </ProFormFieldSet>
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
