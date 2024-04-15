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
  },
  getCourseQuestions(data) {
    return api().post('api/Teacher/course/questions', data);
  },
  sendOTP(data) {
    return api().post('api/Teacher/sendOTP', data);
  },
  verifyOTP(data) {
    return api().post('api/Teacher/otp-verification', data);
  },
  resetPassword(data) {
    return api().post('api/Teacher/reset-password', data);
  },
  getExams(data) {
    return api().post('api/Teacher/exams', data);
  },
  block(data) {
    return api().post('api/Teacher/block', data);
  },
  unBlock(data) {
    return api().post('api/Teacher/unblock', data);
  },
  removeStudent(data) {
    return api().post('api/Teacher/students/remove', data);
  },
  getSubjects(id) {
    return api().get(`api/Teacher/courses/${id}`);
  }
}