import axios from 'axios'; // 액시오스

// const USER_API_BASE_URL = "http://localhost:8080/users";

class ApiService {
  /*
      fetchUsers() {
          return axios.get(USER_API_BASE_URL);
      }
  
      fetchUserByID(userID) {
          return axios.get(USER_API_BASE_URL + '/' + userID);
      }
  
      deleteUser(userID) {
          return axios.delete(USER_API_BASE_URL + '/' + userID);
      }
  */
  addUser = (user) => {
    console.log('addUser In');
    return axios.post('users', user);
  };
  /*
        editUser(user) {
            return axios.put(USER_API_BASE_URL + '/' + user.id, user);
        }
        */
}

export default new ApiService();
