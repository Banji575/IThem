(function () {
  'use strict';

  angular
    .module('todo', ['ngRoute','ngCookies','HomePage','regPage'])
    .config(Config)



  function Config($routeProvider) {
    $routeProvider
    .when('/',{
      templateUrl:'app/components/default/default.html'
    })
    .when('/newPost',{
      templateUrl:'./app/components/newPost/newPost.html'
    })
      .otherwise({
        redirect: '/'
      })
  }

 
}());