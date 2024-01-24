import api from "./Api"

export default {
  show (creditials) {
    return api().post('student', creditials);
  },
  update (data) {
    return api().post('student/update', data);
  },
  index () {
    return api().get('student/all');
  },
  getTeacherStudent (teacherId) {
    return api().get(`/student/${teacherId}`, {
      params: {
        subject: teacherId
      }
    })
  }
}