<template>
  <div :class="['toast', toast[Type].icon]">
    <div class="border-wrap">
      <div class="border-inner"></div>
    </div>
    <div :class="['toast-icon', 'icon-toast-' + toast[Type].icon]"></div>
    <div class="toast-content">
      <div class="content-inner">{{ toast[Type].msg }}</div>
    </div>
    <div class="toast-close" ref="close" @click="closeToast"></div>
  </div>
</template>

<script>
import Toast from "../js/base/locale/VN/homework/toast.js";
import { toastStore } from "../js/base/toaststore";
import { mapActions, mapState } from "pinia";
export default {
  name: "MISAToast",
  props: ["Type"],
  emits: ["closeToast"],
  data() {
    return {
      toast: Toast,
      time: {
        success: 3000,
        warning: 5000,
        error: 5000,
      },
    };
  },
  mounted() {
    /**
     * Tự xóa toast sau lượng thời gian cố định
     */
    setTimeout(() => {
      this.$emit("closeToast");
    }, this.time[this.toast[this.Type].icon]);
  },
  computed: {
    ...mapState(toastStore, ["toastArray"]),
  },
  methods: {
    ...mapActions(toastStore, ["resetToast"]),

    /**
     * Gửi đi event đóng toast 
     */
    closeToast() {
      this.$emit("closeToast");
    },
  },
};
</script>

<style scoped>
.toast {
  top: 16px;
  z-index: 2710;
  transform: translateX(-50%);
  left: 50%;
  width: 500px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  overflow: hidden;
}
.border-wrap {
  width: 3px;
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.border-inner {
  border-radius: 1.5px;
  height: 32px;
  width: 100%;
}
.toast.error .border-inner {
  background-color: #ff6161;
}
.toast.success .border-inner {
  background-color: #089740;
}
.toast.warning .border-inner {
  background-color: #ffd200;
}
.toast-icon {
  min-width: 30px;
  background-repeat: no-repeat;
  background-position: 50%;
}
.icon-toast-error {
  background-image: url(https://sisapapp.misacdn.net/lms/img/ic_error.0c55381a.svg);
}
.icon-toast-success {
  background-image: url(https://sisapapp.misacdn.net/lms/img/ic_success.d741d4af.svg);
}
.icon-toast-warning {
  background-image: url(https://sisapapp.misacdn.net/lms/img/ic_warning.950c46da.svg);
}
.toast-content {
  flex-grow: 1;
  margin: 0 20px;
}
.content-inner {
  margin: 0;
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 14px;
  line-height: 21px;
  color: #606266;
  text-align: justify;
}
.toast-close {
  min-width: 24px;
  background: url(https://sisapapp.misacdn.net/lms/img/ic_close.bd87de46.svg)
    no-repeat 50%;
  cursor: pointer;
}
</style>
