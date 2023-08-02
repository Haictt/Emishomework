import { defineStore } from "pinia";
import { questionStore } from "./questionstores.js";
import { toastStore } from "./toaststore.js";
import CRUD from "./crud";

/**
 * Store quản lý bài tập
 */
export const exerciseStore = defineStore("exercise", {
  state: () => {
    return {
      isLoading: false,
      exercise: [],
      total: 0,
      currentExercise: {
        ExerciseName: "",
        GradeId: "35e773ea-5d44-2dda-26a8-6d513e380bde",
        SubjectId: "114b715b-430f-74cd-d5c6-21b180c0988f",

        ExerciseStatus: 0,
        Questions: [],
      },
      updateFields: [],
      isAddOneMore: false,
    };
  },
  getters: {},
  actions: {
    /**
     * resert lại bài tập mẫu về ban đầu
     */
    resetStore() {
      this.currentExercise = {
        ExerciseName: "",
        GradeId: "35e773ea-5d44-2dda-26a8-6d513e380bde",
        SubjectId: "114b715b-430f-74cd-d5c6-21b180c0988f",
        ExerciseStatus: 0,
        Questions: [],
      };
      questionStore().resetStore();
    },

    /**
     * thay đổi trạng thái lưu và đóng hay lưu và thêm mới
     * @param {*} state trạng thái
     */
    changeIsAddOneMore(state) {
      this.isAddOneMore = state;
    },

    /**
     * Thêm entity cần được sửa hoặc thêm
     * @param {*} field entity cần được sửa đổi hoặc thêm
     */
    addUpdateFields(field) {
      if (!this.updateFields.includes(field)) this.updateFields.push(field);
    },

    /**
     * Bỏ entity khỏi danh sách cập nhật hoặc thêm
     * @param {*} field entity cần bỏ
     */
    removeUpdateField(field) {
      if (this.updateFields.includes(field))
        this.updateFields.splice(this.updateFields.indexOf(field), 1);
    },

    /**
     * Xóa toàn bộ danh sách cập nhật hiện tại
     */
    resetUpdateFields() {
      this.updateFields = [];
    },

    /**
     * Cập nhật trạng thái loading
     * @param {*} state boolean
     */
    updateLoading(state) {
      this.isLoading = state;
    },

    /**
     * Lấy toàn bộ bài tập theo chuỗi phân trang, bộ lọc
     * @param {*} filterString Chuỗi phân trang, bộ lọc
     */
    getExerciseDb(filterString) {
      this.isLoading = true;
      // API call
      CRUD.getAllByFilter("Exercise", filterString)
        .then((res) => {
          this.$patch((state) => {
            state.exercise = res.data;
          });
        })
        .catch((err) => {})
        .finally(() => {
          this.isLoading = false;
        });
      // Add a new question
    },

    /**
     * Lấy tổng số bài tập theo chuỗi phân trang, bộ lọc
     * @param {*} filterString Chuỗi phân trang, bộ lọc
     */
    getTotalExerciseDb(filterString) {
      // API call
      CRUD.getTotalByFilter("Exercise", filterString)
        .then((res) => {
          this.$patch((state) => {
            state.total = res.data;
          });
        })
        .catch((err) => {});
      // Add a new question
    },

    /**
     * Lấy 1 bài tập theo Id
     * @param {*} id Id của bài tập
     */
    getOneExerciseDb(id) {
      this.isLoading = true;
      CRUD.getOne("Exercise", id)
        .then((res) => {
          this.currentExercise = res.data;
          questionStore().questions = res.data.Questions;
        })
        .catch((err) => {})
        .finally(() => {
          this.isLoading = false;
        });
    },

    /**
     * Xóa nhiều bài tập
     * @param {*} ids Ids của bài tập cần xóa
     * @returns Boolean
     */
    deleteExercise(ids) {
      return CRUD.delete("Exercise", ids)
        .then((res) => {
          toastStore().addToast("Delete");
        })
        .catch((err) => {});
    },

    /**
     * Thêm hoặc sửa bài tập, câu hỏi bên trong nó, các câu trả lời của bải tập được chọn
     * @param {*} router Router trả về sau khi cập nhật
     */
    upsert(router) {
      this.isLoading = true;
      let exercise = this.normalizeData();
      CRUD.upsert(exercise)
        .then((res) => {
          let id = res.data;
          toastStore().addToast("Add");
          if (router == "Exercise") {
            this.router.replace("/");
          } else if (router == "Question") {
            this.getOneExerciseDb(id);
            this.router.replace({ name: "update", params: { id } });
          }
        })
        .catch((err) => {
          this.router.go(0);
        })
        .finally(() => {
          this.resetUpdateFields();
          this.isLoading = false;
        });
    },

    /**
     * Gán dữ liệu
     * @returns Dữ liệu được gán
     */
    normalizeData() {
      let exercise = JSON.parse(JSON.stringify(this.currentExercise));
      exercise.Questions = questionStore().questions;
      exercise.UpdateFields = this.updateFields;
      exercise.ExerciseName = exercise.ExerciseName || null;
      return exercise;
    },
  },
});
