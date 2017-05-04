angular.module('myApp')
    .controller('huntCtrl', function ($scope, pokemonService) {

    $scope.pokemonInfo = pokemonService.pokemonInfo;


    });
