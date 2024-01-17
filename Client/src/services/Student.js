import api from "./Api"

export default {
  show (creditials) {
    return api().post('student', creditials);
  }
}