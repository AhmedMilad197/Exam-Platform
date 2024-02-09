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
    return api().get('api/Student/allStudent');
  },
  getTeacherStudent (teacherId) {
    // return api().get(`/student/${teacherId}`, {
    //   params: {
    //     subject: teacherId
    //   }
    // })
  },
  login (credintials) {
    return api().post('api/Student/login', credintials);
  },
  availableStudents (courseId) {
    return api().get(`api/Student/available/${courseId}`);
  }
}