angular.module('myApp')
    .controller('huntCtrl', function ($scope, pokemonService) {

    $scope.pokemonInfo = pokemonService.pokemonInfo;
    $scope.fighter = pokemonService.fighter;

    $scope.pokemonToFight = pokemonService.pokemonToFight;
    $scope.attack = pokemonService.attack;
    });
