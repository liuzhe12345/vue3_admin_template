//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  {
    //登录成功以后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    //404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Platform',
    },
  },
]

//异步路由
export const asnycRoute = [
  {
    path: '/map',
    component: () => import('@/views/map/Map.vue'),
    name: 'Map',
    meta: {
      title: '地图',
      icon: 'MapLocation',
    },
    redirect: '/map/fence',
    children: [
      {
        path: '/map/fence',
        component: () => import('@/views/map/fence/index.vue'),
        name: 'Fence',
        meta: {
          title: '电子围栏',
          icon: 'Crop',
        },
      },
      {
        path: '/map/position',
        component: () => import('@/views/map/position/index.vue'),
        name: 'Position',
        meta: {
          title: '实时定位',
          icon: 'Position',
        },
      },
      {
        path: '/map/path',
        component: () => import('@/views/map/path/index.vue'),
        name: 'Path',
        meta: {
          title: '路径规划',
          icon: 'Sort',
        },
      },
    ],
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '信息管理',
      icon: 'ChatLineSquare',
    },
    redirect: '/acl/user',
    children: [
     {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '学生管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '设备管理',
          icon: 'Watch',
        },
      },
      {
        path: '/acl/dormitory',
        component: () => import('@/views/acl/dormitory/index.vue'),
        name: 'Dormitory',
        meta: {
          title: '宿舍管理',
          icon: 'House',
        },
      },
      {
        path: '/acl/car',
        component: () => import('@/views/acl/car/index.vue'),
        name: 'Car',
        meta: {
          title: '车辆分配',
          icon: 'Bicycle',
        },
      },
      
    ],
  },
  //教学辅助
  {
    path: '/teach',
    component: () => import('@/layout/index.vue'),
    name: 'Teach',
    meta: {
      title: '教学辅助',
      icon: 'Avatar',
    },
    redirect: '/teach/garde',
    children: [
      {
        path: '/teach/grade',
        component: () => import('@/views/teach/garde/index.vue'),
        name: 'Grade',
        meta: {
          title: '平时分管理',
          icon: 'Document',
        },
      },
      {
        path: '/teach/point',
        component: () => import('@/views/teach/point/index.vue'),
        name: 'Point',
        meta: {
          title: '考勤管理',
          icon: 'Checked',
        },
      },
    ],
  },
  //教学资源
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '教学资源',
      icon: 'Files',
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '教学视频',
          icon: 'VideoPlay',
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '教学文件',
          icon: 'FolderOpened',
        },
      },
      
      //   path: '/product/spu',
      //   component: () => import('@/views/product/spu/index.vue'),
      //   name: 'Spu',
      //   meta: {
      //     title: 'SPU管理',
      //     icon: 'Calendar',

      //   path: '/product/sku',
      //   component: () => import('@/views/product/sku/index.vue'),
      //   name: 'Sku',
      //   meta: {
      //     title: 'SKU管理',
      //     icon: 'Orange',
  
    ],
  }
]

//任意路由
export const anyRoute = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: 'DataLine',
  },
}
