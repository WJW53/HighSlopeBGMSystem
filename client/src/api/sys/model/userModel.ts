/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  roleValue: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  id: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  role: RoleInfo[];
  // 用户id
  id: string | number;
  // 用户名
  account: string;
  // 真实名字
  nickname: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
