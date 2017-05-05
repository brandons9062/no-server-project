angular.module('myApp')
.directive('navBar', function(){
    return {
        restrict: 'E',
        templateUrl: './app/routes/home/navBar.html' 
        }
});