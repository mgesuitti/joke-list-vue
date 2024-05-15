import { shallowMount } from "@vue/test-utils";
import HomeDashboard from "@/components/HomeDashboard.vue";

describe("HomeDashboard.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HomeDashboard, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
