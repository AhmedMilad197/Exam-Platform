import api from "./Api"

export default {
  show (data) {
    return api().post('subject', data);
  },
  update (data) {
    return api().post('subject/update', data);
  }
}