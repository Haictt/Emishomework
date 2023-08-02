<template>
  <div :class="['relative', 'question' + Index]">
    <div class="question-inner">
      <div class="question-decore" :style="backgroundColor"></div>
      <div class="question-content">
        <div class="question-header">
          <div class="header flex-row">
            <div class="header-index">{{ Index + ". " }}</div>
            <div class="flex1" v-html="Question"></div>
          </div>
        </div>
        <div class="question-answer">
          <div v-if="Type != 4" class="answers">
            <template v-for="(answer, index) in Answers">
              <div :class="['answer', { correct: answer.AnswerStatus }]">
                <div class="answer-index">
                  {{ Type == 1 ? index + 1 : numberToText(index + 1 + 64) }}
                </div>
                <div class="answer-content" v-html="answer.AnswerContent"></div>
              </div>
            </template>
          </div>
          <div v-else class="answer-write">
            <div class="line"></div>
          </div>
        </div>
        <div v-if="Hint" class="question-hint">
          <div class="hint">
            <div class="hint-title">{{ questionResource.Item.Hint }}</div>
            <div class="hint-content" v-html="Hint"></div>
          </div>
        </div>
        <div class="question-toolbar">
          <div v-if="Errors" class="question-toolbar-validate">
            <!-- <div class="item">(*) Lỗi 1 <b></b></div>
            <div class="item">(*) Lỗi 2 <b></b></div> -->
          </div>
          <div class="toolbar flex-row">
            <div></div>
            <div class="toolbar-buttons">
              <Button
                Type="secondary"
                Color="default"
                Additional="mr-3"
                @click="editQuestion"
                >{{ questionResource.Item.EditBtn }}</Button
              >
              <Button
                Type="icon"
                Color="default"
                Additional="mr-3"
                title="Sao chép câu hỏi"
                @click="duplicateQuestion"
                ><img
                  src="https://sisapapp.misacdn.net/lms/img/ic_dublicate.1b09bc72.svg"
                  alt=""
              /></Button>
              <Button
                Type="icon"
                Color="default"
                Additional="mr-3"
                title="Xóa câu hỏi"
                @click="deleteQuestion"
                ><img
                  src="https://sisapapp.misacdn.net/lms/img/icon_delete.9097d258.svg"
                  alt=""
              /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionResource from "../../../js/base/locale/VN/homework/question.js";
export default {
  name: "homework-question",
  props: ["Index", "Type", "Hint", "Question", "Answers", "Errors"],
  emits: ["editQuestion", "duplicateQuestion", "deleteQuestion"],
  data() {
    return {
      questionResource: QuestionResource,
    };
  },
  computed: {
    backgroundColor() {
      switch (this.Type) {
        case 1:
          return "background-color: rgb(0, 169, 236);";
          break;
        case 2:
          return "background-color: rgb(255, 88, 140);";
          break;
        case 3:
          return "background-color: rgb(254, 152, 130);";
          break;
        case 4:
          return "background-color: rgb(255, 210, 0);";
          break;
        default:
          break;
      }
    },
  },
  methods: {
    /**
     * Hàm chuyển số sang text tương ứng trong bảng mã ASCII
     */
    numberToText(number) {
      return String.fromCharCode(number);
    },

    /**
     * Gửi đi event sửa câu hỏi hiện tại
     */
    editQuestion() {
      this.$emit("editQuestion");
    },

    /**
     * Gửi đi event sao chếp câu hỏi hiện tại
     */
    duplicateQuestion() {
      debugger;
      this.$emit("duplicateQuestion");
    },

    /**
     * Gửi đi event xóa câu hỏi hiên tại
     */
    deleteQuestion() {
      this.$emit("deleteQuestion");
    },
  },
};
</script>

<style scoped>
.question-inner {
  box-shadow: 0 3px 20px rgba(90, 125, 141, 0.16);
  border-radius: 0 0 6px 6px;
  color: rgba(78, 91, 106, 1);
}
.question-decore {
  height: 8px;
  border-radius: 6px 6px 0 0;
}
.question-content {
  padding: 1.25rem;
}
.question-header {
  margin-bottom: 20px;
}
.header-index {
  font-weight: 700;
  margin-right: 0.25rem;
}
.question-answer {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eaebf5;
}
.question-hint {
  border-bottom: 1px solid #eaebf5;
  padding-bottom: 20px;
  margin-bottom: 1.25rem;
}
.hint {
  display: flex;
  align-items: flex-start;
}
.hint-title {
  margin-right: 4px;
  line-height: 20px;
  font-size: 16px;
  font-weight: 700;
}
.hint-content {
  flex: 1;
}
.question-toolbar {
  display: flex;
  justify-content: space-between;
}
.toolbar {
  justify-content: space-between;
  align-items: center;
  flex: 1 1 0%;
}
.toolbar-buttons {
  align-items: center;
  display: flex;
}
.answers {
  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.answers .answer {
  display: flex;
  align-items: center;
}
.answer-index {
  color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  text-align: center;
  line-height: 24px;
  background-color: #b6b9ce;
  margin-right: 8px;
  font-weight: 700;
}
.answers .answer.correct .answer-index {
  background-color: #00c542;
}
.answers .answer .answer-content {
  height: 100%;
  padding-top: 2px;
  flex: 1 1 0%;
}
.line {
  width: 480px;
  height: 20px;
  border-bottom: 1px dashed #4e5b6a;
  border-top: 1px dashed #4e5b6a;
}
.question-toolbar-validate {
  color: rgba(255, 97, 97, 1);
}
</style>
