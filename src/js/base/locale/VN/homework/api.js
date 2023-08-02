/**
 * API của project
 */
const API = {
  Grade: {
    GetAll: "https://localhost:44377/api/v1/Grades",
    GetOne: "https://localhost:44377/api/v1/Grades/",
  },
  Subject: {
    GetAll: "https://localhost:44377/api/v1/Subjects",
    GetOne: "https://localhost:44377/api/v1/Subjects/",
  },
  Exercise: {
    GetAllByFilter: "https://localhost:44377/api/v1/Exercises/filter",
    GetTotalByFilter: "https://localhost:44377/api/v1/Exercises/total",
    GetOne: "https://localhost:44377/api/v1/Exercises/",
    Upsert: "https://localhost:44377/api/v1/Exercises/upsert",
    Delete: "https://localhost:44377/api/v1/Exercises",
  },
  Topic: {
    GetAll: "https://localhost:44377/api/v1/Topics",
    GetOne: "https://localhost:44377/api/v1/Topics/",
    GetAllTopicByGradeAndSubjectId:
      "https://localhost:44377/api/v1/Topics/grade-subject",
  },
  Question: {
    Delete: "https://localhost:44377/api/v1/Questions",
  },
};
export default API;
