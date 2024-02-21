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
  // index (user) {
  //   console.log(user);
  //   return api().get('api/Course/allCourse',
  //   {
  //     headers: {
  //       'Authorization': `bearer ${user.token}`
  //     }
  //   });
  // }
  index () {
    return api().get('api/Course/allCourse');
  },
  addTeachers (teachers) {
    return api().post('api/Course/addTeacher', teachers);
  }
}