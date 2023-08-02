<template>
  <div class="answer-container" style="--427b5493: rgb(255, 214, 240)">
    <div class="thumb-lazy flex-center">
      <CKEditorAnswer v-model="answerContent"></CKEditorAnswer>
      <div class="answer-head">
        <div class="index">{{ numberToText(Index + 1 + 64) }}</div>
        <div class="right flex-row">
          <div
            class="icon-trashcan toolbar-icon"
            title="Xóa đáp án"
            @click="deleteAnswer"
          >
            <img
              width="18"
              src="https://sisapapp.misacdn.net/lms/img/icon_delete.9097d258.svg"
              alt=""
            />
          </div>
          <div class="icon-image toolbar-icon" title="Tải ảnh">
            <img
              width="18"
              src="https://sisapapp.misacdn.net/lms/img/ck_file.301a99b1.svg"
              alt=""
            />
          </div>
          <div
            :class="[
              'icon-check',
              'toolbar-icon',
              { 'bg-correct': isRightAnswer },
            ]"
            title="Đánh dấu đáp án đúng"
            @click="toggleRightAnswer"
          >
            <img
              width="18"
              :src="[
                isRightAnswer
                  ? 'https://sisapapp.misacdn.net/lms/img/ic_check.3509b7f9.svg'
                  : 'https://sisapapp.misacdn.net/lms/img/ic_uncheck.ceabec80.svg',
              ]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CKEditorAnswer from "../../../components/CKEditorAnswer.vue";
export default {
  name: "homework-answer-choose",
  components: { CKEditorAnswer },
  props: ["Answer", "Index"],
  emits: ["deleteAnswer", "getAnswerContent", "getRightAnswer"],
  data() {
    return {
      isRightAnswer: false,
      answerContent: "",
    };
  },
  mounted() {
    /**
     * Gán giá trị ban đầu cho câu trả lời
     */
    if (this.Answer.AnswerContent.length) {
      this.answerContent = this.Answer.AnswerContent;
      this.isRightAnswer = !!this.Answer.AnswerStatus;
    }
  },
  watch: {
    /**
     * Kiểm tra câu trả lời hiện tại và bind data
     */
    Answer: {
      handler(val) {
        this.isRightAnswer = val.AnswerStatus;
        this.answerContent = val.AnswerContent;
      },
      deep: true,
    },

    /**
     * Gửi đi input đáp án hiện tại
     */
    answerContent(val) {
      this.$emit("getAnswerContent", val);
    },

    /**
     * Gửi đi trạng thái đúng sai hiện tại
     */
    isRightAnswer(val) {
      this.$emit("getRightAnswer", val);
    },
  },
  methods: {
    /**
     * Thay đổi trạng thái câu trả lời
     */
    toggleRightAnswer() {
      this.isRightAnswer = !this.isRightAnswer;
    },

    /**
     * Gửi đi event xóa câu trả lời hiện tại
     */
    deleteAnswer() {
      this.$emit("deleteAnswer");
    },

    /**
     * Hàm chuyển đổi số sang text
     * @param {*} number số cần chuyển
     * @return text trong bảng mã ASCII tương ứng
     */
    numberToText(number) {
      return String.fromCharCode(number);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
* {
  font-family: "Nunito", sans-serif;
}
.answer-container {
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  width: 100%;
  overflow: hidden;
  display: block;
  padding-top: 95%;
  border-radius: 10px;
  color: rgba(78, 91, 106, 1);
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
}
.thumb-lazy {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-size: cover;
  background: no-repeat 50%;
  padding: 48px 8px;
  padding-bottom: 12px;
  display: flex !important;
  background-color: var(--427b5493);
}
.thumb-lazy > * {
  border-color: var(--427b5493) !important;
}
.answer-head {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  z-index: 999;
}
.index {
  color: rgba(78, 91, 106, 1);
  margin-left: 0.25rem;
  margin-top: 0.25rem;
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
}
.toolbar-icon {
  background-color: #fff;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 8px;
  outline: none;
}
.toolbar-icon:hover {
  transform: scale(1.2);
  transition: 0.3s;
}
.icon-check.bg-correct {
  background-color: #00c542;
}
</style>
