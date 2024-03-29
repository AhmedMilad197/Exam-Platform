import api from "./Api"

export default {
  create (data) {
    return api().post(`api/ExamStudent`, data);
  }
}