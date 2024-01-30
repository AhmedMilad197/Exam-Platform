import api from "./Api"

export default {
  create (data) {
    return api().post('api/Course/addCourse', data);
  },
  show (data) {
    return api().get(`api/Course/${data.id}`);
  },
  update (data) {
    return api().post('subject/update', data);
  },
  index () {
    return api().get('api/Course/allCourse');
  }
}