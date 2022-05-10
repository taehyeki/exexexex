import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from "vue-cookies";
import store from "@/store"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import( '../views/defaultViews/DefaultView.vue'),
    redirect : '/login',
    children : [
      {
        path: 'admin',
        name: 'admin',
        component: () => import( '../views/defaultViews/AdminDefaultView.vue'),
        children : [
          {
          path: 'main',
          name: 'main',
          component: () => import( '../views/defaultViews/MainDefaultView.vue'),
          children : [
            {
            path: 'index',
            name: 'index',
            component: () => import( '../views/mainViews/MainIndexView.vue'),

            },
            {
              path: 'permit',
              name: 'permit',
              component: () => import( '../views/mainViews/mainChildViews/PermitView.vue'),

            }
          ]
          },
          {
          path: 'main2',
          name: 'main2',
          component: () => import( '../views/defaultViews/Main2DefaultView.vue'),
          children : [
            {

              path: 'permit2',
              name: 'permit2',
              component: () => import( '../views/main2Views/Permit2View.vue'),

            },
            {

              path: 'chart',
              name: 'chart',
              component: () => import( '../views/main2Views/ChartView.vue'),

            },
            {

              path: 'content/:id',
              name: 'content',
              component: () => import( '../views/main2Views/PermitContent.vue'),

            },
            {

              path: 'add-admin',
              name: 'content',
              component: () => import( '../views/main2Views/addAdmin.vue'),
              // 최고 권한자만 들어갈 수 있도록 표시
              meta: { adminKing : true },
            }
          ]
          }

        ]
      },
      {
        path: 'login',
        name: 'login',
        component: () => import( '../views/LoginView.vue'),
        meta: { unauthorized : true },
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import( '../views/LogoutView.vue'),
      }

    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( async(to, from, next) => {
  // console.log('라우터')
  if (to.matched.some(record => record.meta.unauthorized) ){
    if (VueCookies.get('token')){
      return next('/admin/main2/permit2');
    }
    return next();
  }
  if (to.name == 'login' && VueCookies.get('token')){
    return next('/admin/main2/permit2');
  }
  // 최고 권한자인지 라우터에서 판별,
  if (to.matched.some(record => record.meta.adminKing)){
    // 최고 권한자라면 들어갈 수 있도록
    if (store.getters['auth/canYouComeHere1']){
      next()
    }else {
      alert('권한이 없습니다.')
      return next(from);
    }
  }

  return next();

})

export default router
