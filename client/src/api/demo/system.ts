import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Account = '/userInfo',
  Role = '/roleInfo',
  AllMenuBasicInfo = '/allMenuBasicInfo', //'allMenuBasicInfo'

  IsAccountExist = '/userInfo',
  DeptList = '/getDeptList',
  setRoleStatus = '/setRoleStatus',
}

/** 超级管理员对账户的CRUD */
export const getAllAccount = (params) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.Account, params });
export const getAnAccount = (id, params) => defHttp.get({ url: `${Api.Account}/${id}`, params });
export const createAccount = (params) => defHttp.post({ url: Api.Account, params });
export const deleteAccount = (id) => defHttp.delete({ url: `${Api.Account}/${id}` });
export const updateAccount = (id, params) => defHttp.put({ url: `${Api.Account}/${id}`, params });

/** 超级管理员对角色的CRUD */
export const getAllRole = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.Role, params });
export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.Role, params });
export const getAnRole = (id, params) => defHttp.get({ url: `${Api.Role}/${id}`, params });
export const createRole = (params) => defHttp.post({ url: Api.Role, params });
export const deleteRole = (id) => defHttp.delete({ url: `${Api.Role}/${id}` });
export const updateRole = (id, params) => defHttp.put({ url: `${Api.Role}/${id}`, params });

//other todo
export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

//getAllMenuBasicInfo
export const getAllMenuBasicInfo = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.AllMenuBasicInfo, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (
  params, //params 里面有 account
) => defHttp.post({ url: Api.IsAccountExist, params }, { errorMessageMode: 'none' });
