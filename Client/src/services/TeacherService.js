import api from "./Api"

export default {
  show (data) {
    return api().get(`api/Teacher/${data.id}`);
  },
  index () {
    return api().get('api/Teacher/allTeacher');
  },
  login (credintials) {
    return api().post('api/Teacher/login', credintials);
  },
  availableTeachers (data) {
    return api().post('api/Teacher/availableTeachers', data);
  },
  getTeacherStudent (subjectId, teacherId) {
    return api().post(`api/Teacher/students`, {
      subject: subjectId,
      teacherId: teacherId
    });
  },
  getQuestions(data) {
    return api().post('api/Teacher/questions', data);
  }
}