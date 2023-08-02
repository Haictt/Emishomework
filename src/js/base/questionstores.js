import { defineStore } from "pinia";
import { exerciseStore } from "./exercisestore";
import { toastStore } from "./toaststore.js";
import CRUD from "./crud";

/**
 * Store quản lý câu hỏi của 1 bài tập
 */
export const questionStore = defineStore("question", {
  state: () => {
    return {
      questions: [
        
      ],
      chosenQuestionContent: "",
    };
  },
  getters: {},
  actions: {
    /**
     * Gán giá trị câu hỏi được chọn
     * @param {*} val Câu hỏi hiện tại được chọn
     */
    patchCurrentQuestion(val) {
      this.chosenQuestionContent = val;
    },

    /**
     * Tìm câu hỏi hiện tại theo id trong list câu hỏi
     * @param {*} id Id của câu hỏi
     * @returns Câu hỏi tìm được
     */
    currentQuestion(id) {
      if (this.questions.length) {
        return JSON.parse(
          JSON.stringify(
            this.questions.find((question) => question.QuestionId == id)
          )
        );
      }
    },

    /**
     * Reset lại store
     */
    resetStore() {
      this.$patch((state) => {
        state.questions = [];
      });
    },

    /**
     * Thêm câu hỏi mới
     * @param {*} newQuestion câu hỏi mới
     */
    addQuestion(newQuestion) {
      // API call
      if (!newQuestion.QuestionHint) {
        newQuestion.QuestionHint = null;
      }
      // Add a new question
      this.$patch((state) => {
        state.questions = [newQuestion];
      });
    },

    /**
     * Sửa 1 câu hỏi
     * @param {*} newQuestion câu hỏi sau khi được sửa
     * @param {*} index 
     */
    editQuestion(newQuestion, index) {
      // API call
      if (!newQuestion.QuestionHint) {
        newQuestion.QuestionHint = null;
      }
      // Edit a question
      this.$patch((state) => {
        state.questions = [newQuestion];
      });
    },

    /**
     * Xóa nhiều câu hỏi theo id
     * @param {*} ids Ids các câu hỏi cần xóa
     */
    deleteQuestion(ids) {
      // API call
      CRUD.delete("Question", ids)
        .then((response) => {
          toastStore().addToast("Delete");
          exerciseStore().getOneExerciseDb(
            exerciseStore().currentExercise.ExerciseId
          );
        })
        .catch((err) => {});
      // Delete a question
    },
  },
});
