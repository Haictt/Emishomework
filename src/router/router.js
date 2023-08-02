import { createRouter, createWebHistory } from "vue-router";
import HomeworkPage from "../views/pages/homework/HomeworkPage.vue";
import TrainingPage from "../views/pages/training/TrainingPage.vue";
import DashboardPage from "../views/pages/dashboard/DashboardPage.vue";
import ClassroomPage from "../views/pages/classroom/ClassroomPage.vue";
import NotFoundPage from "../views/pages/NotFoundPage.vue";
import HomeworkCreate from "../views/pages/homework/HomeworkCreate.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/lms/teacher/homework",
      name: "homework",
      component: HomeworkPage,
    },
    {
      path: "/lms/teacher/homework/create",
      name: "create",
      component: HomeworkCreate,
      children: [
        {
          path: ":id",
          name: "update",
          component: HomeworkCreate,
          props: true,
        },
      ],
    },

    {
      path: "/lms/teacher/dashboard",
      name: "dashbord",
      component: DashboardPage,
    },
    {
      path: "/lms/teacher/training",
      name: "training",
      component: TrainingPage,
    },
    {
      path: "/lms/teacher/classroom",
      name: "classroom",
      component: ClassroomPage,
    },
    {
      path: "/",
      redirect: {
        name: "homework",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFoundPage,
      name: "not-found-page",
      meta: {
        fullPage: true,
      },
    },
  ],
});

export default router;
