import { getAllProject,  } from '/@/api/demo/project';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { frequencyOptions } from '../equipment/equipment.data';

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
    title: '采集频率',
    dataIndex: 'frequency',
    // customRender: ({ record }) => {
    //   const curFrequency = record.frequency;
    //   return frequencyOptions.find(item => item.value === curFrequency)?.value || '';
    // },
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
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
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
    field: 'stationName',
    label: '工位名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'equipmentName',
    label: '设备名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'createTime',
    label: '创建时间',
    component: 'DatePicker',
    required: true,
  },
  {
    label: '采集频率',
    field: 'frequency',
    component: 'Select',
    componentProps: {
      options: frequencyOptions,
    },
    colProps: {
      span: 13,
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
