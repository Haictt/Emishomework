<template>
  <div class="h-full">
    <Loading v-if="isLoading"></Loading>
    <div v-else class="compose-exercise flex-column h-full">
      <div class="header relative grid grid-cols-1">
        <div class="header-top flex-center">
          <div class="header-top-left flex-row w-full">
            <div class="btn-back pointer" @click="goToHome">
              <img
                src="https://sisapapp.misacdn.net/lms/img/icon_back.91713f1b.svg"
                alt=""
              />
            </div>
            <div class="header-top-avatar rounded-full">
              <img
                width="40"
                height="40"
                src="https://sisapapp.misacdn.net/lms/img/default.d2422f80.png"
                alt=""
                class="object-cover rounded-full"
                style=""
              />
            </div>
            <div class="header-top-name w-full">
              <input
                class="w-full"
                placeholder="Nhập tên bài tập..."
                name=""
                id=""
                v-model="exerciseName"
              />
            </div>
          </div>
        </div>
        <div class="header-bottom flex-row">
          <div class="header-bottom-left flex-row">
            <Combobox
              Width="160px"
              :Content="subject"
              :Placeholder="subject[0]"
              v-model="comboboxArray.Subject"
            ></Combobox>
            <Combobox
              Width="100px"
              :Content="grade"
              :Placeholder="grade[0]"
              v-model="comboboxArray.Grade"
            ></Combobox>
            <Button
              Color="default"
              Type="secondary"
              @click="showAddInfoPopup"
              >{{ exerciseResource.Create.AddInfo }}</Button
            >
            <Button Color="default" Type="secondary" Additional="mr-3">{{
              exerciseResource.Create.ChangeMethod
            }}</Button>
          </div>
          <div class="header-bottom-right flex-row">
            <Button Color="default" Type="icon" Additional="mr-3">
              <img
                width="24"
                height="24"
                class="flex-center"
                src="https://sisapapp.misacdn.net/lms/img/ic_help.6d809294.svg"
                alt=""
              />
            </Button>
            <Button Color="default" Type="secondary" Additional="mr-3">{{
              exerciseResource.Create.TestBtn
            }}</Button>
            <Button
              Color="gradient"
              Type="primary"
              Additional="mr-3"
              @click="submitExercise"
              >{{ exerciseResource.Create.SubmitBtn }}</Button
            >
          </div>
        </div>
      </div>
      <div class="content relative compose">
        <template v-if="questions.length">
          <HomeworkHasQuestion></HomeworkHasQuestion>
        </template>
        <template v-else>
          <HomeworkNoQuestion></HomeworkNoQuestion>
        </template>
      </div>
    </div>
  </div>
  <teleport to="#app">
    <template v-if="isShowAddInfoPopup">
      <HomeworkAddInfoPopup
        :Info="currentExercise"
        :IsAdd="isAdd"
        @closeAddInfoPopup="closeAddInfoPopup"
      ></HomeworkAddInfoPopup>
    </template>
  </teleport>
</template>

