/**
 * Resource toast
 */
const Toast = {
  Add: {
    icon: "success",
    msg: "Soạn bài thành công!",
  },
  Delete: {
    icon: "success",
    msg: "Xóa thành công!",
  },
  RequireAnswer: {
    icon: "warning",
    msg: "Câu hỏi phải có ít nhất 1 đáp án",
  },
  Internal: {
    icon: "error",
    msg: "Có lỗi xảy ra. Vui lòng liên hệ MISA để được trợ giúp.",
  },
  NotFound: {
    icon: "error",
    msg: "Tài nguyên không tồn tại.",
  },
  Conflict: {
    icon: "error",
    msg: "Không thể thay đổi tài nguyên hệ thống.",
  },
  NotValid: {
    icon: "error",
    msg: "Tài nguyên không hợp lệ. Vui lòng kiểm tra lại các trường thông tin.",
  },
};
export default Toast;
