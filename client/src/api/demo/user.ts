import { defHttp } from '/@/utils/http/axios';

enum Api {
  REGISTER = '/register',
  LOGIN = '/login',
  CHANGEPASSWORD = '/changePassword',
  RESETPASSWORD = '/resetPassword',
  USERINFO = '/userInfo',
}

// Get personal center-basic settings

export const registerUser = (params) => defHttp.post({ url: Api.REGISTER, params });
export const loginUser = (params) => defHttp.post({ url: Api.LOGIN, params });
export const changePassword = (params) => defHttp.post({ url: Api.CHANGEPASSWORD, params });
export const resetPassword = (params) => defHttp.post({ url: Api.CHANGEPASSWORD, params });

export const getUserInfo = (params) => defHttp.get({ url: `${Api.USERINFO}/${params.id}` });
// export const getAllUserInfo = (params) => defHttp.get({ url: Api.USERINFO, params });
export const updateUserInfo = (userId, params) =>
  defHttp.put({ url: `${Api.USERINFO}/${userId}`, params });
export const createUserInfo = (params) => defHttp.post({ url: Api.USERINFO, params });
export const deleteUserInfo = (params) => defHttp.delete({ url: `${Api.USERINFO}/${params.id}` });
