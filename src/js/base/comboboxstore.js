import { defineStore } from "pinia";
import CRUD from "./crud";

/**
 * Store quản lý giá trị combobox
 */
export const comboboxStore = defineStore("combobox", {
  state: () => {
    return {
      grade: [],
      gradeSource: [],
      subject: [],
      subjectSource: [],
      topic: [],
      topicSource: [],
    };
  },
  getters: {},
  actions: {
    /**
     * Reset lại state của store
     */
    resetStore() {
      this.$patch((state) => {});
    },

    /**
     * Lấy giá trị combobox môn học khi khởi tạo project
     */
    initSubject() {
      CRUD.getAll("Subject")
        .then((res) => {
          localStorage.setItem("subject", JSON.stringify(res.data));
        })
        .catch((err) => {});
    },
    
    /**
     * Lấy giá trị combobox khối khi khởi tạo project
     */
    initGrade() {
      CRUD.getAll("Grade")
        .then((res) => {
          localStorage.setItem("grade", JSON.stringify(res.data));
        })
        .catch((err) => {});
    },

    /**
     * Lấy giá trị combobox chủ đề khi khởi tạo project
     */
    initTopic() {
      CRUD.getAll("Topic")
        .then((res) => {
          localStorage.setItem("topic", JSON.stringify(res.data));
        })
        .catch((err) => {});
    },

    /**
     * Tương tự như 3 hàm trên nhưng kiểm tra xem đã tồn tại chưa, nếu rồi thì k gọi lại api
     */
    getSubjectDb() {
      let cachedSubjectData = localStorage.getItem("subject");
      if (cachedSubjectData) {
        let data = JSON.parse(cachedSubjectData);
        this.subject = data.map((subject) => subject.SubjectName);
        this.subjectSource = data;
      } else {
        // API call
        CRUD.getAll("Subject")
          .then((res) => {
            localStorage.setItem("subject", JSON.stringify(res.data));
            this.subject = res.data.map((subject) => subject.SubjectName);
            this.subjectSource = res.data;
            console.log(res.data);
          })
          .catch((err) => {});
      }
    },

    /**
     * Tương tự như 3 hàm trên nhưng kiểm tra xem đã tồn tại chưa, nếu rồi thì k gọi lại api
     */
    getGradeDb() {
      let cachedSubjectData = localStorage.getItem("grade");
      if (cachedSubjectData) {
        let data = JSON.parse(cachedSubjectData);
        this.grade = data.map((grade) => grade.GradeName);
        this.gradeSource = data;
      } else {
        // API call
        CRUD.getAll("Grade")
          .then((res) => {
            localStorage.setItem("grade", JSON.stringify(res.data));
            this.grade = res.data.map((grade) => grade.GradeName);
            this.gradeSource = res.data;
            console.log(res.data);
          })
          .catch((err) => {});
      }
    },

    /**
     * Tương tự như 3 hàm trên nhưng kiểm tra xem đã tồn tại chưa, nếu rồi thì k gọi lại api
     */
    getTopicDb() {
      let cachedSubjectData = localStorage.getItem("topic");
      if (cachedSubjectData) {
        let data = JSON.parse(cachedSubjectData);
        this.topicSource = data;
      } else {
        // API call
        CRUD.getAll("Topic")
          .then((res) => {
            localStorage.setItem("topic", JSON.stringify(res.data));
            this.topicSource = res.data;
            console.log(res.data);
          })
          .catch((err) => {});
      }
    },

    /**
     * Lấy giá trị chủ đề tương ứng với khối và môn học hiện tại
     * @param {*} gradeId id khối lớp
     * @param {*} subjectId id môn học
     */
    updateTopic(gradeId, subjectId) {
      CRUD.getAllByGradeAndSubjectId("Topic", gradeId, subjectId)
        .then((res) => {
          this.topic = res.data.map((topic) => topic.TopicName);
          console.log(res.data);
        })
        .catch((err) => {});
    },
  },
});
