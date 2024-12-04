import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/data-entry',
    component: Layout,
    meta: { 
      title: '数据管理',
      icon: 'form',
      roles: ['workshop'] // 车间主任可访问
    },
    children: [
      {
        path: 'production',
        name: 'Production',
        component: () => import('@/views/data-entry/production'),
        meta: { title: '生产数据录入', roles: ['workshop'] }
      },
      {
        path: 'worktime',
        name: 'Worktime',
        component: () => import('@/views/data-entry/worktime'),
        meta: { title: '工时录入', roles: ['workshop'] }
      }
    ]
  },
  {
    path: '/transfer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Transfer',
        component: () => import('@/views/transfer/index'),
        meta: { 
          title: '借调管理',
          icon: 'peoples',
          roles: ['workshop'] 
        }
      }
    ]
  },
  {
    path: '/salary',
    component: Layout,
    meta: {
      title: '工资管理',
      icon: 'money',
      roles: ['workshop', 'leader', 'admin']
    },
    children: [
      {
        path: 'details',
        name: 'SalaryDetails',
        component: () => import('@/views/salary/details'),
        meta: { title: '工资明细', roles: ['workshop', 'leader', 'admin'] }
      },
      {
        path: 'calculation',
        name: 'SalaryCalculation',
        component: () => import('@/views/salary/calculation'),
        meta: { title: '工资核算', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    meta: {
      title: '报表管理',
      icon: 'chart',
      roles: ['leader', 'admin']
    },
    children: [
      {
        path: 'production',
        name: 'ProductionReport',
        component: () => import('@/views/report/production'),
        meta: { title: '生产报表', roles: ['leader', 'admin'] }
      },
      {
        path: 'efficiency',
        name: 'EfficiencyReport',
        component: () => import('@/views/report/efficiency'),
        meta: { title: '效率报表', roles: ['leader', 'admin'] }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'setting',
      roles: ['admin']
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user'),
        meta: { title: '用户管理', roles: ['admin'] }
      },
      {
        path: 'workshop',
        name: 'Workshop',
        component: () => import('@/views/system/workshop'),
        meta: { title: '车间管理', roles: ['admin'] }
      },
      {
        path: 'product',
        name: 'Product',
        component: () => import('@/views/system/product'),
        meta: { title: '产品管理', roles: ['admin'] }
      }
    ]
  },
  
  // 404页面必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
