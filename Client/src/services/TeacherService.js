import api from "./Api"

export default {
  show (data) {
    return api().post('teacher', data);
  },
  index () {
    return api().get('api/Teacher/allTeacher');
  }
}