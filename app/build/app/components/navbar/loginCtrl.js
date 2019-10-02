angular.module('todo')
    .controller('loginCtrl', login)
login.$inject = ['Login', '$scope', '$location']

function login(Login, $scope, $location) {
    const vm = this;
    vm.incorrect = ''
    vm.loginButton = true
    vm.credential = {
        userName: null,
        password: null
    }

    vm.userLogin = async () => {
       /*  if (vm.credential.userName && vm.credential.password) {
            Login.loginUser(vm.credential)
            
        } else {
            alert('Заполните все поля')
        } */
        await Login.loginUser(vm.credential)
        console.log(Login.user)
        if(Login.user){
            console.log('true')
            angular.element('#exampleModal').modal('toggle')
            $location.path('/home')
            vm.credential.userName = null
            vm.credential.password = null
            $scope.$apply()
        }else{
            console.log('false')
            vm.incorrect = 'Wrong username or password'
        }
    }
    
    vm.isAuthorized = () => {
        
        return Login.getUsername()
    }

    vm.logout = () =>{
        Login.logout()
    }
    
}