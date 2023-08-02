<template>
  <div class="homework-storage w-full flex-center">
    <div class="storage-tab h-full">
      <div class="title-storage flex-row">
        <div class="title-storage-left flex-row">
          <template v-for="tab in homeworkTabs">
            <div to="" :class="['title-storage-tab', 'flex-center']">
              {{ tab.Text }}
            </div>
          </template>
        </div>
        <div class="title-storage-right">
          <Button Type="secondary" Color="default" Additional="mr-3">{{
            exerciseResource.Landing.ShareBtn
          }}</Button>
          <Button
            Type="primary"
            Color="gradient"
            Additional="mr-3"
            @click="addToast('Add')"
            >{{ exerciseResource.Landing.AddGame }}</Button
          >
          <Button
            @click="goToCreate"
            Type="primary"
            Color="gradient"
            Additional="mr-3"
            >{{ exerciseResource.Landing.Compose }}</Button
          >
        </div>
      </div>
      <div class="w-full grid-homework relative">
        <HomeworkSingle></HomeworkSingle>
        <div class="list-my-post w-full relative">
          <Loading v-if="isLoading"></Loading>
          <template v-else>
            <div class="w-full">
              <div class="w-full">
                <Search v-model="searchField"></Search>
              </div>
              <div class="w-full flex-row mt-3">
                <Combobox
                  Additional="mr-3"
                  :Content="comboboxCompose"
                  Width="150px"
                  Placeholder="Tất cả học liệu"
                  :NeedDelete="true"
                  v-model="filter.Compose"
                ></Combobox>
                <Combobox
                  Additional="mr-3"
                  Width="175px"
                  :Content="subject"
                  Placeholder="Tất cả các môn"
                  :NeedDelete="true"
                  v-model="filter.Subject"
                ></Combobox>
                <Combobox
                  Additional="mr-3"
                  Width="175px"
                  :Content="grade"
                  Placeholder="Tất cả các khối"
                  :NeedDelete="true"
                  v-model="filter.Grade"
                ></Combobox>
              </div>
            </div>
            <div v-if="total" class="item-container">
              <div class="grid-view w-full">
                <div class="grid-container">
                  <HomeworkItem
                    v-for="item in exercise"
                    @goToUpdate="goToUpdate(item.ExerciseId)"
                    @deleteExercise="handleDeleteExercise(item.ExerciseId)"
                    :Exercise="item"
                    :GradeSource="gradeSource"
                    :SubjectSource="subjectSource"
                  ></HomeworkItem>
                </div>
                <div class="flex-center">
                  <Button
                    v-if="limit < total"
                    Color="gradient"
                    Type="primary"
                    @click="showMoreItem"
                    >{{ exerciseResource.Landing.MoreBtn }}</Button
                  >
                </div>
              </div>
            </div>
            <div v-else class="not-found-container">
              <img
                src="https://sisapapp.misacdn.net/lms/img/not-found.33e6a465.svg"
                alt=""
              />
              <div class="message-not-found">
                {{ exerciseResource.Landing.Notfound }}
              </div>
            </div>
          </template>
        </div>
        <!-- <div class="w-full list-favorite">
          <div class="flex-column">
            <div class="title">Học liệu bạn đã yêu thích</div>
            <div class="item-container mt-3">
              <div class="grid-view w-full">
                <div class="grid-container">
                  <HomeworkItem></HomeworkItem>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
  <teleport to="body">
    <Dialog
      v-if="isShowDialog"
      Type="confirm"
      @closeDialog="closeDialog"
      @confirmDialog="confirmDeleteExercise"
      >{{ dialogText }}</Dialog
    >
  </teleport>
</template>

