import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
import { t } from '/@/hooks/web/useI18n';

const permission: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/account',
  meta: {
    orderNo: 15,
    icon: 'ion:shield-checkmark-outline',
    title: t('routes.demo.permission.permission'),
    role: [RoleEnum.SUPER],
  },

  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
        role: [RoleEnum.SUPER],
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
        role: [RoleEnum.SUPER],
      },
      component: () => import('/@/views/demo/permission/account/AccountDetail.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.demo.system.role'),
        ignoreKeepAlive: true,
        role: [RoleEnum.SUPER],
      },
      component: () => import('/@/views/demo/permission/role/index.vue'),
    },
    {
      path: 'role_detail/:id',
      name: 'RoleDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.system.role_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/permission/role',
        role: [RoleEnum.SUPER],
      },
      component: () => import('/@/views/demo/permission/role/RoleDetail.vue'),
    },
  ],
};

export default permission;
