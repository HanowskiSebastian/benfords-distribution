import { mount } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import BaseSection from "@/components/ui/BaseSection";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
  ],
});

test("test router", async () => {
  router.push("/");
  await router.isReady();
  const msg = "Benford's law";
  const wrapper = mount(Home, {
    global: {
      plugins: [router],
      stubs: {
        BaseSection,
      },
    },
  });
  expect(wrapper.text()).toContain(msg);
});
