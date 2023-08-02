<template>
  <div id="ckquestion" :style="Height">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      style=""
    ></ckeditor>
  </div>
</template>

<script>
import "ckeditor5-custom-build/build/ckeditor";
import { questionStore } from "../js/base/questionstores.js";
import { mapState, mapActions } from "pinia";

// import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
export default {
  props: ["QuestionType"],
  emits: ["update:modelValue"],
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        placeholder: "Nhập câu hỏi tại đây...",
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
      },
    };
  },
  mounted() {
    this.editorData = this.chosenQuestionContent;
  },
  watch: {
    editorData(val) {
      this.patchCurrentQuestion(val);
    },
    chosenQuestionContent(val) {
      this.editorData = val;
    },
  },

  computed: {
    ...mapState(questionStore, ["chosenQuestionContent"]),

    /**
     * Lấy độ cao của question input tùy thuộc vào loại câu hỏi
     */
    Height() {
      if (this.QuestionType == 4) {
        return "height:" + "calc(100% - 40px)";
      } else {
        return "height:" + "50%";
      }
    },
  },
  methods: {
    ...mapActions(questionStore, ["patchCurrentQuestion"]),
  },
};
</script>
<style>
.ck .ck-toolbar__items {
  justify-content: flex-end;
}
.ck.ck-editor {
  height: 100% !important;
}
.ck.ck-editor__main {
  height: 100%;
}
.ck.ck-editor__main > .ck-editor__editable {
  width: 100%;
  background: #fff2ab !important;
}
.ck.ck-toolbar {
  background: #fff2ab !important;
}
.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
  border-color: #fff2ab !important;
}
.ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
  border: 1px solid #fff2ab !important;
  box-shadow: none !important;
}
.ck.ck-editor__editable {
  padding: 0 24px !important;
  font-size: 16px !important;
  height: 100%;
  max-height: 100%;
}
.ck.ck-toolbar .ck.ck-toolbar__separator {
  display: none !important;
}
.ck .ck-placeholder::before {
  color: rgba(164, 166, 183, 1) !important;
}
.ck.ck-button:not(.ck-disabled):hover > .ck-button__label {
  visibility: visible;
  opacity: 1;
}

.ck.ck-button:not(.ck-dropdown__button) > .ck-button__label {
  transition: opacity 0.2s ease-in-out 0.2s;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  padding: 0 4px;
  text-overflow: ellipsis;
  border: 1px solid #ffffff99;
  background: #333;
  color: #fff !important;
  position: absolute;
  visibility: hidden;
  opacity: 0;
  display: block !important;
  border-radius: 10px;
  text-align: center !important;
}

.ck.ck-button:not(.ck-dropdown__button) > .ck-button__label::after {
  content: "";
  position: absolute;
  pointer-events: none;
  top: calc(5px * -1 + 1px);
  transform: translateX(-50%);
  border-left-color: transparent;
  border-bottom-color: #333;
  border-right-color: transparent;
  border-top-color: transparent;
  border-left-width: 5px;
  border-bottom-width: 5px;
  border-right-width: 5px;
  border-top-width: 0;
  transition: opacity 0.2s ease-in-out 0.2s;
  border-style: solid;
  left: 50%;
  width: 0;
  height: 0;
}
.ck-content img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  box-shadow: 10px 10px 30px #00000078;
}
</style>
