//orderNo保证同层比较就行了
// TODO:其实这里最好是：从数据库中查出所有路由配备信息，然后再封装成如下格式才对

const getMenuNoLayerMap = (menuList) => {
  const map = new Map();
  map.set('firstLayer', []);
  map.set('secondLayer', []);
  const firstLayer = map.get('firstLayer');
  const secondLayer = map.get('secondLayer');
  for(const menu of menuList){
    firstLayer.push(menu.menuNo);
    if(menu.children && !menu.children.length > 0){
      for(const subMenu of menu.children){
        secondLayer.push(subMenu.menuNo);
      }
    }
  }
  return map;
}

/**
 * @params reqMenuList 拍平的menuNo, ['Dashboard', 'Workbench', ...];传进来必须是有值的, 没值或者空数组, 要在service层面拦截处理掉!
 * @result 
      const filter = {
        $or: [
          {
            name: 'DashBoard', 
            children: {
              $or: [
                {name: 'Analysis'},
              ],
            } 
          },
        ],
      }
 */

const getFindMenuFilter = (reqMenuList, allMenuLayerMap) => {
  const firstLayerList = allMenuLayerMap.get('firstLayer');
  const secondLayerList = allMenuLayerMap.get('secondLayer');
  const filter = {
    $or: [],
  }
  for(const menu of reqMenuList){
    const menuNo = menu.menuNo;
    if(firstLayerList.includes(menuNo)){
      filter['$or'].push({name: menuNo});
    }else if(secondLayerList.includes(menuNo)){
    }
    if(menu.children){
      for(const subMenu of menu.children){
        try {
          const menuChildren = map.get(subMenu.parentMenu).children;//如过走了后面的逻辑就代表此路由配置的父路由不存在
          menuChildren.push({name: subMenu.menuNo});
        } catch (error) {
          console.log('此路由配置的父路由不存在！！', subMenu.menuNo,  subMenu.parentMenu, error);
        }
      }
    }
  }
}


const allMenuBasicInfoList = [
    {
      "menuNo": "Dashboard",
      "menuName": "Dashboard",
      "component": "LAYOUT",
      "icon": 'ion:grid-outline',
      "type": "0",
      "orderNo": 1,
      "children": [
        {
          "menuNo": "Workbench",
          "menuName": "工作台",
          "type": "1",
          // "icon": "ion:document",
          "orderNo": 1,
          "parentMenu": "Dashboard",
        },
        {
          "menuNo": "Analysis",
          "menuName": "分析页",
          "type": "1",
          // "icon": "ion:document",
          "orderNo": 2,
          "parentMenu": "Dashboard",
        },
      ]
    },
    {
      "menuNo": "PersonalCenter",
      "menuName": "个人中心",
      "component": "LAYOUT",
      "icon": 'ant-design:user-outlined',
      "type": "0",
      "orderNo": 11,
      "children": [
        {
          "menuNo": "PersonalSetting",
          "menuName": "个人设置",
          "type": "1",
          // "icon": "ion:document",
          "orderNo": 1,
          "parentMenu": "PersonalCenter",
        },
        {
          "menuNo": "ChangePassword",
          "menuName": "修改密码",
          "type": "1",
          // "icon": "ion:document",
          "orderNo": 2,
          "parentMenu": "PersonalCenter",
        },
      ]
    },
    {
      "menuNo": "Permission",
      "menuName": "权限管理",
      "component": "LAYOUT",
      "icon": 'ion:shield-checkmark-outline',
      "type": "0",
      "orderNo": 21,
      "children": [
        {
          "menuNo": "AccountManagement",
          "menuName": "账号管理",
          "type": "1",
          // "icon": "ion:document",
          "orderNo": 1,
          "parentMenu": "Permission",
        },
        {
          "menuNo": "RoleManagement",
          "menuName": "角色管理",
          "type": "1",
          // "icon": "ion:document",
          "orderNo": 2,
          "parentMenu": "Permission",
        },
      ]
    },
    {
      "menuNo": "System",
      "menuName": "系统管理",
      "component": "LAYOUT",
      "icon": 'ion:settings-outline',
      "type": "0",
      "orderNo": 31,
      "children": [
        {
          "menuNo": "StationManagement",
          "menuName": "账号管理",
          "type": "1",
          // "icon": "ion:document",
          "orderNo": 1,
          "parentMenu": "System",
        },
        {
          "menuNo": "EquipmentManagement",
          "menuName": "角色管理",
          "type": "1",
          // "icon": "ion:document",
          "orderNo": 2,
          "parentMenu": "System",
        },
        {
          "menuNo": "ProjectManagement",
          "menuName": "账号管理",
          "type": "1",
          // "icon": "ion:document",
          "orderNo": 3,
          "parentMenu": "System",
        },
        {
          "menuNo": "UploadExcel",
          "menuName": "导入数据",
          "type": "1",
          // "icon": "ion:document",
          "orderNo": 4,
          "parentMenu": "System",
        },
      ]
    },
    {
      "menuNo": "UserGuide",
      "menuName": "用户引导",
      "component": "LAYOUT",
      "icon": 'whh:paintroll',
      "type": "0",
      "orderNo": 41,
      "children": [
        {
          "menuNo": "UserGuideManagement",
          "menuName": "用户引导",
          "type": "1",
          // "icon": "ion:document",
          "orderNo": 1,
          "parentMenu": "UserGuide",
        },
      ]
    },
]

const allMenuLayerMap = getMenuNoLayerMap(allMenuBasicInfoList);

module.exports = {
  allMenuBasicInfoList,
  allMenuLayerMap,
}