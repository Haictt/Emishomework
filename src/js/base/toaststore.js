import { defineStore } from "pinia";

/**
 * Store quản lý Toast 
 */
export const toastStore = defineStore({
  id: "toast",
  state: () => ({
    toastArray: [],
  }),
  actions: {
    /**
     * Thêm toast vào list toast
     */
    addToast(type) {
      this.toastArray.unshift({ type: type, id: Date.now() });
    },

    /**
     * Xóa 1 toast theo id
     * @param {*} id id toast
     */
    deleteToast(id) {
      let index = this.toastArray.findIndex((toast) => toast.id == id);
      if (index !== -1) {
        this.toastArray.splice(index, 1);
      }
    },

    /**
     * reset store
     */
    resetToast() {
      this.toastArray = [];
    },
  },
});
