import Vue from "vue";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/defaultViews/DefaultView.vue"),
    redirect: "/login",
    children: [
      {
        path: "admin",
        name: "admin",
        component: () => import("../views/defaultViews/AdminDefaultView.vue"),
        children: [
          {
            path: "main",
            name: "main",
            component: () =>
              import("../views/defaultViews/MainDefaultView.vue"),
            children: [
              {
                path: "person-emitter",
                name: "person-emitter",
                component: () => import("../views/defaultViews/PersonEmitterDefault.vue"),
                children: [
                  {
                    path: "list",
                    name: "person-emitter-list",
                    component: () => import("../views/mainViews/PersonEmitterList.vue"),
                  },
                  {
                    path: ":id",
                    name: "person-emitter-content",
                    component: () => import("../views/mainViews/PersonEmitterContent.vue"),
                  },
                ]
              },
              {
                path: "emitter-collector",
                name: "emitter-collector",
                component: () => import("../views/mainViews/EmitterCollectorList.vue"),
              },
              {
                path: "chart",
                name: "chart",
                component: () => import("../views/mainViews/ChartView.vue"),
              },
              {
                path: "emitter-collector/:id",
                name: "content",
                component: () =>
                  import("../views/mainViews/EmitterCollectorContent.vue"),
              },
              {
                path: "add-admin",
                name: "add-admin",
                component: () => import("../views/mainViews/addAdmin.vue"),
                // 최고 권한자만 들어갈 수 있도록 표시
                meta: { adminKing: true },
              },
              {
                path: "geo",
                name: "geo",
                component: () => import("../views/defaultViews/ChatDefaultView.vue"),
                children: [
                  {
                    path: "latlng",
                    name: "latlng",
                    component: () => import("../views/mainViews/LatLng.vue"),
                  },
                ]
              },
              {
                path: "emissions",
                name: "emissions",
                component: () =>
                  import("../views/defaultViews/EmissionsDefaultView.vue"),
                children: [
                  {
                    path: "list",
                    name: "emissions-list",
                    component: () => import("../views/mainViews/EmissionsList.vue"),
                  },
                  {
                    path: ":id",
                    name: "emissions-content",
                    component: () => import("../views/mainViews/EmissionsContent.vue"),
                  },
                ]
              },
              {
                path: "biddings",
                name: "biddings",
                component: () =>
                  import("../views/defaultViews/BiddingsDefaultView.vue"),
                children: [
                  {
                    path: "list",
                    name: "biddings-list",
                    component: () => import("../views/mainViews/BiddingsList.vue"),
                  },
                  {
                    path: ":id",
                    name: "biddings-content",
                    component: () => import("../views/mainViews/BiddingsContent.vue"),
                  },
                ]
              },
              {
                path: "transaction",
                name: "transaction",
                component: () =>
                  import("../views/defaultViews/TransActionDefaultView.vue"),
                children: [
                  {
                    path: "list",
                    name: "transaction-list",
                    component: () => import("../views/mainViews/TransActionList.vue"),
                  },
                  {
                    path: ":id",
                    name: "transaction-content",
                    component: () => import("../views/mainViews/TransActionContent.vue"),
                  },
                ]
              },
              {
                path: "report",
                name: "report",
                component: () =>
                  import("../views/defaultViews/ReportDefaultView.vue"),
                children: [
                  {
                    path: "list",
                    name: "report-list",
                    component: () => import("../views/mainViews/ReportList.vue"),
                  },
                  {
                    path: ":id",
                    name: "report-content",
                    component: () => import("../views/mainViews/ReportContent.vue"),
                  },
                ]
              },

            ],
          },
        ],
      },
      {
        path: "login",
        name: "login",
        component: () => import("../views/LoginView.vue"),
        meta: { unauthorized: true },
      },
      {
        path: "logout",
        name: "logout",
        component: () => import("../views/LogoutView.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  // console.log('라우터')
  if (to.matched.some((record) => record.meta.unauthorized)) {
    if (VueCookies.get("token")) {
      return next("/admin/main/emitter-collector");
    }
    return next();
  }
  if (to.name == "login" && VueCookies.get("token")) {
    return next("/admin/main/emitter-collector");
  }
  // 최고 권한자인지 라우터에서 판별,
  if (to.matched.some((record) => record.meta.adminKing)) {
    // 최고 권한자라면 들어갈 수 있도록
    if (store.getters["auth/canYouComeHere1"]) {
      next();
    } else {
      alert("권한이 없습니다.");
      return next(from);
    }
  }

  return next();
});

export default router;
