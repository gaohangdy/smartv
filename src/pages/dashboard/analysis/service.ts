import { request } from 'umi';
import type { AnalysisData } from './data';

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request('/cloud-analytics-web2/api/fake_analysis_chart_data.json');
}
