angular.module('todo')
  .factory('Login', LoginFactory)

LoginFactory.$inject = ['$http', '$cookies']

function LoginFactory($http, $cookies) {
  const login = {};
  login.test = 'test factory'
  login.loginUser = async ({
    userName,
    password
  }) => {
    const loginData = {
      username: userName,
      password: password
    }
    const connect = await $http.post('http://localhost:4000/login', loginData)
    if (connect.status === 200) {
      $cookies.put('id', connect.data.id)
      $cookies.put('username', userName)
      $cookies.put('token', connect.data.token)
      login.user = {
        id: connect.data.id,
        username: userName
      }
      console.log(connect.status, 'if')
    }else{
      console.log(connect.status, 'else')
      login.user = null
    }
  }
  login.getUsername = () => {
    if (login.user && login.user.username) {
      return login.user.username
    } else {
      const username = $cookies.get('username')
      if (username) {
        return username
      }
    }
    return null
  }

  login.logout = () => {
    $cookies.remove('id')
    $cookies.remove('username')
    $cookies.remove('token')
    login.user = null
  }
  return login
}