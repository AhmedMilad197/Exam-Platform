import api from "./Api"

export default {
  create (data) {
    return api().post('api/Student/addStudent', data);
  },
  show (data) {
    return api().get(`api/Student/${data.id}`);
  },
  update (data) {
    return api().put('student/update', data);
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