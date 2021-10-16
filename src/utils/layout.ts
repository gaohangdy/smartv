import { LayoutItem } from '../components/DcChartCard/data';

export const getFromLS = function getFromLS(key: string) {
  let ls = {};
  if (global.localStorage) {
    try {
      const lsResult = global.localStorage.getItem('rgl-7');
      if (lsResult != null) {
        ls = JSON.parse(lsResult) || {};
      }
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
};

export const saveToLS = function saveToLS(key: string, value: string) {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-7',
      JSON.stringify({
        [key]: value,
      }),
    );
  }
};

export const getSize = function getSize(id: string, layout: LayoutItem[]) {
  const matchedLayoutItems = layout.filter((item) => item.i == id);
  if (matchedLayoutItems) {
    return [matchedLayoutItems[0].w, matchedLayoutItems[0].h];
  }
  return [];
};
