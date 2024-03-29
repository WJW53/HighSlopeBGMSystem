import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
// import { getAllCityInfo } from '/@/api/demo/system';
import { cityOptions } from './city';

export const columns: BasicColumn[] = [
  {
    title: '工位id',
    dataIndex: 'id',
    // defaultHidden: true,
    ifShow: false,
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
    title: '所属地',
    dataIndex: 'location',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '工位编号',
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
    field: 'location',
    label: '所属地',
    // component: 'Cascader',
    // componentProps: {
    //   options: cityOptions,
    // },
    component: 'Input',
    colProps: { span: 8 },
  },
];

// const isExist = async (anyNo: string | number): Promise<boolean> => {
//   console.log(anyNo); //这里去向服务端询问
//   return true;
// };

export const stationFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '工位id',
    component: 'Input',
    show: false,
  },
  {
    label: '工位编号',
    field: 'stationNo',
    component: 'Input',
    required: true,
    helpMessage: ['编号格式', '不得少于两个个字符，含英文'],
    rules: [
      {
        required: true,
        message: '请输入工位编号',
      },
      // {
      //   validator(_, value) {
      //     // 用来验证是否唯一存在
      //     return new Promise((resolve, reject) => {
      //       isExist(value)
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
    label: '工位名称',
    field: 'stationName',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        message: '请输入工位名称',
      },
      // {
      //   validator(_, value) {
      //     // 用来验证是否唯一存在
      //     return new Promise((resolve, reject) => {
      //       isExist(value)
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
    label: '所属地',
    field: 'location',
    component: 'Cascader',
    componentProps: {
      options: cityOptions,
    },
    colProps: { span: 24 },
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    required: false,
  },
];
