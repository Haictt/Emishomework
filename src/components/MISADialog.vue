<template>
  <div class="dialog-overlay flex-center">
    <div class="dialog-container">
      <div class="dialog-header">
        <div class="dialog-title">EMIS Ôn tập</div>
      </div>
      <div class="dialog-content">
        <div class="dialog-msg">
          <slot></slot>
        </div>
      </div>
      <div class="dialog-btns flex-row">
        <template v-if="Type == 'confirm'">
          <Button
            Type="secondary"
            Color="default"
            Additional="mr-3"
            @click="closeDialog"
            >Hủy bỏ</Button
          >
          <Button Type="primary" Color="gradient" @click="confirmDialog"
            >Xóa</Button
          >
        </template>
        <template v-else-if="Type == 'warn'">
          <Button Type="primary" Color="gradient" @click="closeDialog"
            >Đồng ý</Button
          >
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISADialog",
  props: ["Type"],
  emits: ["closeDialog", "confirmDialog"],
  methods: {
    /**
     * Đóng dialog
     */
    closeDialog() {
      this.$emit("closeDialog");
    },

    /**
     * Xác nhận khi bấm vào button chính
     */
    confirmDialog() {
      this.$emit("confirmDialog");
    },
  },
};
</script>

<style scoped>
.dialog-overlay {
  z-index: 2654;
  text-align: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}
.dialog-container {
  padding: 0;
  min-width: 414px;
  display: inline-block;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
  vertical-align: middle;
}
.dialog-header {
  padding: 10px 16px;
  background-color: #eaebf5;
  position: relative;
}
.dialog-title {
  padding-left: 0;
  margin-bottom: 0;
  font-size: 18px;
  line-height: 1;
  color: #303133;
}

.dialog-content {
  padding: 24px 24px 0;
  color: #606266;
  font-size: 14px;
}
.dialog-msg {
  color: #4e5b6a;
}
.dialog-btns {
  padding: 24px;
  text-align: right;
  justify-content: flex-end;
}
</style>
