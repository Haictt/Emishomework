<template>
  <div class="homework-item" @click.stop="goToUpdate">
    <div v-if="exercise" class="thumnail-lazy">
      <div class="avatar">
        <div class="thumbnail-lazy">
          <div
            v-if="gradeSource.length"
            class="subject-content absolute flex-center"
          >
            {{ convertGuidToString(exercise.GradeId, gradeSource, "Grade") }}
            -
            {{
              convertGuidToString(exercise.SubjectId, subjectSource, "Subject")
            }}
          </div>
          <img
            src="https://sisapapp.misacdn.net/lms/img/tienganh2.d05079b8.png"
            alt=""
            class="img-back"
            width="308"
            height="172"
          />
        </div>
      </div>
      <div class="describe flex-column">
        <div class="title-describe">
          <div class="flex homework-name">
            <span class="w-64">{{ exerciseName }}</span>
          </div>
          <div class="button-more" @click.stop="showMorePopup">
            <div class="icon-option">
              <img
                src="https://sisapapp.misacdn.net/lms/img/icon_option.90d8b4a5.svg"
                alt=""
                width="4"
                height="20"
              />
            </div>
          </div>
        </div>
        <div class="flex-row questions">
          <div class="num-left flex-center">
            <img
              src="https://sisapapp.misacdn.net/lms/img/ic_number_aswer.e4999537.svg"
              alt=""
            />
            <template v-if="exercise.TotalQuestion > 0">
              <pre
                >{{ exercise.TotalQuestion }} {{
                  exerciseResource.Item.No
                }}</pre
              >
            </template>
          </div>
          <div>
            <div v-if="exercise.ExerciseStatus == 0" class="text-share">
              {{ exerciseResource.Item.Composing }}
            </div>
          </div>
        </div>
        <div class="flex-row user">
          <img
            src="https://sisapapp.misacdn.net/lms/img/ic_User_16.2bc4d930.svg"
            alt=""
          />
          {{ exerciseResource.Item.User }}
        </div>
      </div>
    </div>
    <div v-else class="">{{ exerciseResource.Item.Loading }}</div>
    <div v-if="isShowMorePopup" class="more-popup" v-outside="hidePopup">
      <div class="view-detail" @click.stop="goToUpdate">
        {{ exerciseResource.Item.View }}
      </div>
      <div class="view-detail" @click.stop="deleteExercise">
        {{ exerciseResource.Item.Delete }}
      </div>
    </div>
  </div>
</template>

<script>
import ExerciseResource from "../../../js/base/locale/VN/homework/exercise.js";
export default {
  name: "homework-item",
  emits: ["goToUpdate", "deleteExercise"],
  props: ["Exercise", "SubjectSource", "GradeSource"],
  data() {
    return {
      isShowMorePopup: false,
      exercise: {},
      gradeSource: [],
      subjectSource: [],
      exerciseResource: ExerciseResource,
    };
  },
  mounted() {
    /**
     * Gán giá trị ban đầu
     */
    this.exercise = this.Exercise;
    this.gradeSource = this.GradeSource;
    this.subjectSource = this.SubjectSource;
  },
  watch: {},
  computed: {
    /**
     * Kiểm tra tên bài tập, nếu null thì gán tạm thời
     */
    exerciseName() {
      if (!this.Exercise.ExerciseName) {
        return (
          "Bài nháp " +
          this.convertGuidToString(
            this.Exercise.SubjectId,
            this.SubjectSource,
            "Subject"
          ) +
          " - " +
          this.convertGuidToString(
            this.Exercise.GradeId,
            this.GradeSource,
            "Grade"
          )
        );
      } else {
        return this.exercise.ExerciseName;
      }
    },
  },
  methods: {
    /**
     * Mở list khi bấm nút 3 chấm
     */
    showMorePopup() {
      this.isShowMorePopup = !this.isShowMorePopup;
    },

    /**
     * Đóng popup 3 chấm
     */
    hidePopup() {
      this.isShowMorePopup = false;
    },

    /**
     * Gửi đi event đi tới trang sửa bài tập
     */
    goToUpdate() {
      this.$emit("goToUpdate");
    },

    /**
     * Gửi đi event xóa bài tập hiện tại
     */
    deleteExercise() {
      this.$emit("deleteExercise");
    },
  },
};
</script>

<style scoped>
.homework-item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 20px rgba(90, 125, 141, 0.16);
  width: 310px;
  height: 200px;
  position: relative;
  width: 100%;
  display: block;
  cursor: pointer;
}
.homework-item .thumbnail-lazy {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  background-size: cover;
  background: no-repeat 50%;
  background-color: #fff;
}
.homework-item .avatar {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: block;
  padding-top: 32.1428571429%;
  border-radius: 10px 10px 0 0;
}
.homework-item .describe {
  position: relative;
  width: 100%;
  height: 100px;
  padding: 0.75rem;
  gap: 0.125rem;
  justify-content: space-between;
}
.avatar .thumbnail-lazy {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  background-size: cover;
  background: no-repeat 50%;
  background-color: #fff;
}
.subject-content {
  color: rgba(255, 255, 255, 1);
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: rgba(0, 169, 236, 1);
  border-bottom-right-radius: 10px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  left: 0;
  top: 0;
}
.avatar .thumbnail-lazy img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
.button-more {
  height: 32px;
  width: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  overflow: hidden;
  margin: 12px 0;
  z-index: 2;
}
.icon-option {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0;
}
.homework-name {
  width: calc(100% - 10px);
  justify-content: space-between;
}
.w-64 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #4e5b6a;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  width: 16rem;
}
.questions {
  align-items: center;
}
.num-left {
  font-size: 16px;
  color: #4e5b6a;
}
.num-left img {
  height: 1rem;
  margin-right: 0.5rem;
}
.text-share {
  font-size: 12px;
  margin: 0 0 0 6px;
  padding: 5px;
  background-color: #e8e1fd;
  border-radius: 6px;
  text-align: center;
  overflow: hidden;
  color: #8a6bf6 !important;
}
.user {
  color: rgba(78, 91, 106, 1);
  align-items: center;
}
.user img {
  margin-right: 0.5rem;
  height: 1rem;
}
.more-popup {
  position: absolute;
  background: #fff;
  min-width: 56px;
  border-radius: 10px;
  border: 1px solid #ebeef5;
  padding: 12px;
  z-index: 2000;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
  bottom: -20%;
  right: 12%;
  z-index: 2169;
  width: 136px;
}
.view-detail {
  width: 112px;
  padding: 8px;
  cursor: pointer;
}
.view-detail:hover {
  color: #8a6bf6;
  font-weight: 700;
}
</style>
