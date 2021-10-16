import { request } from 'umi';
import type { ChartData } from '../../components/DcChartCard/data';

export async function queryChartList(params: {
  count: number;
}): Promise<{ data: { list: ChartData[] } }> {
  console.log('Start request charts data');
  return request('/api/charts', {
    params,
  });
}
