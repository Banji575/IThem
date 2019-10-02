angular
    .module('regPage', ['ngRoute'])
    .config(['$routeProvider', regConfig])
    .controller('regCtrl', registration)

function registration() {
    console.log('reg config')
    const vm = this
    vm.regSubmit = (form)=>{
        console.log(vm.form, form.$valid)
    }
}



function regConfig($routeProvider) {
    $routeProvider
        .when('/registration', {
            templateUrl: 'app/components/registration/registration.html'
        })
} 