import api from "./Api"

export default {
  create (data) {
    return api().post(`api/ExamStudent`, data);
  },
  getExamScore (data) {
    return api().post('api/ExamStudent/exam', data);
  },
  getStudents (id) {
    return api().get(`api/ExamStudent/students/${id}`);
  },
  storeToExcel (id) {
    return api().get(`api/ExamStudent/excel/store/${id}`);
  }
}