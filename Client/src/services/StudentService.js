import api from "./Api"

export default {
  create (data) {
    return api().post('api/Student/addStudent', data);
  },
  show (data) {
    return api().get(`api/Student/${data.id}`);
  },
  update (data) {
    return api().put(`api/Student/${data.id}`, data);
  },
  delete (studentId) {
    return api().delete(`api/Student/${studentId}`);
  },
  index () {
    return api().get('api/Student/allStudent');
  },
  login (credintials) {
    return api().post('api/Student/login', credintials);
  },
  availableStudents (courseId) {
    return api().get(`api/Student/available/${courseId}`);
  },
  getSubjects(data) {
    return api().post(`api/Student/courses`, data);
  },
  getExams(data) {
    return api().post(`api/Student/exams`, data);
  }
}