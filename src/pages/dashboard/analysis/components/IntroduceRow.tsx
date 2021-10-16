import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';

import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { DataItem } from '../data.d';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: DataItem[] }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Total Sale"
        action={
          <Tooltip title="Total sales">
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => <Yuan>126560</Yuan>}
        footer={<Field label="Daily Sales" value={`￥${numeral(12423).format('0,0')}`} />}
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          Weekly
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          Daily
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Total Access"
        action={
          <Tooltip title="Total Access">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={<Field label="Daily Access" value={numeral(1234).format('0,0')} />}
        contentHeight={46}
      >
        <TinyArea
          color="#975FE4"
          xField="x"
          height={46}
          forceFit
          yField="y"
          smooth
          data={visitData}
        />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Payments"
        action={
          <Tooltip title="Payments">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(6560).format('0,0')}
        footer={<Field label="CVR" value="60%" />}
        contentHeight={46}
      >
        <TinyColumn xField="x" height={46} forceFit yField="y" data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="Activity Effect"
        action={
          <Tooltip title="Activity effect">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total="78%"
        footer={
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Trend flag="up" style={{ marginRight: 16 }}>
              Weekly
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              Daily
              <span className={styles.trendText}>11%</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        <Progress
          height={46}
          percent={0.78}
          color="#13C2C2"
          forceFit
          size={8}
          marker={[
            {
              value: 0.8,
              style: {
                stroke: '#13C2C2',
              },
            },
          ]}
        />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
