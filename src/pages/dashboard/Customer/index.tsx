import { useRequest } from 'umi';
import { useState } from 'react';
import type { FC } from 'react';

import { Button, DatePicker, Space } from 'antd';
import moment from 'moment';
import { PageContainer } from '@ant-design/pro-layout';
import crossfilter from 'crossfilter2';
import {
  BarChart,
  PieChart,
  WordcloudChart,
  RowChart,
  SeriesChart,
  ChartContext,
  TextFilterWidget,
  DataTable,
} from '@gaohangdy/react-dc-js';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { saveToLS, getSize } from '../../../utils/layout';
import DcChartCard from '../../../components/DcChartCard';
import type { DcChartData } from '../../../components/DcChartCard/data';
import { SearchOutlined } from '@ant-design/icons';
import * as d3 from 'd3';
import { ascending, scaleTime, timeParse, timeMonth, timeWeek, timeWeeks } from 'd3';
import { queryChartList, queryDcChartList } from './service';
// import styles from './style.less';

const ResponsiveGridLayout = WidthProvider(Responsive);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const Customer: FC = () => {
  const initLayouts = [
    { i: 'pieChart', x: 0, y: 0, w: 3, h: 2 },
    { i: 'barChart', x: 3, y: 0, w: 3, h: 2 }, //, minW: 2, maxW: 4
    { i: 'wordChart', x: 6, y: 0, w: 6, h: 2 },
    { i: 'lineChart', x: 0, y: 6, w: 6, h: 2 },
    { i: 'contentChart', x: 6, y: 6, w: 6, h: 2 },
  ];

  const [layout, setLayout] = useState(initLayouts);

  const { data, loading } = useRequest(() => {
    return queryDcChartList({
      count: 8,
    });
  });

  if (loading) {
    return <div>loading...</div>;
  }

  // const dateFormatSpecifier = '%m/%d/%Y';
  // const dateFormatParser = d3.timeParse(dateFormatSpecifier);
  // data?.list.forEach((d) => {
  //   d.dd = dateFormatParser(d.date);
  //   d.month = d3.timeMonth(d.dd); // pre-calculate month for better performance
  //   d.close = +d.close; // coerce to number
  //   d.open = +d.open;
  // });
  const cx = crossfilter(data?.list);

  const dimensionPie = cx.dimension((d) => d.sentiment);
  const groupPie = dimensionPie.group();

  const dimensionRow = cx.dimension(function (d) {
    // var day = d.dd.getDay();
    // var name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // return day + '.' + name[day];
    return d.label_codes;
    // return d.label_code;
  }, true);
  const groupRow = dimensionRow.group();

  const dimensionWord = cx.dimension((d) => d.word_list, true);
  const groupWord = dimensionWord.group().reduceCount();

  const dateFormatSpecifier = '%Y-%m-%d';
  const dateFormatParser = timeParse(dateFormatSpecifier);
  const dimensionLine = cx.dimension(function (d) {
    const shortDate = d.publish_timestamp.substring(0, 10);
    const dd = dateFormatParser(shortDate);
    const month = timeMonth(dd);
    const week = timeWeek(dd);

    // let ctype = 2;
    // if (d.sentiment.toUpperCase() === 'POSITIVE') {
    //   ctype = 0;
    // } else if (d.sentiment.toUpperCase() === 'NEGATIVE') {
    //   ctype = 1;
    // } else {
    //   ctype = 2;
    // }

    // return [+ctype, +dd];
    return dd;
  });
  const groupLine = dimensionLine.group().reduceCount();

  const filterDimension = cx.dimension((d) => d.content);
  // const moveMonths = cx.dimension((d) => d.month);
  // const volumeByMonthGroup = moveMonths.group().reduceSum((d) => d.volume / 500000);

  // const gainOrLoss = cx.dimension((d) => (d.open > d.close ? 'Loss' : 'Gain'));
  // const gainOrLossGroup = gainOrLoss.group();

  // const yearlyDimension = cx.dimension((d) => d3.timeYear(d.dd).getFullYear());
  // const wordGroup = yearlyDimension.group().reduceCount();

  const onLayoutChange = (e: any) => {
    // console.log(e, '=----layout----');
    saveToLS('layout', e);
    setLayout(e);
  };

  let ofs = 0;
  const pag = 10;

  function update_offset(tblChart: any) {
    const totFilteredRecs = cx.groupAll().value();
    // const end = ofs + pag > totFilteredRecs ? totFilteredRecs : ofs + pag;
    ofs = ofs >= totFilteredRecs ? Math.floor((totFilteredRecs - 1) / pag) * pag : ofs;
    ofs = ofs < 0 ? 0 : ofs;

    tblChart.beginSlice(ofs);
    tblChart.endSlice(ofs + pag);
  }
  function display() {
    const totFilteredRecs = ndx.groupAll().value();
    const end = ofs + pag > totFilteredRecs ? totFilteredRecs : ofs + pag;
    select('#begin').text(end === 0 ? ofs : ofs + 1);
    select('#end').text(end);
    select('#last').attr('disabled', ofs - pag < 0 ? 'true' : null);
    select('#next').attr('disabled', ofs + pag >= totFilteredRecs ? 'true' : null);
    select('#size').text(totFilteredRecs);
    if (totFilteredRecs != ndx.size()) {
      select('#totalsize').text('(filtered Total: ' + ndx.size() + ' )');
    } else {
      select('#totalsize').text('');
    }
  }

  return (
    <PageContainer
      breadcrumbRender={false}
      header={{
        extra: [
          <Space>
            <RangePicker
              defaultValue={[moment('2021/07/01', dateFormat), moment('2021/07/31', dateFormat)]}
              format={dateFormat}
            />
            <Button type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
          </Space>,
        ],
      }}
    >
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
            <DcChartCard loading={loading} title="評価" size={getSize('pieChart', layout)}>
              <PieChart
                dimension={dimensionPie}
                group={groupPie}
                // width={180}
                // height={180}
                // radius={80}
                innerRadius={60}
                colors={d3
                  .scaleOrdinal()
                  .range(['rgb(83, 109, 254)', 'rgb(255, 194, 96)', 'rgb(60, 212, 160)'])}
              />
            </DcChartCard>
          </div>
          <div key="barChart" data-grid={initLayouts.filter((item) => item.i == 'barChart')}>
            <DcChartCard loading={loading} title="ラベル" size={getSize('barChart', layout)}>
              <RowChart
                dimension={dimensionRow}
                group={groupRow}
                colors={d3.scaleOrdinal().range(['#1f77b4', '#2ca02c', '#ff7f0e'])}
              />
              {/* <BarChart
              id="testing"
              dimension={dimensionRow}
              group={groupRow}
              // width={990}
              // height={180}
              radius={80}
              centerBar={true}
              gap={1}
              x={d3.scaleTime().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)])}
              round={d3.timeMonth.round}
              alwaysUseRounding={true}
              xUnits={d3.timeMonths}
            /> */}
            </DcChartCard>
          </div>
          <div key="wordChart" data-grid={initLayouts.filter((item) => item.i == 'wordChart')}>
            <DcChartCard
              loading={loading}
              title="ワードクラウド"
              size={getSize('wordChart', layout)}
            >
              <WordcloudChart
                minX="0"
                minY="0"
                relativeSize="5"
                dimension={dimensionWord}
                group={groupWord}
                valueAccessor={(p: { value: any }) => p.value}
              />
            </DcChartCard>
          </div>
          <div key="lineChart" data-grid={initLayouts.filter((item) => item.i == 'lineChart')}>
            <DcChartCard
              loading={loading}
              title="日付別問い合わせ"
              size={getSize('lineChart', layout)}
            >
              <BarChart
                dimension={dimensionLine}
                group={groupLine}
                // width={990}
                // height={180}
                radius={80}
                centerBar={true}
                gap={20}
                x={d3.scaleTime().domain([new Date(2021, 6, 20), new Date(2021, 6, 31)])}
                round={d3.timeDay.round}
                alwaysUseRounding={true}
                xUnits={d3.timeDays}
              />
            </DcChartCard>
          </div>
          <div
            key="contentChart"
            data-grid={initLayouts.filter((item) => item.i == 'contentChart')}
          >
            <DcChartCard
              loading={loading}
              title="問い合わせ明細"
              size={getSize('contentChart', layout)}
            >
              <div className="text-filter-table">
              <TextFilterWidget dimension={filterDimension} />
              </div>
              <div className="chart-type-table">
              <DataTable
                dimension={filterDimension}
                size={50}
                columns={[(d: DcChartData) => d.content]}
                sortBy={(d: DcChartData) => d.content}
                order={ascending}
              />
              </div>
            </DcChartCard>
          </div>
        </ResponsiveGridLayout>
      </ChartContext>
    </PageContainer>
  );
};

export default Customer;
