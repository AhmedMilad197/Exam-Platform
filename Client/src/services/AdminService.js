import api from "./Api"

export default {
  login(data) {
    return api().post('api/Configs/login', data);
  }
}