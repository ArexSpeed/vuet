import { defineStore } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => groupBy(state.items, (item) => item.name),
    groupCount: (state) => (name) => state.grouped[name].length,
    total: (state) => state.items.reduce((p, c) => p + c.price, 0),
  },
  actions: {
    checkout() {
      const authUserStore = useAuthUserStore();
      alert(
        `${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`
      );
    },
    addItems(count, item) {
      count = parseInt(count);
      for (let i = 0; i < count; i++) {
        this.items.push({ ...item });
      }
    },
  },
});
