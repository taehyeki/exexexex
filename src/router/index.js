import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from "vue-cookies";

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

              path: 'content/:id',
              name: 'content',
              component: () => import( '../views/main2Views/PermitContent.vue'),

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


  return next();

})

export default router
