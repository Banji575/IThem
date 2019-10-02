angular.module('App')
.directive('viewtask', ()=>{
    return{
        templateUrl: 'templates/viewTask.html',
        restrict: 'EA',
        replace:true,
        link: function(scope, el, attr){
            
        }
    }
})