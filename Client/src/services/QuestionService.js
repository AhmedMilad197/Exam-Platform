import api from "./Api"

export default {
  show (data) {
    return api().post('question', data);
  },
  index () {
    return api().post('question/list');
  },
  create (data) {
    return api().post('api/Questions/addQuestion', data);
  }
}