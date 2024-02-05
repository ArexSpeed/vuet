import { createRouter, createWebHistory } from "vue-router";
import QuizesView from "@/views/QuizesView.vue";
import QuizView from "@/views/QuizView.vue";
import AboutView from "@/views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "quizes",
      component: QuizesView,
    },
    {
      path: "/quiz/:id",
      name: "quiz",
      component: QuizView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
  ],
});

export default router;
