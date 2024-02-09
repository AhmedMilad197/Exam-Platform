import api from "./Api"

export default {
  create (data) {
    return api().post('api/Study/addStudy', data);
  },
}