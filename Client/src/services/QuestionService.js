import api from "./Api"

export default {
  create (data) {
    return api().post('api/Questions/addQuestion', data);
  },
  update (data) {
    return api().put(`api/Questions/${data.question_id}`, data.question_content);
  },
  index () {
    return api().get('api/Questions/allQuestion');
  },
  show (data) {
    return api().get(`api/Questions/${data.id}`);
  },
  delete (question_id) {
    return api().delete(`api/Questions/${question_id}`);
  },
  getTeacherQuestions (credintials) {
    return api().post('api/Questions/teacher-questions', credintials);
  }
}