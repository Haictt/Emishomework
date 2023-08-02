<template>
  <div>
    <div class="questions">
      <div class="questions-container">
        <template
          v-for="(question, index) in questions"
          :key="question.QuestionId"
        >
          <HomeworkQuestion
            :Index="index + 1"
            :Type="question.QuestionType"
            :Hint="question.QuestionHint"
            :Question="question.QuestionContent"
            :Answers="question.Answers"
            @deleteQuestion="handleDeleteQuestion(question.QuestionId)"
            @editQuestion="handleEditQuestion(question.QuestionId)"
            @duplicateQuestion="handleDuplicateQuestion(question.QuestionId)"
          ></HomeworkQuestion>
        </template>
      </div>
    </div>
    <div class="toolbar-vertical flex-column">
      <div class="step-composing-three w-full">
        <div
          v-for="(question, index) in questionType"
          :key="question.Type"
          class="question-type"
          @click="handleAddQuestion(question.Type)"
        >
          <img
            :src="question.Img"
            width="40"
            :tabindex="index"
            alt=""
            class="question-type-icon"
          />
        </div>
      </div>
      <div class="decore-vertical"></div>
      <div class="question-option">
        <img
          src="https://sisapapp.misacdn.net/lms/img/library.fc851823.svg"
          alt=""
          width="40"
          tabindex="0"
          class="question-type-icon"
        />
      </div>
      <div class="question-option">
        <img
          src="https://sisapapp.misacdn.net/lms/img/extract-ai.0a23c6a4.svg"
          alt=""
          width="40"
          tabindex="1"
          class="question-type-icon"
        />
      </div>
      <div class="question-option">
        <img
          src="https://sisapapp.misacdn.net/lms/img/sort.220d1765.svg"
          alt=""
          width="40"
          tabindex="2"
          class="question-type-icon"
        />
      </div>
    </div>
  </div>
  <teleport to="#app">
    <template v-if="isShowQuestionPopup">
      <HomeworkQuestionPopup
        :CopyQuestion="chosenQuestion"
        :Mode="mode"
        :ChosenType="chosenType"
        @closeQuestionPopup="closeQuestionPopup"
        @addOneMoreQuestion="addOneMoreQuestion"
      ></HomeworkQuestionPopup>
    </template>
  </teleport>
  <teleport to="body">
    <Dialog
      v-if="isShowDialog"
      Type="confirm"
      @closeDialog="closeDialog"
      @confirmDialog="confirmDeleteQuestion"
      >{{ dialogText }}</Dialog
    >
  </teleport>
</template>

