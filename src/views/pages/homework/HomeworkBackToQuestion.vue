<template>
  <div class="back" @click="goToQuestionPopup">
    <div class="w-full h-full">
      <img
        src="https://sisapapp.misacdn.net/lms/img/bg_button_yellow.f17d419c.svg"
        alt=""
      />
    </div>
    <div class="absolute w-full h-full flex-column img-inner">
      <div class="img-inner-container">
        <img
          src="https://sisapapp.misacdn.net/lms/img/icon_back.006a615c.svg"
          alt=""
          width="48"
          height="42"
        />
      </div>
      <div class="text-back">{{ questionResource.BackPopup }}</div>
    </div>
  </div>
</template>

<script>
import QuestionResource from "../../../js/base/locale/VN/homework/question.js";
export default {
  name: "back-to-question-button",
  emits: ["goToQuestionPopup"],
  data() {
    return {
      questionResource: QuestionResource,
    };
  },
  methods: {
    /**
     * Gửi đi event trở về popup câu hỏi
     */
    goToQuestionPopup() {
      this.$emit("goToQuestionPopup");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
.back {
  height: 160px;
  top: calc(50% - 80px);
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  width: 6rem;
  left: 0;
  position: fixed;
  z-index: 2;
}
.back > * {
  font-family: "Nunito", sans-serif;
}
.img-inner {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  align-items: center;
  cursor: pointer;
  right: 0;
  top: 0;
}
.img-inner-container {
  margin-bottom: 0.75rem;
  margin-top: 1.75rem;
}
.text-back {
  color: rgba(78, 91, 106, 1);
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
}
</style>
