import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const personal: AppRouteModule = {
  path: '/personal',
  name: 'PersonalCenter',
  component: LAYOUT,
  redirect: '/personal/setting',
  meta: {
    orderNo: 11,
    icon: 'ant-design:user-outlined',
    title: t('routes.demo.personal.personalCenter'),
  },
  children: [
    // =============================setting start=============================
    {
      path: 'setting',
      name: 'AccountSettingPage',
      component: () => import('/@/views/demo/personal/setting/index.vue'),
      meta: {
        title: t('routes.demo.page.accountSetting'),
      },
    },
    // =============================setting end=============================

    // =============================changePassword start=============================
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: t('routes.demo.personal.changePassword'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/demo/personal/password/index.vue'),
    },
    // =============================changePassword start=============================
  ],
};

export default personal;
