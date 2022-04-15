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
      path: 'excel',
      name: 'Excel',
      redirect: '/system/excel/customExport',
      component: getParentLayout('Excel'),
      meta: {
        // icon: 'mdi:microsoft-excel',
        title: t('routes.demo.excel.excel'),
      },

      children: [
        {
          path: 'customExport',
          name: 'CustomExport',
          component: () => import('/@/views/demo/excel/CustomExport.vue'),
          meta: {
            title: t('routes.demo.excel.customExport'),
          },
        },
        {
          path: 'jsonExport',
          name: 'JsonExport',
          component: () => import('/@/views/demo/excel/JsonExport.vue'),
          meta: {
            title: t('routes.demo.excel.jsonExport'),
          },
        },
        {
          path: 'arrayExport',
          name: 'ArrayExport',
          component: () => import('/@/views/demo/excel/ArrayExport.vue'),
          meta: {
            title: t('routes.demo.excel.arrayExport'),
          },
        },
        {
          path: 'importExcel',
          name: 'ImportExcel',
          component: () => import('/@/views/demo/excel/ImportExcel.vue'),
          meta: {
            title: t('routes.demo.excel.importExcel'),
          },
        },
      ],
    },
  ],
};

export default system;
