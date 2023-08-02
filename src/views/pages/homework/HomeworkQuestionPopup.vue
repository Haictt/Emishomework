<template>
  <HomeworkQuestionHintPopup
    v-if="isShowQuestionHintPopup"
    @goToQuestionPopup="goToQuestionPopup"
    @saveHint="saveHint"
    :Hint="questionHint"
    :Index="currentIndex"
  ></HomeworkQuestionHintPopup>
  <div v-else class="overlay">
    <div
      class="dialog compose-dialog"
      aria-modal="true"
      role="dialog"
      aria-label="dialog"
    >
      <div class="dialog-body">
        <form action="" class="h-full dialog-form">
          <div class="dialog-content h-full">
            <div class="choose-question-type">
              <div class="question-index">
                <div class="number-no">{{ questionResource.Popup.No }} {{ currentIndex }} -</div>
                <Combobox
                  :Content="questionTypeName"
                  :Placeholder="questionTypeName[ChosenType - 1]"
                  AdditionalInput="questionTypeNameStyle"
                  v-model="currentQuestionTypeName"
                ></Combobox>
              </div>
            </div>
            <CKEditorQuestion :QuestionType="questionType"></CKEditorQuestion>
            <div v-if="questionType != 4" class="compose-dialog-answer">
              <div class="select-answer">
                <div :class="[questionType != 3 ? 'grid-answer' : 'grid-1']">
                  <template v-if="questionType == 1">
                    <HomeworkAnswerChoose
                      v-for="(item, index) in answerList"
                      :key="index"
                      :Answer="item"
                      :Index="index"
                      @deleteAnswer="deleteAnswer(index)"
                      @getAnswerContent="getAnswerContent(index, $event)"
                      @getRightAnswer="getRightAnswer(index, $event)"
                    ></HomeworkAnswerChoose>
                  </template>
                  <template v-else-if="questionType == 2">
                    <div></div>
                    <HomeworkAnswerTrueFalse
                      v-for="(item, index) in truefalseList"
                      :key="index"
                      :Answer="item"
                      v-model="item.AnswerContent"
                      @deleteAnswer="deleteAnswer(index)"
                      @getRightTruefalse="getRightTruefalse(index, $event)"
                    ></HomeworkAnswerTrueFalse>
                    <div></div>
                  </template>
                  <template v-else-if="questionType == 3">
                    <div
                      class="fill-answer relative"
                      v-for="(item, index) in inputList"
                      :key="item"
                    >
                      <div class="answer flex-row">
                        <div class="answer-index">{{ questionResource.Popup.Space }} {{ index + 1 }}</div>
                        <MISAInputTag
                          @getInputTagAnswer="getInputTagAnswer(index, $event)"
                          :Answer="inputList[index]"
                        ></MISAInputTag>
                      </div>
                      <div
                        class="button-remove"
                        @click="deleteInputTagAnswer(index)"
                      >
                        <div class="icon-remove">
                          <img
                            src="https://sisapapp.misacdn.net/lms/img/ic_remove.2d9e09d5.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="add-answer-input-list flex-row"
                      @click="addInputTagAnswer"
                    >
                      <div class="filler"></div>
                      <div class="add-answer-title w-full">
                        <img
                          width="12"
                          src="https://sisapapp.misacdn.net/lms/img/ic_add-answer.9486a95a.svg"
                          alt=""
                          style="margin-right: 12px"
                        />
                        {{ questionResource.Popup.AddAnswer }}
                      </div>
                    </div>
                  </template>
                  <template v-else-if="questionType == 4"></template>
                </div>
                <div v-if="questionType == 1" class="add-answer">
                  <Button
                    Type="secondary"
                    Color="default"
                    @click.prevent="addAnswers"
                    >{{ questionResource.Popup.AddAnswer }}</Button
                  >
                </div>
              </div>
            </div>
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
              @click="closeQuestionPopup"
              >{{ questionResource.Popup.CancelBtn }}</Button
            >
            <Button
              Type="secondary"
              Color="default"
              Additional="mr-3"
              @click="handleSaveQuestion"
              >{{ questionResource.Popup.SaveBtn }}</Button
            >
            <Button
              Type="primary"
              Color="gradient"
              @click="handleSaveAndAddQuestion"
              >{{ questionResource.Popup.SaveAndAddBtn }}</Button
            >
          </div>
        </div>
      </div>
    </div>
    <HomeworkAddHint @goToHintPopup="goToHintPopup"></HomeworkAddHint>
  </div>
  <teleport to="body">
    <Dialog v-if="isShowDialog" Type="warn" @closeDialog="closeDialog">{{
      dialogText
    }}</Dialog>
  </teleport>
