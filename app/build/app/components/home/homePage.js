(function () {
    'use strict';

    angular
        .module('HomePage', ['ngRoute'])
        .config(['$routeProvider', HomePageConfig])
        .controller('homePageCtrl', HomePageCtrl)
        .directive('compile', function ($compile) {
            return function (scope, element, attr) {
                const body = angular.element(attr.compile)
                const compileFunc = $compile(body);
                compileFunc(scope)
                element.append(body)
            }
        })

    HomePageCtrl.$ingect = ['$scope', 'HomePageFactory', 'Login']

    function HomePageCtrl($scope, HomePageFactory,Login) {
        const vm = this;
        vm.username = Login.getUsername()
        vm.currentDate = function(){
            const date = new Date()
            const month = ['Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            return `${date.getDate()}-${month[date.getMonth()]}-${date.getFullYear()}`
        } 
        vm.postArr = []

        vm.getPosts = async function () {
            const data = await HomePageFactory.getPosts()
            vm.postArr = data;
            $scope.$apply()

        }

        vm.sendPost = async function () {
            console.log('get post client')
            HomePageFactory.sendPost(vm.postArr)

        }

        if (vm.postArr.length == 0) {
            console.log(HomePageFactory.posts)
            vm.getPosts()
            console.log('Запустили get post')
        }

    }

    function HomePageConfig($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'app/components/home/homePage.html',
                resolve: {
                    user: function (Login, $q, $location) {
                        if (Login.getUsername()) {
                            return true
                        } else {
                            /* $location.path('/#') */
                            return $q.reject({
                                unAuthorized: true
                            })
                        }
                    }
                }
            })
    }
}());