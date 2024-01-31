import api from "./Api"

export default {
  show (data) {
    return api().post('question', data);
  },
  index () {
    return api().get('api/Questions/allQuestion');
  },
  create (data) {
    return api().post('api/Questions/addQuestion', data);
  }
}