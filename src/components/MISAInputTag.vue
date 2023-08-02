<template>
  <div
    class="relative flex-row input-tag w-full"
    @click="getFocus"
    v-outside="loseFocus"
    @keydown.enter.prevent="loseFocus"
  >
    <span v-if="!tags.length && !inputValue.length" class="placeholder absolute"
      >Nhập đáp án rồi nhấn Enter...</span
    >
    <template v-if="tags.length">
      <span v-for="tag in tags" class="custom-tag" :title="tag">
        {{ tag }}
        <div class="icon-close tag-icon" @click.stop="deleteTag(tag)"></div
      ></span>
    </template>
    <span
      class="new-tag"
      contenteditable="true"
      ref="input"
      @input="handleInput"
    ></span>
  </div>
</template>

<script>
export default {
  name: "MISAInputTag",
  props: ["Answer"],
  emits: ["getInputTagAnswer"],
  data() {
    return {
      isFocus: false,
      inputValue: "",
      tags: [],
    };
  },
  mounted() {
    /**
     * Gán giá trị ban đầu
     */
    if (this.Answer.AnswerContent.length) {
      this.tags = this.Answer.AnswerContent.split(";");
    }
  },
  watch: {
    /**
     * Truyền đi giá trị input hiện tại nếu có thay đổi
     */
    tags: {
      handler(val) {
        this.$emit("getInputTagAnswer", val);
      },
      deep: true,
    },
  },
  methods: {
    /**
     * Focus vào input
     */
    getFocus() {
      this.$refs.input.focus();
      this.isFocus = true;
    },

    /**
     * Khi bỏ focus khỏi input thì gán giá trị vào input (kiểm tra tồn tại luôn)
     */
    loseFocus() {
      this.isFocus = false;
      let content = this.$refs.input.innerText;
      if (content.length) {
        if (!this.tags.includes(content)) {
          this.tags.push(content);
        }
        this.$refs.input.innerText = "";
        this.inputValue = "";
      }
    },

    /**
     * Lấy giá trị của input hiện tại
     * @param {*} event giá trị của input
     */
    handleInput(event) {
      // Update the spanContent data property with the new text
      this.inputValue = event.target.innerText;
    },

    /**
     * Xóa 1 tag khỏi input
     * @param {*} tag Tag cần xóa
     */
    deleteTag(tag) {
      let index = this.tags.indexOf(tag);
      if (index > -1) {
        this.tags.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.input-tag {
  align-items: center;
  flex-wrap: wrap;
  padding-right: 46px;
  border: 1px solid #b6b9ce;
  padding: 4px 4px 0;
  border-radius: 10px;
  min-height: 42px;
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
}
.placeholder {
  transform: translateY(0) !important;
  user-select: none;
  color: rgba(164, 166, 183, 1);
}
.disable .placeholder {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
.input-tag:focus-within {
  border-color: #8a6bf6;
}
.new-tag {
  display: inline-block;
  height: 32px;
  max-height: 32px;
  line-height: 32px;
  min-width: 20px;
  flex-grow: 1;
  font-size: 14px;
  margin-bottom: 4px;
  z-index: 2;
}
.new-tag:focus {
  outline: none;
}
.custom-tag {
  background-color: #f1f2f7;
  margin-right: 4px;
  margin-bottom: 4px;
  color: #4e5b6a;
  height: 32px;
  line-height: 30px;
  font-size: 14px;
  border-radius: 10px !important;
  border: 1px solid #b6b9ce;
  display: inline-block;
  padding: 0 10px;
  box-sizing: border-box;
  white-space: nowrap;
  user-select: none;
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
