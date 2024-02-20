import api from "./Api"

export default {
  show (data) {
    return api().get(`api/Teacher/${data.id}`);
  },
  addQuestions(data) {
    return api().post('api/Exam/addExam', data);
  }
}