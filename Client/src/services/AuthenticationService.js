import api from "./Api"

export default {
  register (credintials) {
    console.log(credintials);
    return api().post('register', credintials);
  }
}