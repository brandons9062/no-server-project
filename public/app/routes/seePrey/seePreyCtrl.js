angular.module('myApp')
    .controller('seePreyCtrl', function ($scope, pokemonService) {

    $scope.pokemonInfo = pokemonService.pokemonInfo;


    });
