//orderNo保证同层比较就行了
// TODO:其实这里最好是：从数据库中查出所有路由配备信息，然后再封装成如下格式才对
/** 这是全量的菜单简易信息, 只有超级管理员才能获取, 为了分配给角色的 */
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
  //因为只有超级管理员才有这俩权限啊, 所以超级管理员不能把这俩权限分配给其他角色
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
        "menuNo": 'AccountDetail',
        "menuName": '账号管理详情',
        "type": "1",
        "hiddenMenu": true,
        "orderNo": 2,
        "parentMenu": "Permission",
      },
      {
        "menuNo": "RoleManagement",
        "menuName": "角色管理",
        "type": "1",
        // "icon": "ion:document",
        "orderNo": 11,
        "parentMenu": "Permission",
      },
      {
        "menuNo": 'RoleDetail',
        "menuName": '角色管理详情',
        "type": "1",
        "hiddenMenu": true,
        "orderNo": 12,
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
        "menuName": "工位管理",
        "type": "1",
        // "icon": "ion:document",
        "orderNo": 1,
        "parentMenu": "System",
      },
      {
        "menuNo": 'StationDetail',
        "menuName": '工位管理详情',
        "type": "1",
        "hiddenMenu": true,
        "orderNo": 2,
        "parentMenu": "System",
      },
      {
        "menuNo": "EquipmentManagement",
        "menuName": "设备管理",
        "type": "1",
        // "icon": "ion:document",
        "orderNo": 11,
        "parentMenu": "System",
      },
      {
        "menuNo": 'EquipmentDetail',
        "menuName": '设备管理详情',
        "type": "1",
        "hiddenMenu": true,
        "orderNo": 12,
        "parentMenu": "System",
      },
      {
        "menuNo": "ProjectManagement",
        "menuName": "项目管理",
        "type": "1",
        // "icon": "ion:document",
        "orderNo": 21,
        "parentMenu": "System",
      },
      {
        "menuNo": 'ProjectDetail',
        "menuName": '项目管理详情',
        "type": "1",
        "hiddenMenu": true,
        "orderNo": 22,
        "parentMenu": "System",
      },
      {
        "menuNo": "UploadExcel",
        "menuName": "导入数据",
        "type": "1",
        // "icon": "ion:document",
        "orderNo": 31,
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


const getMenuLayerMap = (allMenuBasicInfoList) => {
  const map = new Map();
  map.set('firstLayerToSecondLayer', {});
  map.set('secondLayerToFirstLayer', {});
  const firstLayerToSecondLayer = map.get('firstLayerToSecondLayer');
  const secondLayerToFirstLayer = map.get('secondLayerToFirstLayer');
  for(const menu of allMenuBasicInfoList){
    const menuNo = menu.menuNo;
    if(!firstLayerToSecondLayer[menuNo]){
      firstLayerToSecondLayer[menuNo] = [];
    }
    if(menu.children && menu.children.length > 0){
      for(const subMenu of menu.children){
        if(!secondLayerToFirstLayer[subMenu.menuNo]){
          secondLayerToFirstLayer[subMenu.menuNo] = subMenu.parentMenu;
          firstLayerToSecondLayer[menuNo].push(subMenu.menuNo);
        }
      }
    }
  }
  console.log('getMenuLayerMap 已完成', firstLayerToSecondLayer, secondLayerToFirstLayer);
  return map;
}


/** menuList是[string], 格式化成前端需要的数据传给前端
 * 注意！！['DashBoard']要把它和它所有子路由也加进来
 * 但是！！['DashBoard', 'WorkBench']就只能加dashboard和它的其中一个子路由workbench; 但是前端不会传递这种参数传上来, 只有子路由全满, 才有父路由
 */
const getForFrontEndMenuList = (menuList, allMenuLayerMap, allUserMenuInfo) => {
  const newMenuList = [];
  const firstLayer = allMenuLayerMap.get('firstLayerToSecondLayer');
  const secondLayer = allMenuLayerMap.get('secondLayerToFirstLayer');
  let allIsFirstLayerMenu = true;//假设全都是一级路由
  const cacheParentMenuNameList = [];
  for(const name of menuList){
    const menu = allUserMenuInfo.find(menu => menu.name === name);
    if(firstLayer[name]){
      const newMenu = {...menu};
      if(!newMenu.children){
        newMenu.children = [];
      }
      const hasMenu = newMenuList.find(newMenu => newMenu.name === name);
      if(!hasMenu){//新表中没有的话才加进去
        newMenuList.push(newMenu);
      }
    }else if(secondLayer[name]){
      allIsFirstLayerMenu = false;
      const parentMenuName = menu.parentMenu;
      //如果当前表里没有父路由name, 则将父亲加入newMenuList; cache防止后面的子路由也走了这个逻辑
      if(!menuList.includes(parentMenuName) && !cacheParentMenuNameList.includes(parentMenuName)){
        cacheParentMenuNameList.push(parentMenuName);
        const parentMenu = allUserMenuInfo.find(menu => menu.name === parentMenuName);
        const newParentMenu = {...parentMenu};
        if(!newParentMenu.children){
          newParentMenu.children = [];
        }
        newMenuList.push(newParentMenu);
      }
      //二级路由先找到该父路由, 然后判断其子路由里是否加入过当前路由
      let parentMenuInNew = newMenuList.find(newMenu => newMenu.name === parentMenuName);
      if(menuList.includes(parentMenuName) && !parentMenuInNew){
        //参数表中有父路由, 但是尚未同步到newMenuList时, 就把父路由加进新表中
        parentMenuInNew = allUserMenuInfo.find(menu => menu.name === parentMenuName);
        if(!parentMenuInNew.children){
          parentMenuInNew.children = [];
        }
        newMenuList.push(parentMenuInNew);
      }
      const hasExistsSubMenu = parentMenuInNew.children.find(subMenu => subMenu.name === name);
      !hasExistsSubMenu && parentMenuInNew.children.push({...menu});
    }
  }

  //如果当前列表全是一级路由, 则把其相应全部子路由也加进来
  if(allIsFirstLayerMenu){
    menuList.forEach((name) => {
      const curMenu = allUserMenuInfo.find(curMenu => curMenu.name === name);
      const curSubMenuList = firstLayer[curMenu.name].map(name => {
        return allUserMenuInfo.find(userMenu => userMenu.name === name);
      });
      const newMenu = newMenuList.find(newMenu => newMenu.name === name);//这是newMenuList里的父路由
      newMenu.children = curSubMenuList;
    });
  }
//这种情况我没处理,TODO: [一级路由A(尤指A下有子路由, 且子路由都包括, 但是这个数组里没子路由，这是不合理的格式), 一级路由B，二级路由Bb];
  console.log('getForFrontEndMenuList已完成');
  return newMenuList;
}


const allMenuLayerMap = getMenuLayerMap(allMenuBasicInfoList);

//如果有二级菜单no但没有其父级菜单no, 则将父级menoNo也加进来
const formatToStringMenuNoList = (stringMenuList, allMenuLayerMap) => {3
  const newStringMenuList = [...stringMenuList];
  const firstLayerToSecondLayer = allMenuLayerMap.get('firstLayerToSecondLayer');
  const secondLayerToFirstLayer = allMenuLayerMap.get('secondLayerToFirstLayer');
  for(const stringMenuNo of newStringMenuList){
    const tempMenuNo = secondLayerToFirstLayer[stringMenuNo];
    if((tempMenuNo) && (!newStringMenuList.includes(tempMenuNo)) && (firstLayerToSecondLayer[tempMenuNo])){
      newStringMenuList.push(tempMenuNo);
    }
  }
  return newStringMenuList;
}

module.exports = {
  allMenuBasicInfoList,
  allMenuLayerMap,
  getForFrontEndMenuList,
  formatToStringMenuNoList,//这个暂时没用到
}