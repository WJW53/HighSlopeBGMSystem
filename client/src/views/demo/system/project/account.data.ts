import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
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
];

export const accountFormSchema: FormSchema[] = [
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
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            isAccountExist(value)
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
    component: 'Input',
    required: true,
  },
  {
    field: 'longitude',
    label: '经度',
    component: 'Input',
    required: true,
  },
  {
    field: 'latitude',
    label: '纬度',
    component: 'Input',
    required: true,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
  },
];