</template>

<script>
import CKEditorQuestion from "../../../components/CKEditorQuestion.vue";
import HomeworkAnswerChoose from "./HomeworkAnswerChoose.vue";
import HomeworkAnswerTrueFalse from "./HomeworkAnswerTrueFalse.vue";
import MISAInputTag from "../../../components/MISAInputTag.vue";
import HomeworkAddHint from "./HomeworkAddHint.vue";
import HomeworkQuestionHintPopup from "./HomeworkQuestionHintPopup.vue";
import QuestionResource from "../../../js/base/locale/VN/homework/question.js";
import { questionStore } from "../../../js/base/questionstores.js";
import { exerciseStore } from "../../../js/base/exercisestore.js";
import { toastStore } from "../../../js/base/toaststore";
import { mapState, mapActions } from "pinia";

export default {
  name: "homework-question-popup",
  components: {
    CKEditorQuestion,
    HomeworkAnswerChoose,
    HomeworkAnswerTrueFalse,
    MISAInputTag,
    HomeworkAddHint,
    HomeworkQuestionHintPopup,
  },
  props: ["ChosenType", "CopyQuestion", "Mode"],
  emits: ["closeQuestionPopup", "addOneMoreQuestion"],
  data() {
    return {
      questionResource: QuestionResource,
      copyQuestion: null,
      questionContent: "",
      questionType: this.ChosenType,
      currentIndex: 1,
      isShowQuestionHintPopup: false,
      questionHint: "",
      question: {
        QuestionType: this.ChosenType,
        QuestionHint: "",
        QuestionContent: "",
        Answers: [],
      },
      answerList: [
        {
          AnswerContent: "",
          AnswerImage: null,
          AnswerStatus: 0,
          AnswerOrder: 0,
          QuestionId: null,
        },
        {
          AnswerContent: "",
          AnswerImage: null,
          AnswerStatus: 0,
          AnswerOrder: 1,
          QuestionId: null,
        },
        {
          AnswerContent: "",
          AnswerImage: null,
          AnswerStatus: 0,
          AnswerOrder: 2,
          QuestionId: null,
        },
        {
          AnswerContent: "",
          AnswerImage: null,
          AnswerStatus: 0,
          AnswerOrder: 3,
          QuestionId: null,
        },
      ],
      truefalseList: [
        {
          AnswerContent: "Đúng",
          AnswerImage: null,
          AnswerStatus: 1,
          AnswerOrder: 0,
          QuestionId: null,
        },
        {
          AnswerContent: "Sai",
          AnswerImage: null,
          AnswerStatus: 0,
          AnswerOrder: 1,
          QuestionId: null,
        },
      ],
      inputList: [
        {
          AnswerContent: "",
          AnswerImage: null,
          AnswerStatus: 1,
          AnswerOrder: 0,
          QuestionId: null,
        },
      ],
      questionTypeName: [
        "Chọn đáp án",
        "Đúng sai",
        "Điền vào chỗ trống",
        "Tự luận",
      ],
      currentQuestionTypeName: "",
      isShowDialog: false,
      dialogText: "",
    };
  },
  beforeMount() {
    /**
     * Kiểm tra trang thái popup hiện tại, nếu là sửa hoặc sao chép thì gán giá trị ban đầu
     * Tùy chỉnh index câu hỏi theo số câu hỏi hiện tại
     */
    if (this.isEdit || this.isDuplicate) {
      this.copyQuestion = this.currentQuestion(this.CopyQuestion);
      this.questionType = this.copyQuestion.QuestionType;
      this.questionHint = this.copyQuestion.QuestionHint;
      this.questionContent = this.copyQuestion.QuestionContent;
      let questionType = this.checkQuestionName(this.questionType);
      if (questionType != null) {
        this[questionType] = this.copyQuestion.Answers;
      }
      this.patchCurrentQuestion(this.copyQuestion.QuestionContent);
    }
    if (this.isEdit) {
      this.currentIndex =
        this.questions.findIndex(
          (question) => question.QuestionId == this.CopyQuestion
        ) + 1;
    } else if (this.isDuplicate) {
      this.currentIndex = this.questions.length + 1;
    } else {
      this.patchCurrentQuestion("");
      this.currentIndex = this.questions.length + 1;
    }
  },
  mounted() {
    /**
     * Gán tên của kiểu câu hỏi hiện tại
     */
    this.currentQuestionTypeName = this.questionTypeName[this.ChosenType - 1];
  },
  watch: {
    /**
     * Kiểm tra và gán nội dung câu hỏi
     * @param {*} val nội dung câu hỏi
     */
    chosenQuestionContent(val) {
      this.questionContent = val;
    },

    /**
     * Lưu nội dung câu hỏi hiện tại
     */
    questionContent(val) {
      this.patchCurrentQuestion(val);
    },

    /**
     * Thay đổi kiểu câu hỏi theo tên
     * @param {*} val tên kiểu câu hỏi hiện tại
     */
    currentQuestionTypeName(val) {
      this.questionType = this.questionTypeName.indexOf(val) + 1;
    },
  },
  computed: {
    ...mapState(questionStore, ["questions", "chosenQuestionContent"]),
    ...mapState(exerciseStore, ["currentExercise"]),

    /**
     * Kiểm tra trạng thái nếu là thêm mới câu hỏi
     */
    isAdd() {
      if (this.Mode) {
        return this.Mode == "add";
      } else {
        return !this.Mode;
      }
    },

    /**
     * Kiểm tra trạng thái nếu là sửa câu hỏi
     */
    isEdit() {
      if (this.Mode) {
        return this.Mode == "edit";
      }
    },

    /**
     * Kiểm tra trạng thái nếu là sao chép câu hỏi
     */
    isDuplicate() {
      if (this.Mode) {
        return this.Mode == "duplicate";
      }
    },
  },
  methods: {
    ...mapActions(questionStore, [
      "addQuestion",
      "editQuestion",
      "currentQuestion",
      "patchCurrentQuestion",
    ]),
    ...mapActions(exerciseStore, [
      "addUpdateFields",
      "upsert",
      "removeUpdateField",
    ]),
    ...mapActions(toastStore, ["addToast"]),

    /**
     * Thêm 1 câu trả lời kiểu chọn đáp án
     */
    addAnswers() {
      this.answerList.push({
        AnswerContent: "",
        AnswerImage: null,
        AnswerStatus: 0,
        AnswerOrder: this.getLatestAnswerOrder(this.answerList),
        QuestionId: null,
      });
    },

    /**
     * Thêm 1 câu trả lời kiểu điền vào chỗ trống
     */
    addInputTagAnswer() {
      this.inputList.push({
        AnswerContent: "",
        AnswerImage: null,
        AnswerStatus: 1,
        AnswerOrder: this.getLatestAnswerOrder(this.inputList),
        QuestionId: null,
      });
    },

    /**
     * Xóa 1 câu trả lời kiểu chọn đáp án
     */
    deleteAnswer(id) {
      if (this.answerList.length == 1) {
        this.addToast("RequireAnswer");
      } else {
        this.answerList.splice(id, 1);
      }
    },

    /**
     * Xóa 1 câu trả lời kiểu điền vào chỗ trống
     */
    deleteInputTagAnswer(id) {
      if (this.inputList.length == 1) {
        this.addToast("RequireAnswer");
      } else {
        this.inputList.splice(id, 1);
      }
    },

    /**
     * Lấy và gán giá trị của câu trả lời kiểu chọn đáp án
     */
    getAnswerContent(id, val) {
      this.answerList[id].AnswerContent = val;
    },

    /**
     * Láy và gán trạng thái của câu trả lời kiểu chọn đáp án
     */
    getRightAnswer(id, val) {
      this.answerList[id].AnswerStatus = this.convertBoolToNumber(val);
    },

    /**
     * Lấy và gán trạng thái của câu trả lời kiểu đúng sai
     */
    getRightTruefalse(id, val) {
      if (val == true) {
        this.truefalseList.forEach((answer) => (answer.AnswerStatus = 0));
      } else {
        this.truefalseList.forEach((answer) => (answer.AnswerStatus = 1));
      }
      this.truefalseList[id].AnswerStatus = this.convertBoolToNumber(val);
    },

    /**
     * Lấy và gán giá trị của câu trả lời kiểu điền vào chỗ trống
     */
    getInputTagAnswer(id, val) {
      this.inputList[id].AnswerContent = val.join(";");
    },

    /**
     * Xử lý lưu câu hỏi và đóng, gán các giá trị trong data hiện tại vào object cần gửi đi
     * Thay đổi index tương ứng, kiểm tra xem câu trả lời có thay đổi không
     */
    handleSaveQuestion() {
      if (this.validateData()) {
        if (!this.currentExercise.ExerciseId) {
          this.addUpdateFields("Exercise");
        }
        this.addUpdateFields("Question");
        this.question.QuestionType = this.questionType;
        this.question.QuestionContent = this.questionContent;
        let questionType = this.checkQuestion(this.questionType);
        this.question.QuestionHint = this.questionHint;
        this.question.Answers = questionType;
        if (this.isAdd) {
          this.addUpdateFields("Answer");
          this.addQuestion(this.question);
          this.upsert("Question");
        } else if (this.isEdit) {
          let index = this.questions.findIndex(
            (question) => question.QuestionId == this.CopyQuestion
          );
          if (
            this.questionType != this.ChosenType ||
            JSON.stringify(this.copyQuestion) != JSON.stringify(questionType)
          ) {
            this.addUpdateFields("Answer");
          }
          this.question.QuestionId = this.copyQuestion.QuestionId;
          this.editQuestion(this.question, index);
          this.upsert("Question");
        } else if (this.isDuplicate) {
          this.addUpdateFields("Answer");
          this.addQuestion(this.question);
          this.upsert("Question");
        }

        this.closeQuestionPopup();
      } else {
        this.isShowDialog = true;
      }
    },

    /**
     * Xử lý lưu và thêm mới câu hỏi, gửi đi event thay đổi trạng thái hiện tại thành lưu và thêm mới
     */
    handleSaveAndAddQuestion() {
      this.handleSaveQuestion();
      this.$emit("addOneMoreQuestion");
    },

    /**
     * Gửi đi event đóng popup thêm câu hỏi
     */
    closeQuestionPopup() {
      this.removeUpdateField("Question");
      this.removeUpdateField("Answer");
      this.$emit("closeQuestionPopup");
    },

    /**
     * Mở popup thêm câu trả lời
     */
    goToHintPopup() {
      this.isShowQuestionHintPopup = true;
    },

    /**
     * Đóng popup thêm câu trả lời và quay lại
     */
    goToQuestionPopup() {
      this.isShowQuestionHintPopup = false;
    },

    /**
     * Lưu câu trả lời
     */
    saveHint(val) {
      this.questionHint = val;
      this.isShowQuestionHintPopup = false;
    },

    /**
     * Kiểm tra loại câu hỏi và trả về list câu trả lời tương ứng
     */
    checkQuestion(questionType) {
      switch (questionType) {
        case 1:
          return this.answerList;
        case 2:
          return this.truefalseList;
        case 3:
          return this.inputList;
        default:
          return [];
      }
    },

    /**
     * Kiểm tra tên của loại câu hỏi
     */
    checkQuestionName(questionType) {
      switch (questionType) {
        case 1:
          return "answerList";
        case 2:
          return "truefalseList";
        case 3:
          return "inputList";
        default:
          return null;
      }
    },

    /**
     * Validate dữ liệu, kiểm tra xem câu hỏi có trống, câu trả lời có trống hay k có trạng thái, có ít nhất 1 câu trả lời
     */
    validateData() {
      let isValid = true;
      if (!this.questionContent) {
        this.dialogText = "Bạn vui lòng nhập nội dung câu hỏi";
        isValid = false;
      } else if (this.questionType != 4) {
        let answers = this.checkQuestion(this.questionType);
        if (!answers.length) {
          this.dialogText = "Bạn vui lòng thêm câu trả lời";
          isValid = false;
        } else if (
          answers.some((answer) => {
            return !answer.AnswerContent;
          })
        ) {
          this.dialogText = "Bạn vui lòng nhập nội dung câu trả lời";
          isValid = false;
        } else if (
          answers.every((answer) => {
            return answer.AnswerStatus == 0;
          })
        ) {
          this.dialogText = "Bạn vui lòng chọn ít nhất 1 đáp án đúng";
          isValid = false;
        }
      }
      return isValid;
    },

    /**
     * Lấy về order câu trả lời lớn nhất
     */
    getLatestAnswerOrder(type) {
      return type[type.length - 1].AnswerOrder + 1;
    },

    /**
     * Đóng dialog
     */
    closeDialog() {
      this.isShowDialog = false;
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