<script>
import HomeworkAddInfoPopup from "./HomeworkAddInfoPopup.vue";
import HomeworkNoQuestion from "./HomeworkNoQuestion.vue";
import HomeworkHasQuestion from "./HomeworkHasQuestion.vue";
import ExerciseResource from "../../../js/base/locale/VN/homework/exercise.js";
import { questionStore } from "../../../js/base/questionstores.js";
import { comboboxStore } from "../../../js/base/comboboxstore.js";
import { exerciseStore } from "../../../js/base/exercisestore.js";
import { mapState, mapActions } from "pinia";
import { handleError } from "vue";
export default {
  name: "homework-create",
  components: { HomeworkAddInfoPopup, HomeworkNoQuestion, HomeworkHasQuestion },
  props: ["id"],
  data() {
    return {
      isShowAddInfoPopup: false,
      comboboxArray: {
        Subject: "Toán",
        Grade: "Khối 1",
      },
      exerciseName: "",
      questions: [],
      exerciseResource: ExerciseResource,
    };
  },

  mounted() {
    /**
     * Gán giá trị ban đầu cho component khi khởi tạo
     */
    this.resetStore();
    this.getGradeDb();
    this.getSubjectDb();
    this.resetUpdateFields();

    /**
     * Nếu là sửa thì lấy giá trị bài tập theo id hiện tại
     */
    if (!this.isAdd) {
      this.getOneExerciseDb(this.$route.params.id);
    } 
  },
  computed: {
    ...mapState(comboboxStore, [
      "grade",
      "subject",
      "gradeSource",
      "subjectSource",
    ]),

    ...mapState(exerciseStore, [
      "exercise",
      "currentExercise",
      "updateFields",
      "isLoading",
    ]),

    /**
     * Id của môn học
     */
    subjectId() {
      if (this.comboboxArray.Subject) {
        return this.convertStringToGuid(
          this.comboboxArray.Subject,
          this.subjectSource,
          "Subject"
        );
      }
    },

    /**
     * Id của khối
     */
    gradeId() {
      if (this.comboboxArray.Grade) {
        return this.convertStringToGuid(
          this.comboboxArray.Grade,
          this.gradeSource,
          "Grade"
        );
      }
    },

    /**
     * Kiểm tra trạng thái bài tập (thêm mới hay sửa)
     */
    isAdd() {
      if (this.$route.params.id) {
        return false;
      } else return true;
    },
  },
  watch: {
    /**
     * Gán giá trị bài tập cho component khi bài tập thay đổi
     */
    currentExercise: {
      handler(val) {
        if (val) {
          this.exerciseName = val.ExerciseName;
          this.comboboxArray.Subject = this.convertGuidToString(
            val.SubjectId,
            this.subjectSource,
            "Subject"
          );
          this.comboboxArray.Grade = this.convertGuidToString(
            val.GradeId,
            this.gradeSource,
            "Grade"
          );
          if (!this.isAdd) {
            this.questions = val.Questions;
          }
        }
      },
      deep: true,
    },

    /**
     * Thêm update field bài tập khi thay đổi giá trị combobox
     */
    comboboxArray: {
      handler(val) {
        this.currentExercise.SubjectId = this.subjectId;
        this.currentExercise.GradeId = this.gradeId;
        this.addUpdateFields("Exercise");
      },
      deep: true,
    },

    /**
     * Thêm update field bài tập khi thay đổi tên bài tập
     * @param {*} val tên bài tập
     */
    exerciseName(val) {
      this.currentExercise.ExerciseName = val;
      this.addUpdateFields("Exercise");
    },
  },
  methods: {
    ...mapActions(questionStore, ["resetStore"]),
    ...mapActions(comboboxStore, ["getGradeDb", "getSubjectDb"]),
    ...mapActions(exerciseStore, [
      "getOneExerciseDb",
      "resetStore",
      "addUpdateFields",
      "resetUpdateFields",
      "upsert",
    ]),

    /**
     * Mở popup sửa thông tin bài tập
     */
    showAddInfoPopup() {
      this.isShowAddInfoPopup = true;
    },

    /**
     * Đóng popup sửa thông tin bài tập
     */
    closeAddInfoPopup() {
      this.isShowAddInfoPopup = false;
    },

    /**
     * Về trang chủ
     */
    goToHome() {
      this.$router.replace("/");
    },

    /**
     * Lưu thông tin bài tập hiện tại và gọi api
     */
    submitExercise() {
      if (this.updateFields.length || !this.isAdd) {
        this.currentExercise.ExerciseStatus = 1;
        this.upsert("Exercise");
      } else {
        this.isShowAddInfoPopup = true;
      }
    },
  },
};
</script>

<style scoped>
.header {
  box-shadow: 0 3px 20px rgba(90, 125, 141, 0.16);
  padding-right: 0.75rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  gap: 1rem;
  background-color: #fff;
}
.header-top {
  padding-right: 0.75rem;
  gap: 1rem;
}
.header-top-left {
  padding-right: 0.75rem;
  gap: 1rem;
  align-items: center;
}
.btn-back {
  margin-left: 1.5rem;
}
.header-top-avatar {
  width: 2.5rem;
  height: 2.5rem;
}
.header-top-name input {
  border: none;
  outline: none;
  color: #4e5b6a;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
}
.header-bottom {
  padding-left: 4rem;
  justify-content: space-between;
}
.header-bottom-left {
  gap: 0.75rem;
}
.content.compose {
  width: calc(100% - 344px);
  margin: 0 auto;
}
.content {
  height: calc(100% - 128px);
}
</style>
