angular.module('App')
.directive('createtask', ()=>{
    return{
        templateUrl: 'templates/create-task.html',
        restrict: 'EA',
        replace:true,
        link: function(scope, el, attr){
            
        }
    }
})