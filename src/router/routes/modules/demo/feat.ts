import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const feat: AppRouteModule = {
  path: '/feat',
  name: 'FeatDemo',
  component: LAYOUT,
  redirect: '/feat/icon',
  meta: {
    orderNo: 19,
    icon: 'ion:git-compare-outline',
    title: t('routes.demo.feat.feat'),
  },

  children: [
    {
      path: 'icon',
      name: 'IconDemo',
      component: () => import('/@/views/demo/feat/icon/index.vue'),
      meta: {
        title: t('routes.demo.feat.icon'),
      },
    },
    {
      path: 'session-timeout',
      name: 'SessionTimeout',
      component: () => import('/@/views/demo/feat/session-timeout/index.vue'),
      meta: {
        title: t('routes.demo.feat.sessionTimeout'),
      },
    },
    {
      path: 'print',
      name: 'Print',
      component: () => import('/@/views/demo/feat/print/index.vue'),
      meta: {
        title: t('routes.demo.feat.print'),
      },
    },
    {
      path: 'download',
      name: 'DownLoadDemo',
      component: () => import('/@/views/demo/feat/download/index.vue'),
      meta: {
        title: t('routes.demo.feat.download'),
      },
    },
    {
      path: 'img-preview',
      name: 'ImgPreview',
      component: () => import('/@/views/demo/feat/img-preview/index.vue'),
      meta: {
        title: t('routes.demo.feat.imgPreview'),
      },
    },
    {
      path: 'msg',
      name: 'MsgDemo',
      component: () => import('/@/views/demo/feat/msg/index.vue'),
      meta: {
        title: t('routes.demo.feat.msg'),
      },
    },
    {
      path: 'watermark',
      name: 'WatermarkDemo',
      component: () => import('/@/views/demo/feat/watermark/index.vue'),
      meta: {
        title: t('routes.demo.feat.watermark'),
      },
    },
    {
      path: '/error-log',
      name: 'ErrorLog',
      component: () => import('/@/views/sys/error-log/index.vue'),
      meta: {
        title: t('routes.demo.feat.errorLog'),
      },
    },
  ],
};

export default feat;
