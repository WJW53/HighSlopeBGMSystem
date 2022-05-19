import { defHttp } from '/@/utils/http/axios';

enum Api {
  REGISTER = '/register',
  LOGIN = '/login',
  CHANGEPASSWORD = '/changePassword',
}

// Get personal center-basic settings

export const registerUser = (params) => defHttp.post({ url: Api.REGISTER, params });

export const loginUser = (params) => defHttp.post({ url: Api.LOGIN, params });

export const changePassword = (params) => defHttp.post({ url: Api.CHANGEPASSWORD, params });
