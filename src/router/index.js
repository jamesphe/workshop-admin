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
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

export const asyncRoutes = [
  {
    path: '/basic-info',
    component: Layout,
    meta: { title: '基础信息管理', icon: 'el-icon-user' },
    children: [
      {
        path: 'teacher-info',
        component: () => import('@/views/basic-info/teacher-info/index'),
        name: 'TeacherInfo',
        meta: { title: '教师一张表' }
      },
      {
        path: 'teacher-info/detail/:id',
        component: () => import('@/views/basic-info/teacher-info/detail'),
        name: 'TeacherDetail',
        meta: { title: '教师详情', activeMenu: '/basic-info/teacher-info' },
        hidden: true
      },
      {
        path: 'student-info',
        component: () => import('@/views/basic-info/student-info/index'),
        name: 'StudentInfo',
        meta: { title: '学生一张表' }
      },
      {
        path: '/basic-info/student-info/detail/:id',
        component: () => import('@/views/basic-info/student-info/detail'),
        name: 'StudentDetail',
        meta: { title: '学生详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/student-affairs',
    component: Layout,
    meta: { title: '学生服务', icon: 'el-icon-s-custom' },
    children: [
      {
        path: 'activities',
        component: () => import('@/views/student-affairs/activities/index'),
        name: 'StudentActivities',
        meta: { title: '活动管理' }
      },
      {
        path: 'associations',
        component: () => import('@/views/student-affairs/associations/index'),
        name: 'StudentAssociations',
        meta: { title: '社团管理' }
      },
      {
        path: 'evaluation',
        component: () => import('@/views/student-affairs/evaluation/index'),
        name: 'StudentEvaluation',
        meta: { title: '综合测评' }
      },
      {
        path: 'leave',
        component: () => import('@/views/student-affairs/leave/index'),
        name: 'StudentLeave',
        meta: { title: '请销假管理' }
      }
    ]
  },
  {
    path: '/personnel',
    component: Layout,
    meta: { title: '教师考核', icon: 'el-icon-s-check' },
    children: [
      {
        path: 'assessment',
        component: () => import('@/views/personnel/assessment/index'),
        name: 'TeacherAssessment',
        meta: { title: '教职工考核管理' }
      },
      {
        path: 'performance',
        component: () => import('@/views/personnel/performance/index'),
        name: 'PerformanceAnalysis',
        meta: { title: '绩效分析' }
      }
    ]
  },
  {
    path: '/party-building',
    component: Layout,
    meta: { title: '党建思政', icon: 'el-icon-s-flag' },
    children: [
      {
        path: 'organization',
        component: () => import('@/views/party-building/organization/index'),
        name: 'PartyOrganization',
        meta: { title: '党组织管理' }
      },
      {
        path: 'member-development',
        component: () => import('@/views/party-building/member-development/index'),
        name: 'MemberDevelopment',
        meta: { title: '党员发展' }
      },
      {
        path: 'activities',
        component: () => import('@/views/party-building/activities/index'),
        name: 'PartyActivities',
        meta: { title: '党员学习与活动' }
      },
      {
        path: 'ideology',
        component: () => import('@/views/party-building/ideology/index'),
        name: 'Ideology',
        meta: { title: '思政工作' }
      }
    ]
  },
  {
    path: '/research',
    component: Layout,
    meta: { title: '科研管理', icon: 'el-icon-s-management' },
    children: [
      {
        path: 'projects',
        component: () => import('@/views/research/projects/index'),
        name: 'ResearchProjects',
        meta: { title: '科研项目管理' }
      },
      {
        path: 'achievements',
        component: () => import('@/views/research/achievements/index'),
        name: 'ResearchAchievements',
        meta: { title: '科研成果管理' }
      },
      {
        path: 'activities',
        component: () => import('@/views/research/activities/index'),
        name: 'AcademicActivities',
        meta: { title: '学术活动管理' }
      }
    ]
  },
  {
    path: '/cooperation',
    component: Layout,
    meta: { title: '校企合作', icon: 'el-icon-s-cooperation' },
    children: [
      {
        path: 'projects',
        component: () => import('@/views/cooperation/projects/index'),
        name: 'CooperationProjects',
        meta: { title: '合作项目管理' }
      },
      {
        path: 'enterprises',
        component: () => import('@/views/cooperation/enterprises/index'),
        name: 'EnterpriseInfo',
        meta: { title: '企业信息库' }
      },
      {
        path: 'courses',
        component: () => import('@/views/cooperation/courses/index'),
        name: 'CooperationCourses',
        meta: { title: '合作课程开发' }
      }
    ]
  },
  {
    path: '/assets',
    component: Layout,
    meta: { title: '后勤资产管理', icon: 'el-icon-s-goods' },
    children: [
      {
        path: 'register',
        component: () => import('@/views/assets/register/index'),
        name: 'AssetsRegister',
        meta: { title: '资产登记' }
      },
      {
        path: 'maintenance',
        component: () => import('@/views/assets/maintenance/index'),
        name: 'AssetsMaintenance',
        meta: { title: '资产维护' }
      },
      {
        path: 'scrap',
        component: () => import('@/views/assets/scrap/index'),
        name: 'AssetsScrap',
        meta: { title: '资产报废' }
      }
    ]
  },
  {
    path: '/union',
    component: Layout,
    meta: { title: '工会', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'members',
        component: () => import('@/views/union/members/index'),
        name: 'UnionMembers',
        meta: { title: '会员管理' }
      },
      {
        path: 'activities',
        component: () => import('@/views/union/activities/index'),
        name: 'UnionActivities',
        meta: { title: '活动组织' }
      },
      {
        path: 'welfare',
        component: () => import('@/views/union/welfare/index'),
        name: 'UnionWelfare',
        meta: { title: '福利管理' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
