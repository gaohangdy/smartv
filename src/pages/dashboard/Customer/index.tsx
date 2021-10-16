import { useRequest } from 'umi';
import { useState } from 'react';
import type { FC } from 'react';

import crossfilter from 'crossfilter2';
import * as d3 from 'd3';
import { BarChart, PieChart, WordcloudChart, ChartContext } from '@gaohangdy/react-dc-js';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { saveToLS, getSize } from '../../../utils/layout';
import DcChartCard from '../../../components/DcChartCard';

import { queryChartList } from './service';
// import styles from './style.less';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Customer: FC = () => {
  const initLayouts = [
    { i: 'pieChart', x: 0, y: 0, w: 3, h: 2 },
    { i: 'barChart', x: 3, y: 0, w: 3, h: 2 }, //, minW: 2, maxW: 4
    { i: 'wordChart', x: 6, y: 0, w: 3, h: 2 },
  ];

  const [layout, setLayout] = useState(initLayouts);

  const { data, loading } = useRequest(() => {
    return queryChartList({
      count: 8,
    });
  });

  if (loading) {
    return <div>loading...</div>;
  }

  // const numberFormat = d3.format('.2f');
  const dateFormatSpecifier = '%m/%d/%Y';
  const dateFormatParser = d3.timeParse(dateFormatSpecifier);
  data?.list.forEach((d) => {
    d.dd = dateFormatParser(d.date);
    d.month = d3.timeMonth(d.dd); // pre-calculate month for better performance
    d.close = +d.close; // coerce to number
    d.open = +d.open;
  });
  const cx = crossfilter(data?.list);

  const moveMonths = cx.dimension((d) => d.month);
  const volumeByMonthGroup = moveMonths.group().reduceSum((d) => d.volume / 500000);

  const gainOrLoss = cx.dimension((d) => (d.open > d.close ? 'Loss' : 'Gain'));
  const gainOrLossGroup = gainOrLoss.group();

  const yearlyDimension = cx.dimension((d) => d3.timeYear(d.dd).getFullYear());
  const wordGroup = yearlyDimension.group().reduceCount();

  const onLayoutChange = (e: any) => {
    // console.log(e, '=----layout----');
    saveToLS('layout', e);
    setLayout(e);
  };

  return (
    <ChartContext>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        // rowHeight={30}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={onLayoutChange}
      >
        <div key="pieChart">
          <DcChartCard loading={loading} title="热门搜索" size={getSize('pieChart', layout)}>
            <PieChart
              dimension={gainOrLoss}
              group={gainOrLossGroup}
              // width={180}
              // height={180}
              // radius={80}
              innerRadius={60}
            />
          </DcChartCard>

          {/* <Card
            title="热门搜索"
            loading={loading}
            bordered={false}
            bodyStyle={{ overflow: 'hidden' }}
          >
            <PieChart
              dimension={gainOrLoss}
              group={gainOrLossGroup}
              // width={180}
              // height={180}
              radius={80}
              innerRadius={60}
            />
          </Card> */}
        </div>
        <div key="barChart" data-grid={initLayouts.filter((item) => item.i == 'barChart')}>
          <DcChartCard loading={loading} title="资源剩余" size={getSize('barChart', layout)}>
            <BarChart
              id="testing"
              dimension={moveMonths}
              group={volumeByMonthGroup}
              // width={990}
              // height={180}
              radius={80}
              centerBar={true}
              gap={1}
              x={d3.scaleTime().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)])}
              round={d3.timeMonth.round}
              alwaysUseRounding={true}
              xUnits={d3.timeMonths}
            />
          </DcChartCard>
          {/* <Card title="资源剩余" bodyStyle={{ textAlign: 'center', fontSize: 0 }} bordered={false}>
            <BarChart
              id="testing"
              dimension={moveMonths}
              group={volumeByMonthGroup}
              // width={990}
              // height={180}
              radius={80}
              centerBar={true}
              gap={1}
              x={d3.scaleTime().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)])}
              round={d3.timeMonth.round}
              alwaysUseRounding={true}
              xUnits={d3.timeMonths}
            />
          </Card> */}
        </div>
        <div key="wordChart" data-grid={initLayouts.filter((item) => item.i == 'wordChart')}>
          <DcChartCard loading={loading} title="资源剩余" size={getSize('wordChart', layout)}>
            <WordcloudChart
              minX="0"
              minY="0"
              relativeSize="5"
              dimension={yearlyDimension}
              group={wordGroup}
              valueAccessor={(p: { value: any }) => p.value}
            />
          </DcChartCard>
          {/* <Card title="资源剩余" bodyStyle={{ textAlign: 'center', fontSize: 0 }} bordered={false}>
            <WordcloudChart
              minX="0"
              minY="0"
              relativeSize="5"
              dimension={yearlyDimension}
              group={wordGroup}
              valueAccessor={(p: { value: any }) => p.value}
            />
          </Card> */}
        </div>
      </ResponsiveGridLayout>
      {/* <GridContent>
        <>
          <Row gutter={24}>
            <Col xl={8} lg={8} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title="热门搜索"
                loading={loading}
                bordered={false}
                bodyStyle={{ overflow: 'hidden' }}
              >
                <PieChart
                  dimension={gainOrLoss}
                  group={gainOrLossGroup}
                  // width={180}
                  // height={180}
                  radius={80}
                />
              </Card>
            </Col>
            <Col xl={8} lg={8} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title="资源剩余"
                bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                bordered={false}
              >
                <BarChart
                  id="testing"
                  dimension={moveMonths}
                  group={volumeByMonthGroup}
                  // width={990}
                  // height={180}
                  radius={80}
                  centerBar={true}
                  gap={1}
                  x={d3.scaleTime().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)])}
                  round={d3.timeMonth.round}
                  alwaysUseRounding={true}
                  xUnits={d3.timeMonths}
                />
              </Card>
            </Col>
            <Col xl={8} lg={8} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title="资源剩余"
                bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                bordered={false}
              >
                <WordcloudChart
                  minX="0"
                  minY="0"
                  relativeSize="5"
                  dimension={yearlyDimension}
                  group={wordGroup}
                  valueAccessor={(p: { value: any }) => p.value}
                />
              </Card>
            </Col>
          </Row>
        </>
      </GridContent> */}
    </ChartContext>
  );
};

export default Customer;
