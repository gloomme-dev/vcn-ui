
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Index.vue') },
      { path: 'Login', name: 'login', component: () => import('pages/login.vue') },
      {
        meta: { transitionName: 'slide-fade', title: 'Register', back: 'dashboard-user', showToolBar: true, showButtonNav: true },
        path: "register",
        name: "register",
        component: () => import("pages/register.vue"),
      },
      { path: 'test', name: 'test', component: () => import('pages/test.vue') }
    ]
  },
  // user routes
  {
    path: '/user',
    component: () => import('layouts/user.vue'),
    children: [
      {
        meta: { transitionName: 'slide-fade', title: 'Profile', back: 'dashboard-user', icon: 'dashboard' , showToolBar: true, showButtonNav: true },
        path: "dashboard",
        name: "dashboard-user",
        component: () => import("pages/user/dashboard.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Profile', back: 'dashboard-user', icon: 'account_circle' , showToolBar: true, showButtonNav: true },
        path: "profile",
        name: "member-profile",
        component: () => import("pages/common/profile.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Permit', back: 'dashboard-user', icon: 'workspace_premium', showToolBar: true, showButtonNav: true },
        path: "permit",
        name: "permit",
        component: () => import("pages/user/permit.vue"),
      }
      ]
  },
  // admin
  {
    path: '/admin',
    component: () => import('layouts/admin.vue'),
    children: [
      {
        meta: { transitionName: 'slide-fade', title: 'Dashboard', back: 'dashboard-admin', icon: 'dashboard', showToolBar: true, showButtonNav: true },
        path: "dashboard",
        name: "dashboard-admin",
        component: () => import("pages/admin/dashboard.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Profile', back: 'dashboard-admin', icon: 'account_circle', showToolBar: true, showButtonNav: true },
        path: "profile",
        name: "admin-profile",
        component: () => import("pages/common/profile.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Permits', back: 'dashboard-admin', icon: 'workspace_premium', showToolBar: true, showButtonNav: true },
        path: "permits",
        name: "permits-admin",
        component: () => import("pages/admin/permits.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Member', back: 'dashboard-admin', icon: 'groups', showToolBar: true, showButtonNav: true },
        path: "members",
        name: "members-admin",
        component: () => import("pages/admin/members.vue"),
      }
      ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
