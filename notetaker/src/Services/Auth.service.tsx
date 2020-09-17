import axios from "axios";

const API_URL = "https://mdnotesapi.azurewebsites.net/api/Users/";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + "authenticate", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, password: string) {
    return axios.post(API_URL + "register", {
      username,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user")!);
  }
}

export default new AuthService();
