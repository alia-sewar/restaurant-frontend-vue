/* eslint-disable no-unused-vars */
import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import NProgress from "nprogress/nprogress.js";

// Main layout variations
import LayoutSimple from "@/layouts/variations/Simple.vue";
import LoginLanding from "@/views/auth/SignInView.vue";
import LayoutBackend from "@/layouts/variations/Backend.vue";
import LayoutLanding from "@/layouts/variations/Landing.vue";

// Frontend: Landing
const Login = () => import("@/views/auth/SignInView.vue");

// Auth
const AuthSignIn = () => import("@/views/auth/SignInView.vue");
const AuthLock = () => import("@/views/auth/LockView.vue");
const AuthReminder = () => import("@/views/auth/ReminderView.vue");

// Errors
const Error400 = () => import("@/views/errors/400View.vue");
const Error401 = () => import("@/views/errors/401View.vue");
const Error403 = () => import("@/views/errors/403View.vue");
const Error404 = () => import("@/views/errors/404View.vue");
const Error500 = () => import("@/views/errors/500View.vue");
const Error503 = () => import("@/views/errors/503View.vue");

// Dashboard
const Dashboard= () => import("@/views/backend/DashboardView.vue");


    
//Item
const ItemsList =() =>import("@/views/items/ItemsList.vue");
//Category
const CategoriesList= () =>import("@/views/categories/CategoriesList.vue");
//Sub Category
const SubCategoriesList= () =>import("@/views/sub-categories/SubCategoriesList.vue");
// Set all routes
const routes = [
    /*
  |
  |--------------------------------------------------------------------------
  | Landing Routes
  |--------------------------------------------------------------------------
  | 
  */
    {
        path: "/",
        component: LayoutLanding,
        children: [
            {
                path: "",
                name: "landing",
                component: AuthSignIn,
            },
        ],
    },
    {
        path: "/dashboard",
        component: LayoutBackend,
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: Dashboard,
            },
        ],
    },



  /*
  |
  |--------------------------------------------------------------------------
  |  Category
  |--------------------------------------------------------------------------
  |
  */
    {
        path: "/categories",
        component: LayoutBackend,
        children: [
            {
                path: "list",
                name: "category-list",
                component: CategoriesList,
            },
        ],
    },

  /*
  |
  |--------------------------------------------------------------------------
  |  Sub Category
  |--------------------------------------------------------------------------
  |
  */
    {
        path: "/sub-categories",
        component: LayoutBackend,
        children: [
            {
                path: "sub-categories",
                name: "sub-categories",
                component: SubCategoriesList,
            },
        ],
    },
    /*
  |
  |--------------------------------------------------------------------------
  |  Items
  |--------------------------------------------------------------------------
  |
  */
    {
        path: "/items",
        component: LayoutBackend,
        children: [
            {
                path: "items",
                name: "item-list",
                component: ItemsList,
            },
        ],
    },
/*
  |
  |--------------------------------------------------------------------------
  | Auth Routes
  |--------------------------------------------------------------------------
  |
  */
    {
        path: "/auth",
        component: LayoutSimple,
        children: [
            {
                path: "signin",
                name: "auth-signin",
                component: AuthSignIn,
            },

            {
                path: "lock",
                name: "auth-lock",
                component: AuthLock,
            },

            {
                path: "reminder",
                name: "auth-reminder",
                component: AuthReminder,
            },
        ],
    },

    /*
  |
  |--------------------------------------------------------------------------
  | Error Routes
  |--------------------------------------------------------------------------
  |
  */
    {
        path: "/errors",
        component: LayoutSimple,
        children: [
            {
                path: "400",
                name: "error-400",
                component: Error400,
            },
            {
                path: "401",
                name: "error-401",
                component: Error401,
            },
            {
                path: "403",
                name: "error-403",
                component: Error403,
            },
            {
                path: "404",
                name: "error-404",
                component: Error404,
            },
            {
                path: "500",
                name: "error-500",
                component: Error500,
            },
            {
                path: "503",
                name: "error-503",
                component: Error503,
            },
        ],
    },
];

// Create Router
const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: "active",
    linkExactActiveClass: "",
    scrollBehavior() {
        return { left: 0, top: 0 };
    },
    routes: routes,
});

// redirect to login page if not logged in and trying to access a restricted page
router.beforeEach(async (to) => {
    const publicPages = ["/auth/signin"];
    const authRequired = !publicPages.includes(to.path);
    const userStore = useUserStore();

    if (authRequired && !userStore.token) {
        return "/auth/signin";
    }
});

// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }

    next();
});

router.afterEach(() => {
    NProgress.done();
});
/*eslint-enable no-unused-vars*/

export default router;
