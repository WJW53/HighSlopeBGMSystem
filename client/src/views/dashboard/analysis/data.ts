export interface GrowCardItem {
  key: string;
  icon: string;
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
  unit: string;
}

export const getGrowCardList = (obj): GrowCardItem[] => {
  const { stationCount, equipmentCount, projectCount, visitCount } = obj;
  const growCardList: GrowCardItem[] = [
    {
      key: 'stationCount',
      title: '工位数',
      icon: 'station|svg',
      value: stationCount || 0,
      total: stationCount || 0,
      color: 'green',
      action: '个',
      unit: '总',
    },
    {
      key: 'equipmentCount',
      title: '设备数',
      icon: 'equipment|svg',
      value: equipmentCount || 0,
      total: equipmentCount || 0,
      color: 'blue',
      action: '个',
      unit: '总',
    },
    {
      key: 'projectCount',
      title: '项目数',
      icon: 'project|svg',
      value: projectCount || 0,
      total: projectCount || 0,
      color: 'orange',
      action: '个',
      unit: '总',
    },
    {
      key: 'visitCount',
      title: '访问数',
      icon: 'visit-count|svg',
      value: visitCount || 0,
      total: visitCount || 0,
      color: 'purple',
      action: '次',
      unit: '总',
    },
  ];
  return growCardList;
};
