<template>
  <div class="compose-exercise-content">
    <div class="extract flex-column flex-center">
      <div class="extract-title">{{ questionResource.NoQuestion.AI }}</div>
      <div class="upload-wrap flex-row relative">
        <div class="btn-download-wrap absolute">
          <Button Type="third" Color="purple" Additional="mt-3 mr-3">{{
            questionResource.NoQuestion.Upload
          }}</Button>
          <Button Type="third" Color="green" Additional="mt-3 mr-3">{{
            questionResource.NoQuestion.Template
          }}</Button>
        </div>
        <div class="file-container extract-content">
          <label for="" class="drop-zone">
            <div
              class="file-extract w-full h-full flex-column flex-center pointer"
            >
              <div class="file-extract-icon">
                <img
                  height="64"
                  src="https://sisapapp.misacdn.net/lms/img/ic_extract.d2689d03.svg"
                  alt=""
                />
              </div>
              <div class="file-extract-desc">
                {{ questionResource.NoQuestion.Guide }}
                <br />
                {{ questionResource.NoQuestion.FileType }}
              </div>
              <div class="" style="height: 2.5rem; margin-top: 0.75rem"></div>
            </div>
          </label>
          <div class="preview-menu-container"></div>
        </div>
      </div>
    </div>
    <div class="compose">
      <div
        class=""
        style="
          margin-bottom: 1.5rem;
          font-weight: 700;
          font-size: 18px;
          line-height: 26px;
        "
      >
        {{ questionResource.NoQuestion.Or }}
      </div>
      <div class="toolbar horizontal flex-row">
        <div class="step-composing-four">
          <div class="question-library">
            <img
              class="question-icon"
              width="64"
              src="https://sisapapp.misacdn.net/lms/img/library.fc851823.svg"
              alt=""
            />
            <div class="question-desc">
              {{ questionResource.NoQuestion.Library }}
            </div>
          </div>
        </div>
        <div class="decore-horizontal">
          <img
            src="https://sisapapp.misacdn.net/lms/img/line.32d94e2c.svg"
            alt=""
          />
        </div>
        <div class="step-composing-three w-full flex-row">
          <template v-for="question in questionType">
            <div class="question" @click="showQuestionPopup(question.Type)">
              <div
                placement="left"
                hide-after="100"
                show-after="100"
                content="Thêm câu chọn đáp án"
              >
                <img :src="question.Img" class="question-icon" width="64" />
              </div>
              <div class="question-desc">{{ question.Text }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-if="isShowRecommend" class="recommend-body">
      <div class="message-container w-full absolute">
        <div class="message-class">
          <span class="text-sm pointer">
            {{ questionResource.NoQuestion.Teacher }}
            <div class="text-accent-200">
              {{ questionResource.NoQuestion.Community }}
            </div>
            {{ questionResource.NoQuestion.Help }}
          </span>
        </div>
        <img
          @click="closeRecommend"
          class="absolute pointer icon-close"
          src="https://sisapapp.misacdn.net/lms/img/ic_remove.2d9e09d5.svg"
          alt=""
        />
      </div>
      <img
        src="https://sisapapp.misacdn.net/lms/img/recommend-wonder.57d0c1c2.svg"
        alt=""
        class="mascot"
      />
    </div>
  </div>
  <teleport to="#app">
    <template v-if="isShowQuestionPopup">
      <HomeworkQuestionPopup
        :ChosenType="chosenType"
        @closeQuestionPopup="closeQuestionPopup"
      ></HomeworkQuestionPopup>
    </template>
  </teleport>
</template>

<script>
import QuestionResource from "../../../js/base/locale/VN/homework/question.js";
import HomeworkQuestionPopup from "./HomeworkQuestionPopup.vue";
export default {
  name: "homework-no-question",
  components: { HomeworkQuestionPopup },
  data() {
    return {
      chosenType: 1,
      questionType: {
        Choose: {
          Img: "https://sisapapp.misacdn.net/lms/img/select.c15dfe74.svg",
          Text: "Chọn đáp án",
          Type: 1,
        },
        Bool: {
          Img: "https://sisapapp.misacdn.net/lms/img/yesorno.7f4f0b5a.svg",
          Text: "Đúng sai",
          Type: 2,
        },
        Fill: {
          Img: "https://sisapapp.misacdn.net/lms/img/fill.af676902.svg",
          Text: "Điền vào chỗ trống",
          Type: 3,
        },
        Match: {
          Img: "https://sisapapp.misacdn.net/lms/img/pairing.4e1fb31f.svg",
          Text: "Ghép nối",
          Type: -1,
        },
        Group: {
          Img: "https://sisapapp.misacdn.net/lms/img/group.ca2a19ef.svg",
          Text: "Câu hỏi nhóm",
          Type: -1,
        },
        Write: {
          Img: "https://sisapapp.misacdn.net/lms/img/essay.e07e1e68.svg",
          Text: "Tự luận",
          Type: 4,
        },
      },
      isShowQuestionPopup: false,
      isShowRecommend: true,
      questionResource: QuestionResource,
    };
  },
  computed: {},
  methods: {
    /**
     * Mở popup thêm câu hỏi
     * @param {*} type Loại câu hỏi
     */
    showQuestionPopup(type) {
      this.chosenType = type;
      this.isShowQuestionPopup = true;
    },

    /**
     * Đóng mascot (con mèo)
     */
    closeRecommend() {
      this.isShowRecommend = false;
    },

    /**
     * Đóng popup thêm câu hỏi
     */
    closeQuestionPopup() {
      this.isShowQuestionPopup = false;
    },
  },
};
</script>

<style scoped>
.compose-exercise-content {
  color: #4e5b6a;
  height: 100%;
  padding-bottom: 20px;
}
.extract {
  padding-top: 1.5rem;
}
.compose-exercise-content .compose {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
}
.recommend-body {
  z-index: 999;
  width: 266px;
  height: 212px;
  left: 1.5rem;
  bottom: 1.5rem;
  position: fixed;
}
.extract-title {
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
}
.upload-wrap {
  width: 840px;
  height: 224px;
  justify-content: center;
}
.btn-download-wrap {
  z-index: 999;
  bottom: 1.5rem;
}
.file-container {
  width: 840px;
  height: 224px;
  border: 2px dashed #b6b9ce;
  padding: 24px 0;
  border-radius: 10px;
  text-align: center;
}
.file-container .drop-zone {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
}
.preview-menu-container {
  position: relative;
  z-index: 0;
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  overflow-y: auto;
  scrollbar-width: thin;
  white-space: nowrap;
  display: none;
}
.file-extract {
  overflow: hidden;
}
.file-extract-icon {
  margin-bottom: 16px;
  height: 64px;
}
.file-extract-desc {
}
.decore-horizontal {
  margin-right: 56px;
  display: block;
  margin-left: 1.25rem;
}
.step-composing-three {
  padding-left: 0.5rem;
}
.toolbar.horizontal .question {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 56px;
  width: 64px;
}
.question-icon {
  cursor: pointer;
  outline: none;
}
.question-icon:hover {
  transform: scale(1.1);
  transition: 0.3s;
}
.toolbar.horizontal .question-desc {
  width: max-content;
  margin-top: 12px;
}
.toolbar.horizontal .question-library {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 8px;
  width: 120px;
}
.message-container {
  z-index: 998;
  height: 100px;
}
.message-class {
  height: 100%;
  box-shadow: 0 0 transparent, 0 0 transparent, 0 0 transparent, 0 0 transparent,
    0 0px 20px 0 rgba(90, 125, 141, 0.16);
  text-align: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
  margin: 0.5rem;
}
.recommend-body .message-container .icon-close {
  width: 22px;
  z-index: 1000;
  right: 0;
  top: 0;
}
.mascot {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
</style>