<script>
import HomeworkQuestionPopup from "./HomeworkQuestionPopup.vue";
import HomeworkQuestion from "./HomeworkQuestion.vue";
import { questionStore } from "../../../js/base/questionstores.js";
import { exerciseStore } from "../../../js/base/exercisestore.js";
import { mapState, mapActions } from "pinia";
export default {
  name: "homework-has-question",
  components: { HomeworkQuestion, HomeworkQuestionPopup },
  data() {
    return {
      chosenType: 1,
      chosenQuestion: -1,
      chosenDeleteQuestion: null,
      mode: "add",
      isShowQuestionPopup: false,
      isShowDialog: false,
      dialogText: "Bạn có chắc chắn muốn xóa câu hỏi không?",
      questionType: {
        Choose: {
          Img: "https://sisapapp.misacdn.net/lms/img/select.c15dfe74.svg",
          Text: "Thêm câu chọn đáp án",
          Type: 1,
        },
        Bool: {
          Img: "https://sisapapp.misacdn.net/lms/img/yesorno.7f4f0b5a.svg",
          Text: "Thêm câu đúng sai",
          Type: 2,
        },
        Fill: {
          Img: "https://sisapapp.misacdn.net/lms/img/fill.af676902.svg",
          Text: "Thêm câu điền vào chỗ trống",
          Type: 3,
        },
        Match: {
          Img: "https://sisapapp.misacdn.net/lms/img/pairing.4e1fb31f.svg",
          Text: "Thêm câu ghép nối",
          Type: -1,
        },
        Group: {
          Img: "https://sisapapp.misacdn.net/lms/img/group.ca2a19ef.svg",
          Text: "Thêm câu hỏi nhóm",
          Type: -1,
        },
        Write: {
          Img: "https://sisapapp.misacdn.net/lms/img/essay.e07e1e68.svg",
          Text: "Thêm câu tự luận",
          Type: 4,
        },
      },
    };
  },
  mounted() {
    /**
     * Mở popup thêm câu hỏi khi trạng thái là lưu và thêm mới sau khi lưu câu hỏi
     */
    if (this.isAddOneMore) {
      this.isShowQuestionPopup = true;
      this.changeIsAddOneMore(false);
    }
  },
  computed: {
    ...mapState(questionStore, ["questions"]),
    ...mapState(exerciseStore, ["currentExercise", "isAddOneMore"]),
  },
  methods: {
    ...mapActions(questionStore, ["deleteQuestion"]),
    ...mapActions(exerciseStore, ["changeIsAddOneMore"]),

    /**
     * Mở popup thêm câu hỏi 
     * @param {*} val Loại câu hỏi
     */
    handleAddQuestion(val) {
      this.chosenType = val;
      this.chosenQuestion = -1;
      this.mode = "add";
      this.isShowQuestionPopup = true;
    },

    /**
     * Mở popup sửa câu hỏi
     * @param {*} id Id câu hỏi cần sửa
     */
    handleEditQuestion(id) {
      this.chosenType = this.questions.find(
        (question) => question.QuestionId == id
      ).QuestionType;
      this.chosenQuestion = id;
      this.mode = "edit";
      this.isShowQuestionPopup = true;
    },

    /**
     * Mở popup sao chép câu hỏi
     * @param {*} id Id câu hỏi muốn sao chép
     */
    handleDuplicateQuestion(id) {
      this.chosenType = this.questions.find(
        (question) => question.QuestionId == id
      ).QuestionType;
      this.chosenQuestion = id;
      this.mode = "duplicate";
      this.isShowQuestionPopup = true;
    },

    /**
     * Mở popup xác nhận xóa câu hỏi
     * @param {*} id Id câu hỏi cần xóa
     */
    handleDeleteQuestion(id) {
      this.isShowDialog = true;
      this.chosenDeleteQuestion = id;
    },

    /**
     * Thay đổi trạng thái thành lưu và thêm mới khi bấm nút này
     */
    addOneMoreQuestion() {
      this.changeIsAddOneMore(true);
    },

    /**
     * Đóng popup thêm câu hỏi
     */
    closeQuestionPopup() {
      this.isShowQuestionPopup = false;
    },

    /**
     * Đóng dialog 
     */
    closeDialog() {
      this.isShowDialog = true;
    },

    /**
     * Xác nhận xóa câu hỏi hiện tại
     */
    confirmDeleteQuestion() {
      this.isShowDialog = false;
      this.deleteQuestion([this.chosenDeleteQuestion]);
    },
  },
};
</script>

<style scoped>
.questions {
  height: calc(100vh - 188px);
  padding: 0 32px 32px 32px;
  margin: 0 -32px 24px -32px;
  margin-top: 36px;
  overflow: auto;
}
.toolbar-vertical {
  position: absolute;
  right: -88px;
  top: 36px;
  flex-direction: column;
}
.questions-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
}

.decore-vertical {
  display: block;
  width: 40px;
  height: 2px;
  background-color: #b6b9ce;
  border-radius: 4px;
  margin: 12px 0;
}
.question-option {
  display: block;
}
.question-option,
.question-type {
  height: 40px;
  margin-bottom: 8px;
}
.question-type:last-of-type {
  margin: 0;
}
.question-type-icon:hover {
  transform: scale(1.1);
  transition: 0.3s;
}
.question-type-icon {
  cursor: pointer;
  outline: none;
}
</style>
