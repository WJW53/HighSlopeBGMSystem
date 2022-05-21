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
  IsAccountExist = '/accountExist',
  DeptList = '/getDeptList',
  setRoleStatus = '/setRoleStatus',
  MenuList = '/getMenuList',
  RolePageList = '/getRoleListByPage',
  GetAllRoleList = '/getAllRoleList',
}

/** 超级管理员对账户的CRUD */
export const getAllAccount = (params) => defHttp.get<AccountListGetResultModel>({ url: Api.Account, params });
export const getAnAccount = (id, params) => defHttp.get({ url: `${Api.Account}/${id}`, params });
export const createAccount = (params) => defHttp.post({ url: Api.Account, params });
export const deleteAccount = (id) => defHttp.delete({ url: `${Api.Account}/${id}` });
export const updateAccount = (id, params) => defHttp.put({ url: `${Api.Account}/${id}`, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
