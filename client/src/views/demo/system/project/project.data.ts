import { getAllEquipmentList } from '/@/api/demo/equipment';
import { getAllStationList } from '/@/api/demo/station';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { frequencyOptions } from '../equipment/equipment.data';
import dayjs from 'dayjs';

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
    title: '工位编号',
    dataIndex: 'stationNo',
  },
  {
    title: '工位名称',
    dataIndex: 'stationName',
  },
  {
    title: '工位所在地',
    dataIndex: 'location',
  },
  {
    title: '设备编号',
    dataIndex: 'equipmentNo',
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
  },
  {
    title: '设备采集频率',
    dataIndex: 'frequency',
  },
  {
    title: '项目成立时间',
    dataIndex: 'createTime',
  },
  {
    title: '开始监测时间',
    dataIndex: 'startTime',
  },
  {
    title: '停止监测时间',
    dataIndex: 'endTime',
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

export const searchFormSchema: FormSchema[] = [
  {
    field: 'projectNo',
    label: '项目编号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'projectName',
    label: '项目名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'stationName',
    label: '工位名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'equipmentName',
    label: '设备名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'frequency',
    label: '设备采集频率',
    component: 'Select',
    componentProps: {
      options: frequencyOptions,
    },
    colProps: { span: 8 },
  },
  {
    label: '项目负责人',
    field: 'projectLeader',
    component: 'Input',
    colProps: { span: 8 },
  },
];

// componentProps: {
//   min: 0,
//   max: 100,
//   range: true,
//   marks: {
//     20: '20°C',
//     60: '60°C',
//   },
//   api: optionsListApi,
//   params: {
//     count: 2,
//   },
//   resultField: 'list',
//   // use name as label
//   labelField: 'name',
//   // use id as value
//   valueField: 'id',
//   isBtn: true,
//   // not request untill to select
//   immediate: false,
//   onChange: (e) => {
//     console.log('selected:', e);
//   },
//   // atfer request callback
//   onOptionsChange: (options) => {
//     console.log('get options', options.length, options);
//   },
// },

// colProps: {
//   span: 24,
// },

export const projectFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '项目id',
    component: 'Input',
    show: false,
  },
  {
    field: 'projectNo',
    label: '项目编号',
    component: 'Input',
    helpMessage: ['编号格式', '不得少于两个个字符，含英文'],
    rules: [
      {
        required: true,
        message: '请输入项目编号',
      },
      // {
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       isAccountExist(value)
      //         .then(() => resolve())
      //         .catch((err) => {
      //           reject(err.message || '验证失败');
      //         });
      //     });
      //   },
      // },
    ],
  },
  {
    field: 'projectName',
    label: '项目名称',
    component: 'Input',
    required: true,
  },
  {
    label: '项目负责人',
    field: 'projectLeader',
    component: 'Input',
    required: true,
  },
  {
    field: 'mobile',
    label: '联系电话',
    component: 'Input',
    componentProps: {
      length: 11,
    },
    required: true,
  },
  {
    field: 'station',
    label: '工位',
    component: 'ApiSelect',
    componentProps: {
      api: getAllStationList,
      labelField: 'stationName',
      valueField: 'stationNo',
    },
    colProps: { span: 16 },
    required: true,
  },
  {
    field: 'equipment',
    label: '设备',
    component: 'ApiSelect',
    componentProps: {
      api: getAllEquipmentList,
      labelField: 'equipmentName',
      valueField: 'equipmentNo',
    },
    colProps: { span: 16 },
    required: true,
  },
  {
    field: 'createTime',
    label: '项目成立时间',
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: '项目成立时间',
      showTime: { format: 'HH:mm:ss' },
    },
    required: true,
  },
  {
    field: '[startTime, endTime]',
    label: '监测时间范围',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      placeholder: ['开始监测时间', '停止监测时间'],
      showTime: { format: 'HH:mm:ss' },
      ranges: {
        今天: [dayjs(), dayjs()],
        本月: [dayjs(), dayjs().endOf('month')],
      },
    },
    required: true,
  },
  {
    field: 'longitude',
    label: '经度',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: 0,
      max: 180,
    },
    colProps: {
      span: 13,
    },
  },
  {
    field: 'latitude',
    label: '纬度',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: 0,
      max: 90,
    },
    colProps: {
      span: 13,
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: {
      span: 13,
    },
  },
];
