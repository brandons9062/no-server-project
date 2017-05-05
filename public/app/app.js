angular.module('myApp', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
    
        
    
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './app/routes/home/homeTmpl.html',
                controller: 'findAndFightCtrl'
        })
            .state('seePrey', {
                url: '/seePrey',
                templateUrl: './app/routes/seePrey/seePreyTmpl.html',
                controller: 'seePreyCtrl'
        })
            .state('hunt', {
                url:'/hunt',
                templateUrl: './app/routes/hunt/huntTmpl.html',
                controller: 'huntCtrl'
        })
        $urlRouterProvider.otherwise('/');
    
})
