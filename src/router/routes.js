
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
        meta: { transitionName: 'slide-fade', title: 'Profile', back: 'dashboard-user',url: 'activity' , icon: 'dashboard' , showToolBar: true, showButtonNav: true },
        path: "dashboard",
        name: "member-dashboard",
        component: () => import("pages/user/dashboard.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Profile', back: 'dashboard-user',url: 'profile' , icon: 'account_circle' , showToolBar: true, showButtonNav: true },
        path: "profile",
        name: "member-profile",
        component: () => import("pages/common/profile.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Payments', back: 'dashboard-user', url: 'payment' , icon: 'account_balance_wallet', showToolBar: true, showButtonNav: true },
        path: "payments",
        name: "payment-user",
        component: () => import("pages/user/payments.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Permit', back: 'dashboard-user',url: 'permit' , icon: 'workspace_premium', showToolBar: true, showButtonNav: true },
        path: "permit",
        name: "permit-user",
        component: () => import("pages/user/permit.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Invoice', back: 'dashboard-user', url: 'invoice' , icon: 'receipt', showToolBar: true, showButtonNav: true },
        path: "invoice",
        name: "user-invoice",
        component: () => import("pages/user/invoice.vue"),
      }
      ]
  },
  // admin
  {
    path: '/admin',
    component: () => import('layouts/admin.vue'),
    children: [
      {
        meta: { transitionName: 'slide-fade', title: 'Dashboard', back: 'dashboard-admin',url: '' , icon: 'dashboard', showToolBar: true, showButtonNav: true },
        path: "dashboard",
        name: "dashboard-admin",
        component: () => import("pages/admin/dashboard.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Profile', back: 'dashboard-admin', url: 'profile' ,icon: 'account_circle', showToolBar: true, showButtonNav: true },
        path: "profile",
        name: "admin-profile",
        component: () => import("pages/common/profile.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Permits', back: 'dashboard-admin', url: 'permit' , icon: 'workspace_premium', showToolBar: true, showButtonNav: true },
        path: "permits",
        name: "permits-admin",
        component: () => import("pages/admin/permits.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Payments', back: 'dashboard-admin',url: 'paymentType' , icon: 'account_balance', showToolBar: true, showButtonNav: true },
        path: "payment_types",
        name: "payment-admin",
        component: () => import("pages/admin/payment-types.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Activities', back: 'dashboard-admin', url: 'activity' , icon: 'event', showToolBar: true, showButtonNav: true },
        path: "activities",
        name: "activities-admin",
        component: () => import("pages/admin/activities.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Payments', back: 'dashboard-admin', url: 'payment' , icon: 'account_balance_wallet', showToolBar: true, showButtonNav: true },
        path: "payments",
        name: "transactions-admin",
        component: () => import("pages/admin/payments.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Member', back: 'dashboard-admin', url: 'staff' , icon: 'groups', showToolBar: true, showButtonNav: true },
        path: "members",
        name: "members-admin",
        component: () => import("pages/admin/members.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Staff', back: 'dashboard-admin', url: 'staff' , icon: 'person', showToolBar: true, showButtonNav: true },
        path: "staff",
        name: "staff-admin",
        component: () => import("pages/admin/staff.vue"),
      },
      {
        meta: { transitionName: 'slide-fade', title: 'Invoice', back: 'dashboard-user', url: 'invoice' , icon: 'receipt', showToolBar: true, showButtonNav: true },
        path: "invoice",
        name: "admin-invoice",
        component: () => import("pages/admin/invoice.vue"),
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
