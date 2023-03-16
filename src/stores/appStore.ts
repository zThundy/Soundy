import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => {
    return {
      dataFrom: 'client',
      test: "client-side"
    }
  }
});