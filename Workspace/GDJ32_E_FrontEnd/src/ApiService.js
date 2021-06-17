import axios from 'axios'; // 액시오스
// import Cookies from 'universal-cookie';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// const USER_API_BASE_URL = "http://localhost:8080";
const AxiosRequestConfig = {
  headers: cookies.get('accessToken')
};

class ApiService {
  addUser = (user) => {
    console.log('addUser In');
    // return axios.post(`${USER_API_BASE_URL}/users/signup`, user);
    return axios.post(`/users/signup`, user);
  };

  loginUser = (user) => {
    console.log('login success');
    // console.log(`URL : ${USER_API_BASE_URL}/login`);
    console.log(user);

    // cofing 넣었을때 전송 오류 남
    // const AxiosRequestConfig = {
    //     transformRequest: 'application/x-www-form-urlencoded'
    // }

    const userData = {
      username: user.id,
      password: user.password
    };
    // cookies.set("id", userData.username)
    console.log(userData);
    cookies.set('userId', userData.username);
    // return axios.get(`${USER_API_BASE_URL}/demo/auth`, AxiosRequestConfig, userData);
    // return axios.post(`${USER_API_BASE_URL}/auth`, userData);
    return axios.post(`/auth`, userData);
  };
  /*
        editUser(user) {
            return axios.put(USER_API_BASE_URL + '/' + user.id, user);
        }
        */

  logoutUser = (user) => {
    console.log('login success');
    // console.log(`URL : ${USER_API_BASE_URL}/login`);
    console.log(user);

    // cofing 넣었을때 전송 오류 남
    // const AxiosRequestConfig = {
    //     transformRequest: 'application/x-www-form-urlencoded'
    // }

    const userData = {
      username: user.id,
      password: user.password
    };
    // cookies.set("id", userData.username)
    console.log(userData);
    cookies.set('userId', userData.username);
    // return axios.get(`${USER_API_BASE_URL}/demo/auth`, AxiosRequestConfig, userData);
    // return axios.post(`${USER_API_BASE_URL}/logout`, userData, AxiosRequestConfig);
    return axios.post(`/logout`, userData, AxiosRequestConfig);
  };

  UpdateUser = (user) => {
    console.log('UpdateUser');
    // return axios.post(`${USER_API_BASE_URL}/users/updateUser`, user);
    return axios.post(`/users/updateUser`, user);
  };
}

export default new ApiService();
