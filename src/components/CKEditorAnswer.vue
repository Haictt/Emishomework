<template>
  <div id="ckanswer" :class="{ 'is-focus': isFocused }">
    <ckeditor
      @focus="focusThis"
      @blur="loseFocus"
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      style=""
      @input="$emit('update:modelValue', editorData)"
    ></ckeditor>
  </div>
</template>

<script>
import "ckeditor5-custom-build/build/ckeditor";

// import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
export default {
  emits: ["update:modelValue"],
  props: ["modelValue"],
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        placeholder: "Nhập đáp án...",
        toolbar: ["bold", "italic", "underline"],
      },
      isFocused: false,
    };
  },
  watch: {
    modelValue(val) {
      this.editorData = val;
    },
  },
  methods: {
    /**
     * Hàm focus vào input
     */
    focusThis() {
      this.isFocused = true;
    },

    /**
     * Hàm bỏ focus
     */
    loseFocus() {
      this.isFocused = false;
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
#ckanswer * {
  font-family: "Nunito", sans-serif;
}
#ckanswer {
  border-radius: 10px;

  background-color: transparent;
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-width: thin;
  transition: 0.2s;
  width: 100%;
  display: inline-block;
  position: relative;
  text-align: center;
  height: 100%;
}
#ckanswer.is-focus {
  background-color: #fff;
  border-color: #f59ad4 !important;
  border: 3px solid;
}
#ckanswer .ck-placeholder {
  position: absolute;
  top: 50%;
  margin-top: -14px;
  width: 150px;
  text-align: center;
  left: 50%;
  margin-left: -75px;
  cursor: text;
  color: rgba(78, 91, 106, 0.7);
}
#ckanswer .ck.ck-toolbar {
  border: none !important;

  opacity: 0;
  transition: opacity 0.3s;
}
#ckanswer.is-focus .ck.ck-toolbar {
  opacity: 1;
}
#ckanswer .ck.ck-button {
  max-width: 22px !important;
  max-height: 24px !important;
  /* min-height: 0 !important;
  min-width: 0 !important; */
}
#ckanswer .ck .ck-toolbar__items {
  justify-content: flex-end;
}
#ckanswer .ck.ck-editor {
  height: 100% !important;
}
#ckanswer .ck.ck-editor__main {
  height: calc(100% - 40px);
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#ckanswer .ck.ck-editor__main > .ck-editor__editable {
  width: 100%;
  background: transparent !important;
  min-height: 20px !important;
  font-size: 18px;
  cursor: text;
  text-align: center;
  overflow: unset;
  width: 100%;
}
#ckanswer .ck.ck-toolbar {
  background: transparent !important;
}
#ckanswer .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
  border-color: transparent !important;
}
#ckanswer .ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable) {
  border: 1px solid transparent !important;
  box-shadow: none !important;
}
#ckanswer .ck.ck-editor__editable {
  padding: 0 24px !important;
  font-size: 16px !important;
  height: 100%;
  max-height: 100%;
}
#ckanswer .ck.ck-toolbar .ck.ck-toolbar__separator {
  display: none !important;
}
#ckanswer .ck .ck-placeholder::before {
  color: rgba(164, 166, 183, 1) !important;
}
#ckanswer .ck.ck-button:not(.ck-disabled):hover > .ck-button__label {
  visibility: visible;
  opacity: 1;
}

#ckanswer .ck.ck-button:not(.ck-dropdown__button) > .ck-button__label {
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

#ckanswer .ck.ck-button:not(.ck-dropdown__button) > .ck-button__label::after {
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
#ckanswer .ck-content .image img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  box-shadow: 10px 10px 30px #00000078;
}
#ckanswer .ck.ck-editor__main > .ck-editor__editable {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
#ckanswer .ck.ck-editor__main > .ck-editor__editable > p {
}
</style>
