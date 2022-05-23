import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '采集编号',
    dataIndex: 'id',
  },
  {
    title: '项目编号',
    dataIndex: 'projectNo',
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
  },
  {
    title: '项目负责人',
    dataIndex: 'projectLeader',
  },
  {
    title: '联系电话',
    dataIndex: 'mobile',
  },
  {
    title: '工位名称',
    dataIndex: 'stationName',
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '采集频率',
    dataIndex: 'frequency',
  },
  {
    title: '经度',
    dataIndex: 'longitude',
  },
  {
    title: '纬度',
    dataIndex: 'latitude',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const data: any[] = (() => {
  const arr: any[] = [];
  for (let index = 0; index < 40; index++) {
    arr.push({
      id: `${index}`,
      projectNo: `P-${index}`,
      projectName: `PN-${index + 10}`,
      projectLeader: `吴经纬`,
      mobile: '11111111111',
      stationName: `SN-${index}`,
      equipmentName: `EN-${index}`,
      createTime: Date.now(),
      longitude: '122.2',
      latitude: '123.1',
      remark: '随便吧',
    });
  }
  return arr;
})();

export const arrHeader = columns.map((column) => {
  return column.title;
});
export const arrData = data.map((item) => {
  return Object.keys(item).map((key) => item[key]);
});

export const mapArrHeader = (() => {
  const cache = {};
  columns.forEach((item) => {
    cache[item.title] = item.dataIndex;
  });
  return cache;
})();
