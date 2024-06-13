import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/MainPage.vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { getToken } from '@/tools/cache'

NProgress.configure({
  showSpinner: false
})
/**
 * 路由配置说明
 * isHidden 不显示该路由
 * onlyShowChild 设置子路由为一级路由
 * isActiveParent 子路由的详情打开，是否激活父级路由选中效果；
 * 详情路由必须在主路由path全场后面追加path名称。例：主路由ptah：/Home/index，详情/Home/index/detail
 */
const routes = [
  { path: '/', isHidden: true, redirect: '/Home/index' },
  {
    path: '/Home',
    name: 'Home',
    component: MainPage,
    redirect: '/Home/index',
    meta: {
      icon: 'icon iconfont icon-cangchucangku',
      title: '首页',
      onlyShowChild: false
    },
    children: [
      {
        path: '/Home/index',
        name: 'HomeIndex',
        component: () => import('@/views/Home/HomeIndex.vue'),
        meta: {
          title: '首页子菜单',
          icon: 'icon iconfont icon-dicengjiagou'
        }
      },
      {
        path: '/Home/index/detail',
        name: 'HomeMain',
        component: () => import('@/views/Home/HomeDetail.vue'),
        meta: {
          title: '详情',
          icon: 'icon iconfont icon-cangchucangku',
          isActiveParent: true,
          isHidden: true
        }
      }
    ]
  },
  {
    path: '/Test',
    name: 'Test',
    component: MainPage,
    redirect: '/Test/index',
    meta: {
      icon: 'icon iconfont icon-gongchang',
      title: '测试'
    },
    children: [
      {
        path: '/Test/index',
        name: 'TestIndex',
        component: () => import('@/views/Test/TestIndex.vue'),
        meta: {
          title: '测试',
          icon: 'icon iconfont icon-jishufuwu',
          isHidden: true
        }
      },
      {
        path: '/Test/TestMain',
        name: 'TestMain',
        component: () => import('@/views/Test/TestMain.vue'),
        meta: {
          title: '测试1',
          icon: 'icon iconfont icon-dingdan'
        }
      }
    ]
  }
]
if (import.meta.env.MODE === 'development') {
  routes.push({
    path: '/SvgView',
    name: 'SvgView',
    redirect: '/SvgView/index',
    component: MainPage,
    meta: {
      title: 'SvgView',
      onlyShowChild: true
    },
    children: [
      {
        path: '/SvgView/index',
        name: 'SvgViewIndex',
        component: () => import('@/views/SvgView/index.vue'),
        meta: {
          title: 'SVG图标',
          icon: 'icon iconfont icon-cangchucangku',
          isActiveParent: true
        }
      }
    ]
  })
}
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!getToken()) {
    // 跳转到登录
    next()
  } else {
    //token实效跳转到登录
    next()
    NProgress.start()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
