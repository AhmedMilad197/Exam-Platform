import api from "./Api"

export default {
  create (data) {
    return api().post('api/course/create', data);
  },
  show (id) {
    return api().get(`subject/${id}`);
  },
  update (data) {
    return api().post('subject/update', data);
  }
}