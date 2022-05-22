/** title components都需要前端拿到list后手动拦截并修改这两个字段为函数模式才行 */

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
        component:'/@/views/demo/personal/setting/index.vue',
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
        component: '/@/views/demo/personal/password/index.vue',
        isAsync: true,
        parentMenu: 'PersonalCenter',
        meta: {
            title: 'routes.demo.personal.changePassword',
            ignoreKeepAlive: true,
        },
        // =============================changePassword start=============================
    }
];

const menuList = [
    ...personalRoutes,
];

module.exports = menuList;