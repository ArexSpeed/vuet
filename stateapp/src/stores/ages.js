import { defineStore } from "pinia";

export const useAgesStore = defineStore("ages", {
  state: () => {
    return {
      ages: [20, 23, 45, 34, 51],
    };
  },
  actions: {
    addAge(age) {
      this.ages.push(age);
    },
  },
  getters: {
    doubleAge: (state) => {
      return state.ages.map((age) => age * 2);
    },
  },
});
