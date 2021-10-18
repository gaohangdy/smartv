export type ChartData = {
  date: string;
  open: number;
  high: string;
  low: string;
  close: number;
  volume: number;
  oi: string;
  dd: string;
  month: string;
};

export type DcChartData = {
  content: string;
  content_id: string;
  item_code: string;
  label_codes: [];
  language_code: string;
  original: boolean;
  publish_timestamp: string;
  sentiment: string;
  word_list: [];
};

export type ChartCardSize = {
  w: number;
  h: number;
};

export type LayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
};
