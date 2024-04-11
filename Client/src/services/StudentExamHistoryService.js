import api from "./Api"

export default {
  create (data) {
    return api().post(`api/StudentExamHistory`, data);
  },
}