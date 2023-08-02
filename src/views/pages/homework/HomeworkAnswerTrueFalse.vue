<template>
  <div class="yesorno">
    <div class="thumbnail-lazy">
      <textarea
        rows="1"
        :value="modelValue"
        @input="this.$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
    <div
      :class="['icon-check', isRightAnswer ? 'bg-correct' : 'bg-default']"
      @click="toggleRightAnswer"
    >
      <img
        width="14"
        :src="[
          isRightAnswer
            ? 'https://sisapapp.misacdn.net/lms/img/ic_check.3509b7f9.svg'
            : 'https://sisapapp.misacdn.net/lms/img/ic_uncheck.ceabec80.svg',
        ]"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "homework-true-false",
  props: ["modelValue", "Answer"],
  emits: ["update:modelValue", "getTruefalseContent", "getRightTruefalse"],
  data() {
    return {
      isRightAnswer: !!this.Answer.AnswerStatus,
    };
  },
  mounted() {
    /**
     * Gán giá trị ban đầu cho câu trả lời hiện tại
     */
    if (this.Answer.AnswerContent.length) {
      this.isRightAnswer = !!this.Answer.AnswerStatus;
    }
  },
  watch: {
    /**
     * Gửi đi text nhận được từ component cha
     */
    modelValue(val) {
      this.$emit("getTruefalseContent", val);
    },

    /**
     * Nhận và gán giá trị trạng thái câu trả lời
     */
    Answer: {
      handler(val) {
        this.isRightAnswer = !!val.AnswerStatus;
      },
      deep: true,
    },

    /**
     * Gửi đi trạng thái câu trả lời hiên tại
     */
    isRightAnswer(val) {
      this.$emit("getRightTruefalse", val);
    },
  },
  methods: {
    /**
     * Thay đổi trạng thái câu trả lời và gửi đi
     */
    toggleRightAnswer() {
      this.isRightAnswer = !this.isRightAnswer;
      this.$emit("getRightTruefalse", this.isRightAnswer);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nunito&display=swap");
.yesorno {
  align-items: center;
  justify-content: center;
  min-height: 88px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  cursor: pointer;
  padding: 95% 12px 12px;
  position: relative;
  width: 100%;
  overflow: hidden;
  display: block;
}
.yesorno * {
  font-family: "Nunito", sans-serif;
}
.thumbnail-lazy {
  background-color: rgb(172, 235, 241);
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
}
textarea {
  color: rgb(78, 91, 106);
  resize: none;
  border: none;
  outline: none;
  line-height: 40px;
  height: 40px;
  text-align: center;
  overflow: hidden;
  background: none;
  font-weight: 700;
  font-size: 24px;
}
.icon-check {
  position: absolute;
  background-color: rgb(255, 255, 255);
  right: 12px;
  top: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 9;
  outline: none;
}
.icon-check.bg-correct {
  background-color: rgb(0, 197, 66);
}
.icon-check:hover {
  transform: scale(1.2);
  transition: 0.3s;
}
</style>
