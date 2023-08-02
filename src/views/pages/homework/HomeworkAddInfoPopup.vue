<template>
  <div class="overlay" @mousedown="initView">
    <div class="dialog" aria-modal="true" role="dialog" aria-label="dialog">
      <div class="dialog-header">
        <div class="dialog-title">{{ exerciseResource.InfoForm.FormName }}</div>
        <button
          aria-label="close"
          class="dialog-header-btn"
          type="button"
          @click="closeAddInfoPopup"
        >
          <div class="header-icon icon-delete-header"></div>
        </button>
      </div>
      <div class="dialog-body">
        <Loading v-if="isLoading"></Loading>
        <div v-else class="dialog-content flex-row">
          <form action="" class="dialog-form flex-row">
            <div class="content-left flex-column">
              <div class="title subtitle">
                {{ exerciseResource.InfoForm.Image }}
              </div>
              <div class="image-container relative">
                <img
                  class="image"
                  src="https://sisapapp.misacdn.net/lms/img/tienganh.d1e304bc.png"
                  alt=""
                />
                <div class="change-avatar absolute" @click="chooseAvatar">
                  <label for="" class="pointer">
                    <img
                      src="https://sisapapp.misacdn.net/lms/img/ic_upload-image.cfc6e712.svg"
                      alt=""
                      width="40"
                      height="40"
                    />
                  </label>
                  <input
                    ref="inputAvatar"
                    type="file"
                    accept=".png,.jpg,.jpeg,.bmp"
                    class="change-avatar-input absolute"
                    multiple
                  />
                </div>
              </div>
            </div>
            <div class="content-right">
              <Input
                Label="true"
                Required="true"
                v-model="exerciseName"
                ref="exerciseName"
                >{{ exerciseResource.InfoForm.Exercise }}</Input
              >
              <div class="grid">
                <Combobox
                  Width="100%"
                  Label="true"
                  Required="true"
                  :Content="subject"
                  :Placeholder="subject[0]"
                  v-model="comboboxArray.Subject"
                  ref="subject"
                  >{{ exerciseResource.InfoForm.Subject }}</Combobox
                >
                <Combobox
                  Width="100%"
                  Label="true"
                  Required="true"
                  :Content="grade"
                  :Placeholder="grade[0]"
                  v-model="comboboxArray.Grade"
                  ref="grade"
                  >{{ exerciseResource.InfoForm.Grade }}</Combobox
                >
              </div>
              <!-- <ComboboxMultiple
                Width="100%"
                Label="true"
                :Content="comboboxLesson"
                Placeholder="Chọn chủ đề"
                :NeedDelete="true"
                @chooseValue="getExercise"
                v-model="exercise"
                >Chủ đề</ComboboxMultiple
              > -->
              <Combobox
                Width="100%"
                Label="true"
                :NeedDelete="true"
                :Content="topic"
                Placeholder="Chọn chủ đề"
                v-model="comboboxArray.Topic"
                >{{ exerciseResource.InfoForm.Topic }}</Combobox
              >
              <TextAreaSuggest
                Label="true"
                @chooseTag="getTag"
                :Suggest="suggestTags"
                v-model="tags"
                >{{ exerciseResource.InfoForm.Tag }}</TextAreaSuggest
              >
            </div>
          </form>
        </div>
      </div>
      <div class="dialog-footer">
        <div class="footer-toolbar">
          <Button
            Type="secondary"
            Color="default"
            Additional="mr-3"
            @click="closeAddInfoPopup"
            >{{ exerciseResource.InfoForm.CloseBtn }}</Button
          >
          <Button Type="primary" Color="gradient" @click="submitInfoPopup">{{
            exerciseResource.InfoForm.AddBtn
          }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { comboboxStore } from "../../../js/base/comboboxstore.js";
import { exerciseStore } from "../../../js/base/exercisestore.js";
import { mapActions, mapState } from "pinia";
import ExerciseResource from "../../../js/base/locale/VN/homework/exercise";
export default {
  name: "HomeworkAddInfoPopup",
  props: ["Info", "IsAdd"],
  emits: ["closeAddInfoPopup"],
  data() {
    return {
      exerciseResource: ExerciseResource,
      suggestTags: [
        "asa",
        "bsb",
        "cscs",
        "On tap hoc ki II",
        "good night, girls",
      ],
      exerciseName: "",
      comboboxArray: {
        Subject: "Toán",
        Grade: "Khối 1",
        Topic: "",
      },

      tags: [],
      isLoading: true,
      isInit: false,
      cachedName: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.exerciseName.focus();
    });

    /**
     * Gán giá trị ban đầu của bài tập cho popup info khi mở
     */
    if (Object.keys(this.Info).length) {
      this.comboboxArray.Grade = this.convertGuidToString(
        this.Info.GradeId,
        this.gradeSource,
        "Grade"
      );

      this.comboboxArray.Subject = this.convertGuidToString(
        this.Info.SubjectId,
        this.subjectSource,
        "Subject"
      );
      if (this.Info.ExerciseTag) {
        this.tags.push(this.Info.ExerciseTag);
      }
    }

    /**
     * Gán tên nháp cho bài tập chưa được khởi tạo
     */
    if (!this.IsAdd) {
      if (!this.Info.ExerciseName) {
        this.exerciseName =
          "Bài nháp " +
          this.convertGuidToString(
            this.Info.SubjectId,
            this.subjectSource,
            "Subject"
          ) +
          " - " +
          this.convertGuidToString(
            this.Info.GradeId,
            this.gradeSource,
            "Grade"
          );
      } else {
        this.exerciseName = this.Info.ExerciseName;
      }
    }
    this.cachedName = this.exerciseName;
    this.getGradeDb();
    this.getSubjectDb();
    this.getTopicDb();
    this.updateTopic(this.gradeId, this.subjectId);
  },
  watch: {
    /**
     * Kiểm tra môn học hiện tạo
     * @param {*} val môn học hiên tại
     */
    "comboboxArray.Subject"(val) {
      this.updateTopic(this.gradeId, this.subjectId);
    },

    /**
     * Kiểm tra khối hiện tại
     * @param {*} val khối hiện tại
     */
    "comboboxArray.Grade"(val) {
      this.updateTopic(this.gradeId, this.subjectId);
    },

    /**
     * Kiểm tra danh sách chủ đề hiện tại, gán lại giá trị chủ đề hiện tại nếu danh sách thay đổi
     */
    topic: {
      handler(val) {
        if (this.isInit == true) {
          this.comboboxArray.Topic = "";
        }
      },
      deep: true,
      immediate: false,
    },

    /**
     * Lấy topic hiện tại và gán vào combobox input
     */
    topicSource: {
      handler(val) {
        if (this.Info.TopicId) {
          this.comboboxArray.Topic = this.convertGuidToString(
            this.Info.TopicId,
            this.topicSource,
            "Topic"
          );
        }

        this.isLoading = false;
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(comboboxStore, [
      "grade",
      "subject",
      "topic",
      "subjectSource",
      "gradeSource",
      "topicSource",
    ]),
    ...mapState(exerciseStore, ["currentExercise"]),

    /**
     * Danh sách các trường cần validate
     */
    validationList() {
      return {
        exerciseName: this.exerciseName,
        grade: this.comboboxArray.Grade,
        subject: this.comboboxArray.Subject,
      };
    },

    /**
     * Lấy id môn học
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
     * Lấy id khối
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
     * Lấy id chủ đề
     */
    topicId() {
      if (this.comboboxArray.Topic) {
        return this.convertStringToGuid(
          this.comboboxArray.Topic,
          this.topicSource,
          "Topic"
        );
      }
    },
  },
  methods: {
    ...mapActions(comboboxStore, [
      "getGradeDb",
      "getSubjectDb",
      "getTopicDb",
      "updateTopic",
    ]),
    ...mapActions(exerciseStore, ["addUpdateFields"]),

    /**
     * Chọn ảnh
     */
    chooseAvatar() {
      this.$refs.inputAvatar.click();
    },

    /**
     * Thêm 1 tag vào ds tag
     */
    getTag(val) {
      this.tags = val;
    },

    /**
     * Gửi đi event đóng info popup
     */
    closeAddInfoPopup() {
      this.$emit("closeAddInfoPopup");
    },

    /**
     * Khởi tạo logic của combobox chủ đề khi click vào popup lần đầu
     */
    initView() {
      this.isInit = true;
    },

    /**
     * Lưu thông tin bài tập hiện tại và gửi đi event đóng info popup
     */
    submitInfoPopup() {
      if (this.validateData()) {
        if (this.exerciseName != this.cachedName) {
          this.currentExercise.ExerciseName = this.exerciseName;
        }
        if (this.comboboxArray.Topic) {
          this.currentExercise.TopicId = this.topicId;
        } else {
          this.currentExercise.TopicId = null;
        }
        this.currentExercise.SubjectId = this.subjectId;
        this.currentExercise.GradeId = this.gradeId;
        if (this.tags.length) {
          this.currentExercise.ExerciseTag = this.tags[0];
        } else {
          this.currentExercise.ExerciseTag = null;
        }
        this.addUpdateFields("Exercise");
        this.$emit("closeAddInfoPopup");
      }
    },

    /**
     * Kiểm tra dữ liệu
     */
    validateData() {
      let isValid = true;
      Object.keys(this.validationList).forEach((val) => {
        if (!this.validationList[val]) {
          this.$refs[val].isError = true;
          isValid = false;
        }
      });
      return isValid;
    },
  },
};
</script>

<style scoped>
.overlay {
  z-index: 2056;
  font-weight: 500;
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
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 800px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
  margin: 0 auto 50px;
  background: #fff;
  box-sizing: border-box;
}
.dialog .dialog-header {
  padding: 24px;
}
.dialog-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  color: #4e5b6a;
}
.dialog-header-btn {
  width: 16px;
  height: 20px;
  top: 16px;
  right: 16px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  overflow: visible;
}
.dialog .dialog-body {
  padding: 0 24px 24px;
  word-break: break-word;
  color: #606266;
  font-size: 14px;
}
.dialog-content,
.dialog-form {
  font-weight: 500;
}
.dialog-content .content-left {
  width: 260px;

  font-weight: 500;
}
.dialog-content .content-right {
  width: calc(100% - 260px);
  padding-left: 40px;
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: 16px;
  /* overflow: auto; */
  font-weight: 500;
}
.dialog-content .content-left .title {
  color: #4e5b6a;
  font-weight: 500;
  padding-bottom: 4px;
}
.subtitle {
  font-size: 14px;
  line-height: 20px;
}
.dialog-content .content-left .image-container {
  border-radius: 10px;
  background-color: #f1f2f7;
  width: 100%;
  height: 156px;
  overflow: hidden;
  margin-bottom: 8px;
  font-weight: 500;
}
.dialog-content .content-left .image-container .image {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
.dialog-content .content-left .change-avatar {
  color: #8a6bf6;
  bottom: 0.75rem;
  right: 0.75rem;
}
.change-avatar-input {
  display: none;
  bottom: 0.75rem;
  right: 0.75rem;
}
.dialog-content .content-right .grid {
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-column-gap: 12px;
}
.dialog .dialog-footer {
  padding: 0 24px 24px;
  text-align: right;
  box-sizing: border-box;
}
.header-icon {
  color: #909399;
}
</style>
