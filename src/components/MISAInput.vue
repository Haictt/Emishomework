<template>
  <div :class="['ms-text-field', 'validateable', { 'has-error': isError }]">
    <label
      v-if="Label"
      for=""
      :class="[{ required: Required }, 'label-text-field']"
      ><slot></slot
    ></label>
    <div class="ms-input">
      <input
        type="text"
        autocomplete="off"
        placeholder="Nhập tên bài tập..."
        class="input-inner"
        :value="modelValue"
        @input="this.$emit('update:modelValue', $event.target.value)"
        ref="input"
      />
    </div>
    <span v-if="isError" class="error-message">Không được bỏ trống.</span>
  </div>
</template>

<script>
export default {
  name: "MISAInput",
  props: ["Label", "Required", "modelValue"],
  emits: ["update:modelValue"],
  data() {
    return {
      isError: false,
    };
  },
  methods: {
    /**
     * Focus vào input hiện tại
     */
    focus() {
      this.$refs.input.focus();
    },
  },
  watch: {
    /**
     * Kiểm tra giá trị của input hiện tại, nếu có thì bỏ hiện lỗi
     */
    modelValue(val) {
      if (val) {
        this.isError = false;
      }
    },
  },
};
</script>

<style scoped>
.ms-text-field {
  display: flex;
  flex-direction: column;
  vertical-align: top;
  font-weight: 500;
}
.label-text-field {
  min-width: max-content;
  margin-bottom: 4px !important;
  font-weight: 500;
  display: inline-block;
  font-size: 14px;
  line-height: 20px;
  color: #4e5b6a;
}
.ms-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.ms-text-field.has-error .input-inner {
  border-color: #ff6161 !important;
}
.ms-input .input-inner {
  padding-left: 12px;
  padding-right: 12px;
}
.input-inner:focus {
  outline: none;
  border-color: #8a6bf6;
}
.input-inner {
  background-color: #fff;
  background-image: none;
  border-radius: 10px;
  border: 1px solid #b6b9ce;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.error-message {
  font-size: 14px;
  color: #ff6161;
}
</style>
