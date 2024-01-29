import api from "./Api"

export default {
  register (credintials) {
    console.log(credintials);
    return api().post('api/Teacher/addTeacher', credintials);
  }
}