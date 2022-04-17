import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '设备编号',
    dataIndex: 'equipmentNo',
  },
  {
    title: '设备名称',
    dataIndex: 'equipmentName',
  },
  {
    title: '采集频率',
    dataIndex: 'frequency',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'equipmentNo',
    label: '设备编号',
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

const isExist = async (anyNo: string | number): Promise<boolean> => {
  console.log(anyNo); //这里去向服务端询问
  return true;
};
export const accountFormSchema: FormSchema[] = [
  {
    label: '设备编号',
    field: 'equipmentNo',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        message: '请输入设备编号',
      },
      {
        validator(_, value) {
          // 用来验证是否唯一存在
          return new Promise((resolve, reject) => {
            isExist(value)
              .then(() => resolve())
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    label: '设备名称',
    field: 'equipmentName',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        message: '请输入设备名称',
      },
      {
        validator(_, value) {
          // 用来验证是否唯一存在
          return new Promise((resolve, reject) => {
            isExist(value)
              .then(() => resolve())
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    label: '采集频率',
    field: ' frequency',
    component: 'Input',
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    required: false,
  },
];
