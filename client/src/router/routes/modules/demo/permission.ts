import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
import { t } from '/@/hooks/web/useI18n';

const permission: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/front/page',
  meta: {
    orderNo: 15,
    icon: 'ion:shield-checkmark-outline',
    title: t('routes.demo.permission.permission'),
  },

  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
      },
      component: () => import('/@/views/demo/permission/account/index.vue'),
    },
    {
      path: 'account_detail/:id',
      name: 'AccountDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.system.account_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/permission/account',
      },
      component: () => import('/@/views/demo/permission/account/AccountDetail.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.demo.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/demo/permission/role/index.vue'),
    },
  ],
};

export default permission;
