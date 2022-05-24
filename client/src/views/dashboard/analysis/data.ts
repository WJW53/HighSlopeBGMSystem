export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
  unit: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: '工位数',
    icon: 'station|svg',
    value: 2000,
    total: 120000,
    color: 'green',
    action: '个',
    unit: '总',
  },
  {
    title: '设备数',
    icon: 'equipment|svg',
    value: 20000,
    total: 500000,
    color: 'blue',
    action: '个',
    unit: '总',
  },
  {
    title: '项目数',
    icon: 'project|svg',
    value: 8000,
    total: 120000,
    color: 'orange',
    action: '个',
    unit: '总',
  },
  {
    title: '访问数',
    icon: 'visit-count|svg',
    value: 5000,
    total: 50000,
    color: 'purple',
    action: '次',
    unit: '总',
  },
];
