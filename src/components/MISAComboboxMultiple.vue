<template>
  <div
    :class="['ms-combobox', 'validateable', { 'is-display': isDisplay }]"
    ref="combobox"
    v-outside="hideDropDown"
    @click.stop="showDropdown"
    @keydown="handleChangeTab"
  >
    <label
      @mousedown.prevent=""
      v-if="Label"
      for=""
      :class="['label-combobox', { required: Required }]"
      ><slot></slot
    ></label>
    <div :class="['el-select', '' + Additional]" :style="widthComputed">
      <div class="el-select-tags">
        <span style="display: contents">
          <template v-if="tags.length">
            <span v-for="tag in tags" class="custom-tag">
              <span class="tag-content">{{ tag }}</span>
              <div
                class="icon-close tag-icon"
                @click.stop="deleteTag(tag)"
              ></div>
            </span>
          </template>
        </span>
        <input
          type="text"
          class="el-select-input"
          autocomplete="off"
          ref="comboboxInput"
          v-model="inputValue"
          :readonly="!isDisplay"
          @focus="showDropdownFocus"
          @mousedown.prevent=""
        />
      </div>
      <div
        :class="['el-input', 'el-input-suffix', isDisplay ? 'is-focus' : '']"
        @mouseover="showDelete"
        @mouseout="hideDelete"
      >
        <input
          type="text"
          :class="['el-input-inner', '' + AdditionalInput]"
          autocomplete="off"
          :placeholder="placeholder"
          :readonly="!isDisplay"
          @focus="showDropdownFocus"
          @mousedown.prevent=""
        />
        <span class="el-input-suffix-2">
          <div
            v-if="isShowDelete && NeedDelete"
            class="el-select-caret el-input-icon icon-delete"
            @mousedown.prevent="clearInput"
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
                @click="chooseValue(content)"
                v-for="content in computedContent"
                :class="[
                  'el-select-dropdown-item',
                  containTag(content) ? 'selected' : '',
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
  </div>
</template>

<script>
export default {
  name: "MISAComboboxMultiple",
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
      currentValue: "",
      tags: [],
    };
  },
  mounted() {
    if (!this.NeedDelete) {
      this.chosenValue = this.Placeholder;
    }
    this.tags = this.modelValue;
  },
  watch: {
    isDisplay(val) {
      if (val == true) {
        this.$refs.comboboxInput.focus();
      } else {
        this.inputValue = "";
      }
    },
    tags: {
      handler(val) {
        if (val.length) {
          this.placeholder = "";
        } else {
          this.placeholder = this.Placeholder;
        }
        this.$emit("chooseValue", this.tags);
      },
      deep: true,
    },
    inputValue(val) {
      if (val.length) {
        this.placeholder = "";
      } else if (!val.length && !this.tags.length) {
        this.placeholder = this.Placeholder;
      }
    },
    modelValue: {
      handler(val) {
        this.tags = val;
        this.$emit("chooseValue", this.tags);
      },
      deep: true,
    },
  },
  computed: {
    widthComputed() {
      return "width:" + this.Width;
    },
    minWidthComputed() {
      return "min-width:" + this.Width;
    },

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
    currentValue() {
      if (this.computedContent.includes(this.chosenValue)) {
        return this.chosenValue;
      } else {
        return this.computedContent[0];
      }
    },
  },
  methods: {
    showDropdown() {
      console.log("show");
      this.isDisplay = !this.isDisplay;
    },
    showDropdownFocus() {
      this.isDisplay = true;
    },
    hideDropDown() {
      this.isDisplay = false;
    },
    showDelete() {
      if (this.tags.length) {
        this.isShowDelete = true;
      }
    },
    hideDelete() {
      this.isShowDelete = false;
    },
    containTag(tag) {
      return this.tags.includes(tag);
    },
    clearInput() {
      this.isDisplay = false;
      this.inputValue = "";
      this.tags = [];
      this.isShowDelete = false;
    },
    deleteTag(tag) {
      let index = this.tags.indexOf(tag);
      if (index > -1) {
        this.tags.splice(index, 1);
      }
      this.inputValue = "";
    },
    chooseValue(content) {
      if (content == "Không tìm thấy kết quả phù hợp") {
        return;
      } else {
        if (this.tags.includes(content)) {
          this.deleteTag(content);
        } else {
          this.tags.push(content);

          this.inputValue = "";
        }
        this.isDisplay = false;
      }
    },
    handleChangeTab(event) {
      if (event.keyCode === 9) {
        // "Tab" key (key code 9) was pressed
        if (event.shiftKey) {
          this.hideDropDown();
        } else {
          this.hideDropDown();
        }
      }
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
.el-select .el-input.is-focus .el-input-inner {
  border-color: #8a6bf6;
}
.el-select-tags {
  width: 100%;
  max-width: 420px;
  position: absolute;
  line-height: normal;
  white-space: normal;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.el-select-input {
  flex-grow: 1;
  width: 0%;
  max-width: 410px;
  border: none;
  outline: none;
  padding: 0;
  margin-left: 15px;
  color: #666;
  font-size: 14px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 28px;
  background-color: transparent;
}
.custom-tag {
  background-color: #f1f2f7;
  color: #4e5b6a;
  height: 32px;
  line-height: 30px;
  font-size: 14px;
  box-sizing: border-box;
  margin: 2px 0 2px 6px;
  border-radius: 10px !important;
  -webkit-user-select: none;
  user-select: none;
  border: 1px solid #b6b9ce;
  display: inline-block;
  padding: 0 10px;
  white-space: nowrap;
}
.tag-content {
  max-width: 377px;
  vertical-align: bottom;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
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
.el-select-dropdown-item.selected::after {
  content: "";
  position: absolute;
  background: url("../assets/imgs/sprites.06b14dc5.svg") no-repeat -196px -30px;
  width: 16px;
  height: 12px;
  right: 12px;
  top: 50%;
  transform: translateY(-50%) scale(0.8);
  filter: hue-rotate(450deg);
}
.tag-icon {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-left: 6px;
  transform: scale(1.1);
  cursor: pointer;
}
</style>
