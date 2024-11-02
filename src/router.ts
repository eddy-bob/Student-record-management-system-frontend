import { createWebHistory, createRouter, Router } from "vue-router";
import NProgress from "nprogress";
import stores from "./stores";

// public pages
import homeView from "./pages/dashboard/Home.vue";

// auth pages
import Login from "./pages/auth/Signin.vue";

// admin pages
import AddAdmin from "./pages/dashboard/admin/AddAdmin.vue";
import AdminProfile from "./pages/dashboard/admin/AdminProfile.vue";
import ListAdmins from "./pages/dashboard/admin/AllAdmins.vue";

// courses pages
import AddCourse from "./pages/dashboard/course/AddCourse.vue";
import ListCourses from "./pages/dashboard/course/ListCourses.vue";

// results pages
import AddResult from "./pages/dashboard/result/AddResult.vue";
import ListResults from "./pages/dashboard/result/ListResults.vue";

// students pages
import AddStudent from "./pages/dashboard/student/AddStudent.vue";
import ListSudents from "./pages/dashboard/student/ListSudents.vue";
import StudentProfile from "./pages/dashboard/student/SingleStudent.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      requireAuth: false,
      layout: "AuthLayout",
      title: "Login",
      description: "Login as operator",
    },
  },
  {
    path: "/login",
    name: "Signin",
    meta: {
      layout: "AuthLayout",
      meta: {
        layout: "AuthLayout",
        requireAuth: false,
        title: "Login",
        description: "Login as operator",
      },
    },
    component: Login,
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: homeView,
    meta: {
      requireAuth: true,
      layout: "DashboardLayout",
      title: "Home",
      description: "Student record analytics",
    },
  },

  {
    path: "/add-operator",
    name: "AddOperator",
    component: AddAdmin,
    meta: {
      requireAuth: true,
      layout: "DashboardLayout",
      title: "Add Operator",
      description: "Create new operator",
    },
  },

  {
    path: "/operator-profile",
    name: "OperatorProfile",
    component: AdminProfile,
    meta: {
      requireAuth: true,
      layout: "DashboardLayout",
      title: "Admin Profile",
      description: "View administrator's profile",
    },
  },
  {
    path: "/list-operators",
    name: "ListOperator",
    component: ListAdmins,
    meta: {
      requireAuth: true,
      layout: "DashboardLayout",
      title: "View Admin",
      description: "View all operators",
    },
  },

  {
    path: "/add-course",
    name: "AddCourse",
    component: AddCourse,
    meta: {
      requireAuth: true,
      layout: "DashboardLayout",
      title: "Add Course",
      description: "Create new course",
    },
  },

  {
    path: "/list-courses",
    name: "ListCourse",
    component: ListCourses,
    meta: {
      requireAuth: true,
      layout: "DashboardLayout",
      title: "List Courses",
      description: "View all courses",
    },
  },

  {
    path: "/upload-results",
    name: "AddResult",
    component: AddResult,
    meta: { requireAuth: true, layout: "DashboardLayout" },
  },

  {
    path: "/list-results",
    name: "ListResults",
    component: ListResults,
    meta: {
      requireAuth: true,
      layout: "DashboardLayout",
      title: "Upload Result",
      description: "Upload new results",
    },
  },

  {
    path: "/add-student",
    name: "AddSudent",
    component: AddStudent,
    meta: {
      requireAuth: true,
      layout: "DashboardLayout",
      title: "Register Student",
      description: "Add new student record",
    },
  },
  {
    path: "/list-students",
    name: "ListStudents",
    component: ListSudents,
    meta: {
      requireAuth: true,
      layout: "DashboardLayout",
      title: "List Students",
      description: "Display all students",
    },
  },
  {
    path: "/student-profile/:id*",
    name: "StudentProfile",
    component: StudentProfile,
    meta: {
      requireAuth: true,
      layout: "DashboardLayout",
      title: "Student Profile",
      description: "View student profile",
    },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      layout: "MainLayout",
      requireAuth: false,
      title: "Not Found",
      description: "Not found page",
    },

    component: () => import("./pages/NotFound.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

//navigation guard
router.beforeEach(async (to) => {
  // initialize store
  const store = stores.useOperatorStore();
  if (!store.isAuthenticated && to.name !== "Signin" && to.meta.requireAuth) {
   
    router.replace(`/login?next=${to.fullPath}`);
  }
});

router.beforeEach((_, __, next: any) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
