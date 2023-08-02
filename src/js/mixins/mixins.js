/**
 * Các hàm chuyển đổi kiểu dữ liệu
 */
export default {
  methods: {
    /**
     * Chuyển từ string sang enum
     * @param {*} string Chuỗi cần chuyển
     * @param {*} resourceSource Nguồn resource để tham chiếu
     * @param {*} enumSrouce Tên của nguồn resource
     * @returns Enum
     */
    convertStringToEnum(string, resourceSource, enumSrouce) {
      for (let key in resourceSource) {
        if (resourceSource[key] == string) {
          return enumSrouce[key];
        }
      }
    },

    /**
     * Chuyển từ enum sang string
     * @param {*} enums enum cần chuyển
     * @param {*} resourceSource Nguồn resource để tham chiếu
     * @param {*} enumSrouce Tên của nguồn resource
     * @returns String
     */
    convertEnumToString(enums, resourceSource, enumSrouce) {
      for (let key in enumSrouce) {
        if (enumSrouce[key] == enums) {
          return resourceSource[key];
        }
      }
    },

    /**
     * Chuyển từ guid sang string
     * @param {*} guid guid cần chuyển
     * @param {*} dataSource Nguồn resource để tham chiếu
     * @param {*} dataSourceName Tên của nguồn resource
     * @returns string
     */
    convertGuidToString(guid, dataSource, dataSourceName) {
      return dataSource?.find((obj) => {
        return obj[dataSourceName + "Id"] == guid;
      })[dataSourceName + "Name"];
    },

    /**
     * Chuyển từ string sang guid
     * @param {*} string string cần chuyển
     * @param {*} dataSource Nguồn resource để tham chiếu
     * @param {*} dataSourceName Tên nguồn resource
     * @returns Guid
     */
    convertStringToGuid(string, dataSource, dataSourceName) {
      return dataSource?.find((obj) => {
        return obj[dataSourceName + "Name"] == string;
      })[dataSourceName + "Id"];
    },

    /**
     * Chuyển từ number sang Boolean
     * @param {*} value number
     * @returns Boolean
     */
    convertBoolToNumber(value) {
      return value ? 1 : 0;
    },
  },
};
