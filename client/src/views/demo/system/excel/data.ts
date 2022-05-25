import { equipmentFormSchema } from './../equipment/equipment.data';
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
    title: '工位',
    dataIndex: 'station',
  },
  {
    title: '设备',
    dataIndex: 'equipment',
  },
  {
    title: '开始监测日期',
    dataIndex: 'createTime',
  },
  {
    title: '停止监测日期',
    dataIndex: 'endTime',
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
      station: `SN-${index}`,
      equipment: `EN-${index}`,
      createTime: Date.now(),
      endTime: Date.now() + 360000000,
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
