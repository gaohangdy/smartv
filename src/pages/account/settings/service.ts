import { request } from 'umi';
import type { CurrentUser, GeographicItemType } from './data';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/cloud-analytics-web2/api/accountSettingCurrentUser.json');
}

export async function queryProvince(): Promise<{ data: GeographicItemType[] }> {
  return request('/cloud-analytics-web2/api/geographic/province.json');
}

export async function queryCity(province: string): Promise<{ data: GeographicItemType[] }> {
  return request(`/cloud-analytics-web2/api/geographic/city/${province}.json`);
}

export async function query() {
  return request('/api/users');
}
