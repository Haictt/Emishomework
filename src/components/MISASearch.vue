<template>
  <div
    class="text-field validateable"
    @mouseover="checkInputOnIn"
    @mouseout="checkInputOnOut"
    v-outside="loseFocus"
  >
    <div class="text-field-input">
      <input
        type="text"
        ref="input"
        class="text-field-input-inner"
        autocomplete="off"
        placeholder="Nhập tên học liệu để tìm kiếm"
        :value="modelValue"
        @focus="getFocus"
        @keydown.enter="handleSearch"
        @change="this.$emit('update:modelValue', $event.target.value)"
        @blur="handleSearch"
      />
      <span class="text-field-prefix">
        <img
          width="16"
          height="16"
          src="https://sisapapp.misacdn.net/lms/img/icon_search.0273bbde.svg"
          alt=""
          class="icon-search"
        />
      </span>
      <span class="text-field-suffix">
        <div
          v-if="isShowDelete"
          class="text-field-suffix-inner relative icon-delete"
          @click.stop="clearInput"
        ></div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISASearch",
  props: ["modelValue"],
  emits: ["update:modelValue", "search"],
  data() {
    return {
      isShowDelete: false,
      isFocus: false,
    };
  },
  watch: {
    /**
     * Kiểm tra trạng thái focus của input, nếu focus mà giá trị thì show icon delete
     * @param {*} focus trạng thái hiện tại
     */
    isFocus(focus) {
      if (focus == true) {
        this.$refs.input.focus();
        if (this.modelValue.length) {
          this.isShowDelete = true;
        } else {
          this.isShowDelete = false;
        }
      } else {
        this.isShowDelete = false;
      }
    },

    /**
     * Kiểm tra giá trị nhận vào từ component cha, hiện delete icon nếu có giá trị
     */
    modelValue(value) {
      if (value.length) {
        this.isShowDelete = true;
      } else {
        this.isShowDelete = false;
      }
    },
  },
  methods: {
    /**
     * Clear toàn bộ input
     */
    clearInput() {
      this.$emit("update:modelValue", "");
      this.isFocus = true;
      this.$refs.input.focus();
    },

    /**
     * Focus vào input
     */
    getFocus() {
      this.isFocus = true;
    },

    /**
     * Bỏ focus khỏi input
     */
    loseFocus() {
      this.isFocus = false;
    },

    /**
     * Gửi đi event tìm kiếm
     */
    handleSearch() {
      this.$emit("search");
    },
  },
};
</script>

<style scoped>
.text-field-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.text-field-input-inner {
  padding-right: 34px;
  padding-left: 34px;
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
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.text-field-input-inner:focus {
  outline: none;
  border-color: #8a6bf6;
}
.text-field-input-inner:hover {
  border-color: #8a6bf6;
}
.text-field-prefix {
  left: 6px;
  height: 100%;
  text-align: center;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  color: #c0c4cc;
}
.text-field-suffix {
  position: absolute;
  height: 100%;
  right: 5px;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all 0.3s;
}
.text-field-suffix-inner {
  color: #4e5b6a;
  font-size: 14px;
  transition: transform 0.3s;
  transform: rotate(0deg);
  cursor: pointer;
  height: 100%;
  height: 100%;
  text-align: center;
  width: 25px;
  line-height: 40px;
}
.icon-search {
  height: 100%;
  margin: 0 4px;
}
</style>
