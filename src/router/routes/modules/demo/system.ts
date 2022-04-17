import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 16,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
    ignoreKeepAlive: true,
  },
  children: [
    {
      path: 'project',
      name: 'ProjectManagement',
      meta: {
        title: t('routes.demo.system.project'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/demo/system/project/index.vue'),
    },
    {
      path: 'station',
      name: 'StationManagement',
      meta: {
        title: t('routes.demo.system.station'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/demo/system/station/index.vue'),
    },
    {
      path: 'equipment',
      name: 'EquipmentManagement',
      meta: {
        title: t('routes.demo.system.equipment'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/demo/system/equipment/index.vue'),
    },
    {
      path: 'uploadExcel',
      name: 'uploadExcel',
      component: () => import('/@/views/demo/system/excel/UploadExcel.vue'),
      meta: {
        // icon: 'mdi:microsoft-excel',
        title: t('routes.demo.excel.importExcel'),
        ignoreKeepAlive: true,
      },
    },
  ],
};

export default system;
