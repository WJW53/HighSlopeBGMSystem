/** title components都需要前端拿到list后手动拦截并修改这两个字段为函数模式才行 */

const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: 'LAYOUT',
        redirect: '/dashboard/analysis',
        meta: {
          orderNo: 10,
          icon: 'ion:grid-outline',
          title: 'routes.dashboard.dashboard',
        },
    },
    {
        path: 'workbench',
        name: 'Workbench',
        isAsync: true,
        parentMenu: 'Dashboard',
        component: 'dashboard/workbench/index.vue',
        meta: {
            title: 'routes.dashboard.workbench',
        },
    },
    {
        path: 'analysis',
        name: 'Analysis',
        isAsync: true,
        parentMenu: 'Dashboard',
        component: 'dashboard/analysis/index.vue',
        meta: {
            // affix: true,
            title: 'routes.dashboard.analysis',
        },
    },

];

const personalRoutes = [
    {
        path: '/personal',
        name: 'PersonalCenter',
        component: 'LAYOUT',
        redirect: '/personal/setting',
        meta: {
          orderNo: 11,
          icon: 'ant-design:user-outlined',
          title: 'routes.demo.personal.personalCenter',
        },
    },
    // =============================setting start=============================
    {
        path: 'setting',
        name: 'PersonalSetting',
        component:'demo/personal/setting/index.vue',
        isAsync: true,
        parentMenu: 'PersonalCenter',
        meta: {
            title: 'routes.demo.page.accountSetting',
        },
    },
    // =============================setting end=============================
      
    // =============================changePassword start=============================
    {
        path: 'changePassword',
        name: 'ChangePassword',
        component: 'demo/personal/password/index.vue',
        isAsync: true,
        parentMenu: 'PersonalCenter',
        meta: {
            title: 'routes.demo.personal.changePassword',
            ignoreKeepAlive: true,
        },
        // =============================changePassword start=============================
    }
];

const permissionRoutes = [
    {
        path: '/permission',
        name: 'Permission',
        component: 'LAYOUT',
        redirect: '/permission/account',
        meta: {
          orderNo: 15,
          icon: 'ion:shield-checkmark-outline',
          title: 'routes.demo.permission.permission',
          // role: [RoleEnum.SUPER],
        },
    },
    {
        path: 'account',
        name: 'AccountManagement',
        meta: {
          title: 'routes.demo.system.account',
          ignoreKeepAlive: false,
          // role: [RoleEnum.SUPER],
        },
        isAsync: true,
        parentMenu: 'Permission',
        component: 'demo/permission/account/index.vue',
      },
      {
        path: 'account_detail/:id',
        name: 'AccountDetail',
        meta: {
          hideMenu: true,
          title: 'routes.demo.system.account_detail',
          ignoreKeepAlive: true,
          showMenu: false,
          currentActiveMenu: '/permission/account',
          // role: [RoleEnum.SUPER],
        },
        isAsync: true,
        parentMenu: 'Permission',
        component: 'demo/permission/account/AccountDetail.vue',
      },
      {
        path: 'role',
        name: 'RoleManagement',
        meta: {
          title: 'routes.demo.system.role',
          ignoreKeepAlive: true,
          // role: [RoleEnum.SUPER],
        },
        isAsync: true,
        parentMenu: 'Permission',
        component: 'demo/permission/role/index.vue',
      },
      {
        path: 'role_detail/:id',
        name: 'RoleDetail',
        meta: {
          hideMenu: true,
          title: 'routes.demo.system.role_detail',
          ignoreKeepAlive: true,
          showMenu: false,
          currentActiveMenu: '/permission/role',
          // role: [RoleEnum.SUPER],
        },
        isAsync: true,
        parentMenu: 'Permission',
        component: 'demo/permission/role/RoleDetail.vue',
      },
];
  
const systemRoutes = [
    {
        path: '/system',
        name: 'System',
        component: 'LAYOUT',
        redirect: '/system/station',
        meta: {
          orderNo: 16,
          icon: 'ion:settings-outline',
          title: 'routes.demo.system.moduleName',
          ignoreKeepAlive: true,
        },
    },
    {
        path: 'station',
        name: 'StationManagement',
        meta: {
            title: 'routes.demo.system.station',
            ignoreKeepAlive: true,
        },
        isAsync: true,
        parentMenu: 'System',
        component: 'demo/system/station/index.vue',
    },
    {
        path: 'station_detail/:id',
        name: 'StationDetail',
        meta: {
            hideMenu: true,
            title: 'routes.demo.system.station_detail',
            ignoreKeepAlive: true,
            showMenu: false,
            currentActiveMenu: '/system/station',
        },
        isAsync: true,
        parentMenu: 'System',
        component: 'demo/system/station/StationDetail.vue',
    },
    {
        path: 'equipment',
        name: 'EquipmentManagement',
        meta: {
            title: 'routes.demo.system.equipment',
            ignoreKeepAlive: true,
        },
        isAsync: true,
        parentMenu: 'System',
        component: 'demo/system/equipment/index.vue',
    },
    {
        path: 'equipment_detail/:id',
        name: 'EquipmentDetail',
        meta: {
            hideMenu: true,
            title: 'routes.demo.system.equipment_detail',
            ignoreKeepAlive: true,
            showMenu: false,
            currentActiveMenu: '/system/equipment',
        },
        isAsync: true,
        parentMenu: 'System',
        component: 'demo/system/equipment/EquipmentDetail.vue',
    },
    {
        path: 'project',
        name: 'ProjectManagement',
        meta: {
            title: 'routes.demo.system.project',
            ignoreKeepAlive: true,
        },
        isAsync: true,
        parentMenu: 'System',
        component: 'demo/system/project/index.vue',
    },
    {
        path: 'project_detail/:id',
        name: 'ProjectDetail',
        meta: {
            hideMenu: true,
            title: 'routes.demo.system.project_detail',
            ignoreKeepAlive: true,
            showMenu: false,
            currentActiveMenu: '/system/project',
        },
        isAsync: true,
        parentMenu: 'System',
        component: 'demo/system/project/ProjectDetail.vue',
    },
    {
        path: 'uploadExcel',
        name: 'UploadExcel',
        isAsync: true,
        parentMenu: 'System',
        meta: {
            icon: 'mdi:microsoft-excel',
            title: 'routes.demo.excel.importExcel',
            ignoreKeepAlive: true,
        },
        component: 'demo/system/excel/UploadExcel.vue',
    },
];

const userGuideRoutes = [
    {
        path: '/setup',
        name: 'UserGuide',
        component: 'LAYOUT',
        redirect: '/setup/index',
        meta: {
          orderNo: 90000,
          hideChildrenInMenu: true,
          icon: 'whh:paintroll',
          title: 'routes.demo.setup.page',
        },
    },
    {
        path: 'index',
        name: 'UserGuideManagement',
        isAsync: true,
        parentMenu: 'UserGuide',
        component: 'demo/setup/index.vue',
        meta: {
          title: 'routes.demo.setup.page',
          icon: 'whh:paintroll',
          hideMenu: true,
        },
    },
];


const menuList = [
    ...dashboardRoutes,
    ...personalRoutes,
    ...permissionRoutes,
    ...systemRoutes,
    ...userGuideRoutes
];

module.exports = menuList;