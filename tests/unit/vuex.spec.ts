import {Store} from "vuex";

describe("Vuex", () => {
  it("defines a store", async () => {
    const store = await import("@/store/index");
    expect(store.default).toBeInstanceOf(Store);
  });
});
