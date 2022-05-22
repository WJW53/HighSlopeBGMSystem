import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/station',
  meta: {
    orderNo: 16,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
    ignoreKeepAlive: true,
  },
  children: [
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
      path: 'station_detail/:id',
      name: 'StationDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.system.station_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/station',
      },
      component: () => import('/@/views/demo/system/station/StationDetail.vue'),
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
      path: 'equipment_detail/:id',
      name: 'EquipmentDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.system.equipment_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/equipment',
      },
      component: () => import('/@/views/demo/system/equipment/EquipmentDetail.vue'),
    },
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
      path: 'project_detail/:id',
      name: 'ProjectDetail',
      meta: {
        hideMenu: true,
        title: t('routes.demo.system.project_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/project',
      },
      component: () => import('/@/views/demo/system/project/ProjectDetail.vue'),
    },
    {
      path: 'uploadExcel',
      name: 'UploadExcel',
      component: () => import('/@/views/demo/system/excel/UploadExcel.vue'),
      meta: {
        icon: 'mdi:microsoft-excel',
        title: t('routes.demo.excel.importExcel'),
        ignoreKeepAlive: true,
      },
    },
  ],
};

export default system;
