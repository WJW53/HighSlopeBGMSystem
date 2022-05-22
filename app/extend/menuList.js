//orderNo保证同层比较就行了
const menuList = [
    {
      "menuNo": "Dashboard",
      "menuName": "Dashboard",
      "component": "LAYOUT",
      "icon": "ion:layers-outline",
      "type": "0",
      "orderNo": 1,
      "children": [
        {
          "menuNo": "Workbench",
          "menuName": "工作台",
          "type": "1",
          "icon": "ion:document",
          // "component": "/dashboard/welcome/index",
          "orderNo": 1,
          "parentMenu": "Dashboard",
        },
        {
          "menuNo": "Analysis",
          "menuName": "分析页",
          "type": "1",
          "icon": "ion:document",
          "permission": "menu1:view",
          // "component": "/dashboard/analysis/index",
          "orderNo": 2,
          "parentMenu": "Dashboard",
        },
      ]
    },
    {
      "menuNo": "PersonalCenter",
      "menuName": "个人中心",
      "component": "LAYOUT",
      "icon": "ion:layers-outline",
      "type": "0",
      "orderNo": 11,
      "children": [
        {
          "menuNo": "PersonalSetting",
          "menuName": "个人设置",
          "type": "1",
          "icon": "ion:document",
          // "component": "/dashboard/welcome/index",
          "orderNo": 1,
          "parentMenu": "PersonalCenter",
        },
        {
          "menuNo": "ChangePassword",
          "menuName": "修改密码",
          "type": "1",
          "icon": "ion:document",
          "permission": "menu1:view",
          // "component": "/dashboard/analysis/index",
          "orderNo": 2,
          "parentMenu": "PersonalCenter",
        },
      ]
    },
    {
      "menuNo": "Permission",
      "menuName": "权限管理",
      "component": "LAYOUT",
      "icon": "ion:layers-outline",
      "type": "0",
      "orderNo": 21,
      "children": [
        {
          "menuNo": "AccountManagement",
          "menuName": "账号管理",
          "type": "1",
          "icon": "ion:document",
          // "component": "/dashboard/welcome/index",
          "orderNo": 1,
          "parentMenu": "Permission",
        },
        {
          "menuNo": "RoleManagement",
          "menuName": "角色管理",
          "type": "1",
          "icon": "ion:document",
          "permission": "menu1:view",
          // "component": "/dashboard/analysis/index",
          "orderNo": 2,
          "parentMenu": "Permission",
        },
      ]
    },
    {
      "menuNo": "System",
      "menuName": "系统管理",
      "component": "LAYOUT",
      "icon": "ion:layers-outline",
      "type": "0",
      "orderNo": 31,
      "children": [
        {
          "menuNo": "StationManagement",
          "menuName": "账号管理",
          "type": "1",
          "icon": "ion:document",
          // "component": "/dashboard/welcome/index",
          "orderNo": 1,
          "parentMenu": "System",
        },
        {
          "menuNo": "EquipmentManagement",
          "menuName": "角色管理",
          "type": "1",
          "icon": "ion:document",
          // "component": "/dashboard/analysis/index",
          "orderNo": 2,
          "parentMenu": "System",
        },
        {
          "menuNo": "ProjectManagement",
          "menuName": "账号管理",
          "type": "1",
          "icon": "ion:document",
          // "component": "/dashboard/welcome/index",
          "orderNo": 3,
          "parentMenu": "System",
        },
        {
          "menuNo": "UploadExcel",
          "menuName": "导入数据",
          "type": "1",
          "icon": "ion:document",
          // "component": "/dashboard/analysis/index",
          "orderNo": 4,
          "parentMenu": "System",
        },
      ]
    },
    {
      "menuNo": "UserGuide",
      "menuName": "用户引导",
      "component": "LAYOUT",
      "icon": "ion:layers-outline",
      "type": "0",
      "orderNo": 41,
      "children": [
        {
          "menuNo": "UserGuideManagement",
          "menuName": "用户引导",
          "type": "1",
          "icon": "ion:document",
          // "component": "/dashboard/welcome/index",
          "orderNo": 1,
          "parentMenu": "UserGuide",
        },
      ]
    },
]

exports.menuList = menuList;