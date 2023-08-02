<template>
  <div
    :class="[
      'ms-combobox',
      'validateable',
      { 'is-display': isDisplay },
      { 'has-error': isError },
    ]"
    ref="combobox"
    v-outside="hideDropDown"
    @click.stop="showDropdown"
  >
    <label
      v-if="Label"
      for=""
      @mousedown.prevent=""
      :class="['label-combobox', { required: Required }]"
      ><slot></slot
    ></label>
    <div :class="['el-select', '' + Additional]" :style="widthComputed">
      <div
        :class="['el-input', 'el-input-suffix', isDisplay ? 'is-focus' : '']"
        @mouseover="showDelete"
        @mouseout="hideDelete"
      >
        <input
          @focus="showDropdownFocus"
          @blur="hideDropDown"
          @mousedown.prevent=""
          ref="comboboxInput"
          type="text"
          :class="['el-input-inner', '' + AdditionalInput]"
          autocomplete="off"
          :placeholder="placeholder"
          :readonly="!isDisplay"
          v-model="inputValue"
        />
        <span class="el-input-suffix-2">
          <div
            v-if="isShowDelete && NeedDelete"
            class="el-select-caret el-input-icon icon-delete"
            @click.stop="clearInput"
          ></div>
          <div
            v-else
            class="el-select-caret el-input-icon el-icon-arrow-up"
            @mousedown.prevent=""
          ></div>
        </span>
      </div>

      <div
        :class="['el-select-dropdown', ' el-popper']"
        :style="minWidthComputed"
      >
        <div class="el-scrollbar">
          <div class="el-scrollbar-wrap el-select-dropdown-wrap">
            <ul class="el-scrollbar-view el-select-dropdown-list">
              <li
                @mousedown="chooseValue(content)"
                v-for="content in computedContent"
                :class="[
                  'el-select-dropdown-item',
                  content == chosenValue ? 'selected' : '',
                  content == currentValue ? 'hover' : '',
                ]"
              >
                {{ content }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <span v-if="isError" class="error-message">Không được bỏ trống.</span>
  </div>
</template>

<script>
export default {
  name: "MISACombobox",
  props: [
    "Width",
    "Additional",
    "Label",
    "Required",
    "Content",
    "Placeholder",
    "NeedDelete",
    "AdditionalInput",
    "modelValue",
  ],
  emits: ["chooseValue", "update:modelValue"],
  data() {
    return {
      isDisplay: false,
      isShowDelete: false,
      chosenValue: "",
      placeholder: this.Placeholder,
      inputValue: "",
      isError: false,
    };
  },
  mounted() {
    this.chosenValue = this.modelValue;
  },
  watch: {
    /**
     * Kiểm tra trạng thái focus của combobox
     * @param {*} val boolean
     */
    isDisplay(val) {
      if (val == true) {
        this.$refs.comboboxInput.focus();
      } else {
        this.inputValue = "";
      }
    },

    /**
     * Emit giá trị được chọn trong list dropdown
     */
    chosenValue(val) {
      if (val) {
        this.placeholder = val;
      } else {
        this.placeholder = this.Placeholder;
      }
      this.$emit("update:modelValue", this.chosenValue);
    },

    /**
     * Kiểm tra giá trị nhận vào, nếu có trong list thì nhận, nếu k thì để về mặc định
     * @param {*} val Giá trị nhận vào của component cha gửi
     */
    modelValue(val) {
      if (val.length) {
        let newVal = this.Content.find((content) =>
          content.toLowerCase().includes(val.toLowerCase())
        );
        if (newVal) {
          this.chosenValue = newVal;
        } else {
          this.chosenValue = this.Content[0];
        }
      } else {
        this.chosenValue = "";
      }
    },

    /**
     * Gán giá trị ban đầu cho placeholder
     * @param {*} val giá trị ban đầu
     */
    Placeholder(val) {
      if (val) {
        this.chosenValue = val;
        this.placeholder = val;
      }
    },
  },
  computed: {
    /**
     * Độ rộng của combobox
     */
    widthComputed() {
      return "width:" + this.Width;
    },

    /**
     * Độ rộng của list dropdown
     */
    minWidthComputed() {
      return "min-width:" + this.Width;
    },

    /**
     * Các giá trị của list dropdown tùy theo giá trị ô input hiện tại (tìm kiếm)
     */
    computedContent() {
      let contentArray = this.Content.filter((value) =>
        value.toLowerCase().includes(this.inputValue.toLowerCase())
      );
      if (contentArray.length == 0) {
        return ["Không tìm thấy kết quả phù hợp"];
      } else {
        return contentArray;
      }
    },

    /**
     * Giá trị hiện tại được hover
     */
    currentValue() {
      if (this.computedContent.includes(this.chosenValue)) {
        return this.chosenValue;
      } else {
        return this.computedContent[0];
      }
    },
  },
  methods: {
    /**
     * Mở dropdown list
     */
    showDropdown() {
      this.isDisplay = !this.isDisplay;
    },

    /**
     * Focus vào input thì mở dropdown list
     */
    showDropdownFocus() {
      this.isDisplay = true;
    },

    /**
     * Đóng dropdown list
     */
    hideDropDown() {
      this.isDisplay = false;
    },

    /**
     * Hiện icon delete khi có giá trị
     */
    showDelete() {
      if (this.chosenValue.length) {
        this.isShowDelete = true;
      }
    },

    /**
     * Ẩn icon delete
     */
    hideDelete() {
      this.isShowDelete = false;
    },

    /**
     * Clear toàn bộ giá trị của input
     */
    clearInput() {
      this.isDisplay = false;
      this.chosenValue = "";
      this.$emit("update:modelValue", this.chosenValue);
    },

    /**
     * Chọn giá trị hiện tại trong dropdown list
     * @param {*} content Giá trị của 1 dropdown được chọn
     */
    chooseValue(content) {
      if (content == "Không tìm thấy kết quả phù hợp") {
        return;
      } else {
        this.chosenValue = content;
        this.isDisplay = false;
        this.inputValue = "";
      }
    },

    /**
     * Focus vào combobox
     */
    focus() {
      this.$refs.comboboxInput.focus();
    },
  },
};
</script>

<style scoped>
.ms-combobox {
  display: flex;
  flex-direction: column;
}
.label-combobox {
  min-width: max-content;
  margin-bottom: 4px;
  font-weight: 500;
  display: inline-block;

  font-size: 14px;
  line-height: 20px;

  color: #4e5b6a;
}
.ms-combobox.has-error .el-input .el-input-inner {
  border-color: #ff6161 !important;
}
.el-select .el-input.is-focus .el-input-inner {
  border-color: #8a6bf6;
}
.el-input.el-input-suffix .el-input-inner {
  padding-right: 34px;
}
.el-input .el-input__inner {
  padding-left: 12px;
  padding-right: 12px;
}
.el-input-suffix .el-input-inner {
  padding-right: 30px;
}
.el-select .el-input-inner {
  cursor: pointer;
  padding-right: 35px;
}
.el-input-inner {
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
.el-input-inner:focus {
  border-color: #8a6bf6;
}
.el-input-suffix-2 {
  position: absolute;
  height: 100%;
  right: 5px;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all 0.3s;
  z-index: 100;
}
.el-input-suffix-inner {
  pointer-events: all;
}
.el-select .el-input .el-select-caret {
  color: #4e5b6a;
  font-size: 14px;
  transition: transform 0.3s;
  transform: rotate(0deg);
  cursor: pointer;
}
.ms-combobox.is-display .el-select-caret:not(.icon-delete) {
  transform: rotate(-180deg);
}
.el-input-icon {
  width: 25px;
  line-height: 40px;
}
.el-input-icon,
.el-input-prefix {
  height: 100%;
  text-align: center;
  transition: all 0.3s;
}
.el-input-icon:after {
  content: "";
  height: 100%;
  width: 0;
  display: inline-block;
  vertical-align: middle;
}
.el-select-dropdown {
  display: none;
  border: none;
  position: absolute;
  z-index: 1001;
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
}
.ms-combobox.is-display .el-select-dropdown {
  display: block !important;
}
.el-select-dropdown.el-popper {
  max-width: -webkit-fill-available;
  max-width: stretch;
}
.el-select-dropdown-wrap {
  max-height: 274px;
}
.el-select-dropdown-list {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
}
.el-select-dropdown-item {
  padding: 8px 16px;
  height: inherit;
  line-height: inherit;
  font-size: 14px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  box-sizing: border-box;
  cursor: pointer;
}
.el-select-dropdown-item.hover {
  background-color: #ece7fe;
}
.el-select-dropdown-item:hover {
  background-color: #ece7fe;
}
.el-select-dropdown-item.selected {
  color: #8a6bf6;
}
.error-message {
  font-size: 14px;
  color: #ff6161;
}
</style>
