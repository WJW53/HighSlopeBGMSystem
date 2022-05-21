import { getAllRole, isAccountExist } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '账户id',
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '账户名',
    dataIndex: 'account',
  },
  {
    title: '用户昵称',
    dataIndex: 'nickname',
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '角色',
    dataIndex: 'role',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '账户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '用户昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'mobile',
    label: '手机号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'role',
    label: '角色',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRole,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '账户id',
    component: 'Input',
    show: false,
  },
  {
    field: 'account',
    label: '账户名',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的账户名'],
    rules: [
      {
        required: true,
        message: '请输入账户名',
      },
      // {
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       isAccountExist(value) // 是否存在该账户
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
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: true,
  },
  {
    field: 'mobile',
    label: '手机号',
    component: 'Input',
    required: true,
  },
  {
    field: 'nickname',
    label: '用户昵称',
    component: 'Input',
    required: true,
  },
  {
    label: '角色',
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRole,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    // required: true,
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