<script>
import HomeworkSingle from "./HomeworkSingle.vue";
import HomeworkItem from "./HomeworkItem.vue";
import { comboboxStore } from "../../../js/base/comboboxstore.js";
import { exerciseStore } from "../../../js/base/exercisestore.js";
import { mapActions, mapState } from "pinia";
import ExerciseResource from "../../../js/base/locale/VN/homework/exercise.js";
import CRUD from "../../../js/base/crud.js";
export default {
  name: "homework-page",
  components: { HomeworkSingle, HomeworkItem },
  data() {
    return {
      homeworkTabs: {
        Single: {
          Page: "single",
          Text: "Cá nhân",
        },
        School: {
          Page: "school",
          Text: "Trường học",
        },
        Community: {
          Page: "community",
          Text: "Cộng đồng",
        },
      },
      searchField: "",
      filter: {
        Compose: "",
        Subject: "",
        Grade: "",
      },
      comboboxCompose: ["Đã soạn", "Đang soạn"],
      homeworkItems: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
      ],
      offset: 0,
      limit: 6,
      exerciseResource: ExerciseResource,
      isLoading: true,
      isShowDialog: false,
      dialogText: "Bạn có muốn xóa bài tập đã chọn ?",
      chosenId: null,
    };
  },
  mounted() {
    /**
     * Khởi tạo giá trị combobox khi vào trang chủ, lấy toàn bộ bản ghi
     */
    this.getGradeDb();
    this.getSubjectDb();
    this.getTopicDb();
    this.getExerciseDb(this.queryString);
    this.getTotalExerciseDb(this.queryString);
  },
  watch: {
    /**
     * Kiểm tra chuỗi query hiện tại, gọi api lấy toàn bộ bản ghi theo
     */
    queryString(val) {
      this.getExerciseDb(val);
      this.getTotalExerciseDb(val);
    },

    /**
     * Kiểm tra giá trị combobox hiện tại, đặt lại page number về mặc định
     */
    filter: {
      handler(newVal, oldVal) {
        this.isLoading = true;
        this.limit = 6;
      },
      deep: true,
    },

    /**
     * Kiểm tra giá trị tìm kiếm, đặt lại page number về mặc định
     */
    searchField(newVal, oldVal) {
      if (newVal != oldVal) {
        this.isLoading = true;
        this.limit = 6;
      }
    },

    /**
     * Kiểm tra xem có bài tập chưa
     */
    exercise: {
      handler(val) {
        if (val) {
          this.isLoading = false;
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(comboboxStore, [
      "grade",
      "subject",
      "gradeSource",
      "subjectSource",
    ]),
    ...mapState(exerciseStore, ["exercise", "total"]),

    /**
     * Chuỗi phân trang, bộ lọc, tìm kiếm
     */
    queryString() {
      let exerciseStatus =
        this.filter.Compose.length > 0
          ? this.convertStringToEnum(
              this.filter.Compose,
              this.exerciseResource.ExerciseStatus,
              this.$enum.ExerciseStatus
            )
          : "";
      let gradeId =
        this.filter.Grade.length > 0
          ? this.convertStringToGuid(
              this.filter.Grade,
              this.gradeSource,
              "Grade"
            )
          : "";
      let subjectId =
        this.filter.Subject.length > 0
          ? this.convertStringToGuid(
              this.filter.Subject,
              this.subjectSource,
              "Subject"
            )
          : "";
      return `?Offset=${this.offset}&Limit=${this.limit}&SearchField=${this.searchField}&ExerciseStatus=${exerciseStatus}&GradeId=${gradeId}&SubjectId=${subjectId}`;
    },
  },
  methods: {
    ...mapActions(comboboxStore, [
      "getGradeDb",
      "getSubjectDb",
      "getTopicDb",
      "initGrade",
      "initSubject",
      "initTopic",
    ]),
    ...mapActions(exerciseStore, [
      "getExerciseDb",
      "getTotalExerciseDb",
      "resetStore",
      "deleteExercise",
    ]),

    /**
     * Đi tới trang thêm mới bài tập
     */
    goToCreate() {
      this.resetStore();
      this.$router.replace({ name: "create" });
    },

    /**
     * Đi tới trang cập nhật bài tập
     */
    goToUpdate(id) {
      this.$router.push({ name: "update", params: { id } });
    },

    /**
     * Mở dialog xóa bài tập hiện tại
     * @param {*} id Id bài tập cần xóa
     */
    handleDeleteExercise(id) {
      this.isShowDialog = true;
      this.chosenId = id;
    },

    /**
     * Xóa bài tập được chọn hiện tại
     */
    confirmDeleteExercise() {
      this.isShowDialog = false;
      this.deleteExercise([this.chosenId]).then(() => {
        this.isLoading = true;
        this.getExerciseDb(this.queryString);
        this.getTotalExerciseDb(this.queryString);
      });
    },

    /**
     * Tăng page number
     */
    showMoreItem() {
      this.limit += 6;
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
.homework-storage {
  height: calc(100% - 20px);

  scrollbar-width: thin;
}
.item-container {
  margin-top: 1.25rem;
}
.storage-tab {
  width: 1024px;
}
.title-storage {
  position: fixed;
  justify-content: space-between;
  top: 60px;
  width: 1024px;
  z-index: 100;
  height: 70px;
  padding-top: 1rem;
  background-color: rgba(255, 255, 255, 1);
}
.title-storage-tab {
  height: 40px;
  border-radius: 10px;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
  color: #4e5b6a;
}
.title-storage-tab:nth-of-type(1) {
  margin-left: 0.5rem;
}
.title-storage-tab.is-active {
  overflow: hidden;
  background-color: #ece7fe;
  color: #8a6bf6;
}
.grid-homework {
  margin-top: 4rem;
}
.list-my-post {
  padding: 0.5rem;
}
.grid-view .grid-container {
  display: grid;
  grid-gap: 24px;
  padding-bottom: 10px;
}
.grid-container {
  grid-template-columns: 1fr 1fr 1fr;
}
.title {
  color: rgba(78, 91, 106, 1);
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
}
.not-found-container {
  margin-top: 24px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
}
.message-not-found {
  font-size: 16px;
  line-height: 24px;
  color: #4e5b6a;
}
</style>
