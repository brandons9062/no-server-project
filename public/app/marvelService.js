angular.module('myApp')
    .service('pokemonService', function ($http) {
    
    this.getPokemonInfo = function (id){
        return $http({
            method:'GET',
            url: "http://pokeapi.co/api/v2/pokemon/"+id
        })
    }
    });