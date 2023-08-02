<template>
  <div class="overlay">
    <div
      class="dialog compose-dialog"
      aria-modal="true"
      role="dialog"
      aria-label="dialog"
    >
      <div class="dialog-body">
        <form action="" class="h-full dialog-form">
          <div class="dialog-content h-full">
            <div class="number-no">
              {{ questionResource.Hint.No }} {{ Index }}
            </div>
            <CKEditorHint v-model="questionHint"></CKEditorHint>
          </div>
        </form>
      </div>
      <div class="dialog-footer">
        <div class="footer-toolbar w-full flex-center absolute">
          <div class="left-flex"></div>
          <div>
            <Button
              Type="secondary"
              Color="default"
              Additional="mr-3"
              @click="goToQuestionPopup"
              >{{ questionResource.Hint.CancelBtn }}</Button
            >

            <Button Type="primary" Color="gradient" @click="saveHint">{{
              questionResource.Hint.SaveBtn
            }}</Button>
          </div>
        </div>
      </div>
    </div>
    <HomeworkBackToQuestion
      @goToQuestionPopup="goToQuestionPopup"
    ></HomeworkBackToQuestion>
  </div>
</template>

<script>
import CKEditorHint from "../../../components/CKEditorHint.vue";
import HomeworkBackToQuestion from "./HomeworkBackToQuestion.vue";
import QuestionResource from "../../../js/base/locale/VN/homework/question.js";
export default {
  name: "homework-question-hint-popup",
  components: {
    CKEditorHint,
    HomeworkBackToQuestion,
  },
  props: ["Index", "Hint"],
  emits: ["goToQuestionPopup", "saveHint"],
  data() {
    return {
      questionHint: "",
      questionResource: QuestionResource,
    };
  },
  mounted() {
    /**
     * Gán lời giải khi khởi tạo
     */
    this.questionHint = this.Hint;
  },
  methods: {
    /**
     * Gửi đi event trở về popup thêm câu hỏi
     */
    goToQuestionPopup() {
      this.$emit("goToQuestionPopup");
    },

    /**
     * Gửi đi event lưu lời giải hiện tại
     */
    saveHint() {
      this.$emit("saveHint", this.questionHint);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
.overlay {
  z-index: 2122;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
  scrollbar-width: thin;
}
.dialog {
  margin: 24px auto 0;
  width: 1576px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
  height: calc(100vh - 104px);
  margin-bottom: 0;
  background-color: #fff2ab;
  position: relative;

  background: #fff;
}
.compose-dialog * {
  font-family: "Nunito", sans-serif;
}
.compose-dialog .dialog-body {
  border-radius: 10px;
  height: 100%;
  overflow: auto;
  padding-bottom: 0 !important;
  background-color: #fff;
}
.dialog-body {
  padding: 0 24px 24px;
  word-break: break-word;
  color: #606266;
  font-size: 14px;
}
.number-no {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #f8e373;
  padding: 8px 12px;
  z-index: 999;
  border-radius: 10px 0 10px 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
}
.dialog-content {
  margin: 0 -24px;
  position: relative;
  overflow-x: hidden;
}
.choose-question-type {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  background-color: #f8e373;
  padding-left: 12px;
  border-radius: 0 0 10px 0;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
}
.question-index {
  display: flex;
  align-items: center;
  width: 300px;
}
.combobox-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}
.combobox-input .input-inner {
  border: none;
  background-color: #f8e373;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  padding-left: 4px;
  padding-right: 34px;
  outline: none;
  cursor: pointer;
  background-image: none;
  border-radius: 10px;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  height: 40px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.el-input-suffix-2 {
  position: absolute;
  height: 100%;
  right: 5px;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all 0.3s;
  pointer-events: none;
  color: #4e5b6a;
  font-size: 14px;
  transform: rotate(0deg);
  cursor: pointer;
}
.el-input-icon {
  width: 25px;
  line-height: 40px;
}
.compose-dialog-answer {
  padding-bottom: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  background-color: #fff;
  padding-top: 3rem;
  height: 50%;
}
.grid-answer {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.add-answer {
  width: 112px;
  position: fixed;
  bottom: 20px;
  left: 170px;
  z-index: 999;
}
.fade-transition {
  transition: all 0.3s;
}
.grid-1 {
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 12px;
  margin-bottom: 16px;
}
.answer {
  align-items: center;
}
.answer-index {
  width: 5rem;
  margin-right: 0.5rem;
}
.fill-answer .button-remove {
  cursor: pointer;
  top: 0;
  right: 0;
  width: 46px;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #b6b9ce;
  z-index: 2;
}
.filler {
  width: 5rem;
  margin-right: 0.5rem;
}
.add-answer-title {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #b6b9ce;
  border-radius: 10px;
  background-color: #f1f2f7;
  cursor: pointer;
  color: rgba(78, 91, 106, 0.7);
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
}
.dialog-footer {
  padding: 0 24px 24px;
}
.footer-toolbar {
  bottom: -60px;
  right: 0;
  justify-content: flex-end;
}

@media screen and (max-width: 1600px) {
  .dialog {
    width: 1192px;
  }
}
</style>
