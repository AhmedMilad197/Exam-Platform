import api from "./Api"

export default {
  create (data) {
    return api().post('api/Course/addCourse', data);
  },
  show (data) {
    return api().get(`api/Course/${data.id}`);
  },
  update (data, subjectId) {
    return api().put(`api/Course/${subjectId}`, data);
  },
  index () {
    return api().get('api/Course/allCourse');
  },
  addTeachers (teachers) {
    return api().post('api/Course/addTeacher', teachers);
  },
  getTeachers (id) {
    return api().get(`api/Course/${id}`);
  },
  removeTeacher (data) {
    return api().post(`api/Course/teacher/remove`, data);
  },
  delete (data) {
    return api().delete(`api/Course/${data.id}`);
  }
}