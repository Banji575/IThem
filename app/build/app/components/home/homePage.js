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
        vm.test = function () {
            HomePageFactory.sendPost(vm.postArr[0])
        }
        console.log(HomePageFactory)
        vm.postArr = [{
            title: "From the Firehose",
            data: '2014-01-01',
            author: 'Mark',
            body: `<p>This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic
            typography, images, and code are all supported.</p>
          
          <p>Cum sociis natoque penatibus et magnis <a href="#">dis parturient montes</a>, nascetur ridiculus mus. Aenean
            eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at
            lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
          <blockquote>`,
          tag: 'Technology'
        }, {
            title: "From the Firehose",
            data: '2014-01-01',
            author: 'Mark',
            body: `<div>This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic
            typography, images, and code are all supported.
          
          Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean
            eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at
            lobortis. Cras mattis consectetur purus sit amet fermentum.
          </div>`
        }]

        /*  vm.createArr = function (obj) {
             const newArr = []
             obj.forEach((el, i) => {
                 newArr[i] = []
                 newArr[i].push(el.title)
                 newArr[i].push(el.data)
                 newArr[i].push(el.author)
                 newArr[i].push(el.body)

             });
             return newArr
         }

         vm.posts = vm.createArr(vm.postArr) */

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