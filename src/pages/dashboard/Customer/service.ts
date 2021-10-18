import { request } from 'umi';
import type { ChartData, DcChartData } from '../../../components/DcChartCard/data';

export async function queryChartList(params: {
  count: number;
}): Promise<{ data: { list: ChartData[] } }> {
  console.log('Start request charts data');
  return request('/api/charts', {
    params,
  });
}

export async function queryDcChartList(params: {
  count: number;
}): Promise<{ data: { list: DcChartData[] } }> {
  console.log('Start request charts data');
  return request('/api/dccharts', {
    params,
  });
}