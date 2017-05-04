angular.module('myApp', ['ui-router'])
    .config(function($stateProvider, $urlRouterProvider){
    
        $urlRouterProvider.when('', '/');
    
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './app/routes/home/homeTmpl.html',
                controller: 'findAndFightCtrl'
        })
            .state('seePrey', {
                url: '/seePrey',
                templateUrl: './app/routes/seePrey/seePreyTempl.html',
                controller: 'findAndFightCtrl'
        })
    
})
