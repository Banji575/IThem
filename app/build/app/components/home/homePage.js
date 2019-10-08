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

    HomePageCtrl.$ingect = ['$scope', 'HomePageFactory']

    function HomePageCtrl($scope, HomePageFactory) {
        const vm = this;
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