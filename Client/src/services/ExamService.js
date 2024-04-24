import api from "./Api"

export default {
  show (data) {
    return api().get(`api/Teacher/${data.id}`);
  },
  addQuestions(data) {
    return api().post('api/Exam/addExam', data);
  },
  getExam(data) {
    return api().post('api/Exam', {data});
  },
  getAllExams(data) {
    return api().post('api/Exam/allExam', data);
  },
  viewExam(data) {
    return api().post('api/Exam/view', {data});
  },
  delete(examId) {
    return api().delete(`api/Exam/${examId}`);
  }
}