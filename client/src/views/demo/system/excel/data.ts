import { BasicColumn } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '项目id',
    dataIndex: 'id',
    // defaultHidden: true,
    ifShow: false,
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
      name: `${index} John Brown`,
      age: `${index + 10}`,
      no: `${index}98678`,
      address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
      beginTime: new Date().toLocaleString(),
      endTime: new Date().toLocaleString(),
    });
  }
  return arr;
})();

// ["ID", "姓名", "年龄", "编号", "地址", "开始时间", "结束时间"]
export const arrHeader = columns.map((column) => column.title);
// [["ID", "姓名", "年龄", "编号", "地址", "开始时间", "结束时间"],["0", "0 John Brown", "10", "098678"]]
export const arrData = data.map((item) => {
  return Object.keys(item).map((key) => item[key]);
});
