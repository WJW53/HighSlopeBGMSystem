import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

// getUserMenuList
enum Api {
  GetMenuList = '/userMenuInfo',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};
