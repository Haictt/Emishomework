import API from "../base/locale/VN/homework/api.js";
import api from "./middleware.js";

/**
 * Các hàm gọi API
 */
const CRUD = {
  /**
   * Lấy tất cả bản ghi
   * @param {*} apiTarget Entity 
   * @returns tất cả bản ghi
   */
  getAll(apiTarget) {
    return api.get(API[apiTarget].GetAll);
  },

  /**
   * Lấy 1 bản ghi theo id
   * @param {*} apiTarget Entity
   * @param {*} id id của bản ghi
   * @returns 1 bản ghi
   */
  getOne(apiTarget, id) {
    return api.get(API[apiTarget].GetOne + id);
  },

  /**
   * Lấy toàn bộ bản ghi theo phân trang
   * @param {*} apiTarget Entity
   * @param {*} filterString Chuỗi bộ lộc phân trang
   * @returns Toàn bộ bản ghi theo phân trang
   */
  getAllByFilter(apiTarget, filterString) {
    return api.get(API[apiTarget].GetAllByFilter + filterString);
  },

  /**
   * Lấy tổng số bản ghi theo phân trang
   * @param {*} apiTarget Entity
   * @param {*} filterString Chuỗi bộ lộc phân trang
   * @returns Tổng số bản ghi theo phân trang
   */
  getTotalByFilter(apiTarget, filterString) {
    return api.get(API[apiTarget].GetTotalByFilter + filterString);
  },

  /**
   * Lấy toàn bộ bản ghi theo khối và lớp
   * @param {*} apiTarget Entity 
   * @param {*} gradeId Id khối
   * @param {*} subjectId Id môn học
   * @returns Toàn bộ bản ghi theo khối và lớp
   */
  getAllByGradeAndSubjectId(apiTarget, gradeId, subjectId) {
    return api.get(
      API[apiTarget].GetAllTopicByGradeAndSubjectId +
        "?gradeId=" +
        gradeId +
        "&subjectId=" +
        subjectId
    );
  },

  /**
   * Xóa nhiều bản ghi theo id
   * @param {*} apiTarget Entity
   * @param {*} ids danh sách id
   * @returns Boolean
   */
  delete(apiTarget, ids) {
    return api.delete(API[apiTarget].Delete, {
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to indicate JSON data
      },
      data: JSON.stringify(ids),
    });
  },

  /**
   * Thêm hoặc sửa 1 bản ghi
   * @param {*} body nội dung cần gửi đi
   * @returns Id của bản ghi
   */
  upsert(body) {
    return api.post(API.Exercise.Upsert, body);
  },
};
export default CRUD;
