angular.module('myApp')
    .controller('findAndFightCtrl', function ($scope, pokemonService) {

    $scope.pokemonInfo = pokemonService.pokemonInfo;
    

    $scope.goToSeePrey = 'hunt';
    $scope.createFighter = function (name){
        var name = name;
        pokemonService.createFighter(name);
        }
    
    
    
    
    
    
    });
