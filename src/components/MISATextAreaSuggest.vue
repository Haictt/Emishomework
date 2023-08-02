<template>
  <div
    class="ms-textarea-suggest"
    ref="textarea"
    @click="getFocus"
    v-outside="loseFocus"
    @keydown.enter.prevent="loseFocus"
  >
    <label
      v-if="Label"
      for=""
      :class="[{ required: Required }, 'label-textarea-suggest']"
      ><slot></slot
    ></label>
    <div v-if="Suggest.length" class="suggest-container">
      <span
        v-for="tag in Suggest"
        :class="['suggest-tag', isChosenSuggestTag(tag) ? 'selected' : '']"
        @click="chooseSuggestTag(tag)"
        >{{ tag }}</span
      >
    </div>
    <div class="textarea-suggest-input relative">
      <template v-if="hasTag">
        <span v-for="tag in tags" class="custom-tag" :title="tag">
          {{ tag }}
          <div class="icon-close tag-icon" @click.stop="deleteTag(tag)"></div
        ></span>
      </template>
      <span class="placeholder absolute"></span>
      <span contenteditable="true" class="new-tag" ref="input"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MISATextAreaSuggest",
  props: ["Label", "Required", "Suggest", "modelValue"],
  emits: ["chooseTag", "update:modelValue"],
  data() {
    return {
      isFocus: false,
      hasTag: false,
      tags: [],
    };
  },
  mounted() {
    this.tags = this.modelValue;
  },
  watch: {
    /**
     * Kiếm tra các tag hiện tại, gửi đi giá trị đó luôn
     */
    tags: {
      handler(val) {
        if (val.length) {
          this.hasTag = true;
        } else {
          this.hasTag = false;
        }
        this.$emit("chooseTag", val);
      },
      deep: true,
    },

    /**
     * Kiểm tra giá trị nhận vào từ cha, nếu có thì thêm vào tag
     */
    modelValue: {
      handler(val) {
        this.tags = val;
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    /**
     * Focus vào input
     */
    getFocus() {
      this.$refs.input.focus();
      this.isFocus = true;
    },

    /**
     * Bỏ focus khỏi input, thêm giá trị vào tag nếu có (check trùng luôn)
     */
    loseFocus() {
      this.isFocus = false;
      let content = this.$refs.input.innerText;
      if (content.length) {
        if (!this.tags.includes(content)) {
          this.tags.push(content);
        }
        this.$refs.input.innerText = "";
      }
    },

    /**
     * Xóa 1 tag 
     * @param {*} tag tag cần xóa
     */
    deleteTag(tag) {
      let index = this.tags.indexOf(tag);
      if (index > -1) {
        this.tags.splice(index, 1);
      }
    },

    /**
     * Kiểm tra tag gợi ý đã được chọn chưa
     * @param {*} tag tag gợi ý được chọn
     */
    isChosenSuggestTag(tag) {
      return this.tags.includes(tag);
    },

    /**
     * Thêm 1 tag gợi ý vào tag list được chọn
     * @param {*} tag Chọn 1 tag gợi ý và thêm vào tag hiện tại
     */
    chooseSuggestTag(tag) {
      if (this.tags.includes(tag)) {
        let index = this.tags.indexOf(tag);
        if (index > -1) {
          this.tags.splice(index, 1);
        }
      } else {
        this.tags.push(tag);
      }
    },
  },
};
</script>

<style scoped>
.ms-textarea-suggest {
  font-weight: 500;
}
.label-textarea-suggest {
  margin-bottom: 4px;
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #4e5b6a;
}
.textarea-suggest-input {
  height: 72px;
  padding: 4px;
  border-color: #b6b9ce;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  overflow-y: auto;
  scrollbar-width: thin;
  border: 1px solid #b6b9ce;
  border-radius: 10px;
  min-height: 42px;
}
.textarea-suggest-input .place-holder {
  font-weight: 400;
  color: rgba(164, 166, 183, 1);
  user-select: none;
  font-size: 14px;
  line-height: 20px;
  transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1)
    scaleY(1);
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
.new-tag:focus {
  outline: none;
}
.suggest-container {
  display: flex;
  flex-wrap: wrap;
  max-height: 80px;
  overflow: hidden;
  margin-bottom: 4px;
}
.suggest-tag {
  margin: 0 8px 8px 0;
  cursor: pointer;
  color: #4e5b6a;
  height: 32px;
  line-height: 30px;
  font-size: 14px;
  border-radius: 10px !important;
  user-select: none;
  background-color: #fff;
  border: 1px solid #b6b9ce;
  display: inline-block;
  padding: 0 10px;
  box-sizing: border-box;
  white-space: nowrap;
}
.suggest-tag.selected {
  background-color: #f1f2f7;
}
</style>
