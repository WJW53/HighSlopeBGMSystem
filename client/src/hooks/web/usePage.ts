import type { RouteLocationRaw, Router } from 'vue-router';

import { PageEnum } from '/@/enums/pageEnum';
import { isString } from '/@/utils/is';
import { unref } from 'vue';

import { useRouter } from 'vue-router';
import { REDIRECT_NAME } from '/@/router/constant';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };

function handleError(e: Error) {
  console.error(e);
}

// page switch
export function useGo(_router?: Router) {
  let router;
  if (!_router) {
    router = useRouter();
  }
  const { push, replace } = _router || router;
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return;
    }
    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    } else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }
  return go;
}

/**
 * @description: redo current page
 */
export const useRedo = (_router?: Router) => {
  const { push, currentRoute } = _router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  console.log('重定向之前: ', unref(currentRoute.value), { query, params, name, fullPath });
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false);
        return;
      }
      // 这个params为啥是{}??上面route里有值啊, 不应该用默认的{}啊, 导致走进了else
      // console.log(name, Object.keys(params), name && Object.keys(params).length > 0);
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name';
        params['path'] = String(name);
      } else {
        params['_redirect_type'] = 'path';
        params['path'] = fullPath;
      }
      // console.log('重新加载中调用useRedo的redo', { name: REDIRECT_NAME, params, query });
      //利用Redirect重定向到当前路由, 路径啥的在params里存好了
      push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true));
    });
  }
  return redo;
};
