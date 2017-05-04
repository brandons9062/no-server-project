angular.module('myApp')
    .service('pokemonService', function ($http) {
    
    this.getPokemonInfo = function (id){
        return $http({
            method:'GET',
            url: "http://pokeapi.co/api/v2/pokemon/"+id
        })
    }
    var service = this;
    this.pokemonInfo = [];
    
    this.getPokemon = function(level){
        if(!level){
            var fighterLevel = 1;
            var lowPokeLevel = 1
            var highPokeLevel = 5;
        }
        else if(level < 10){
            fighterLevel = level;
            lowPokeLevel = fighterLevel - (fighterLevel - 1);
            highPokeLevel = fighterLevel + 5;
        }
        else {
            fighterLevel = level;
            lowPokeLevel = fighterLevel - 5;
            highPokeLevel = fighterLevel + 5;
             };
        for(var i = 0; i < 10; i++){
            service.getPokemonInfo(Math.floor((Math.random() * 600)+1))
            .then(function(response){
                
                response.data.level = Math.floor((Math.random() * highPokeLevel)+lowPokeLevel);
                
                response.data.attackPower = Math.floor(Math.random() * ((response.data.level - (response.data.level-(response.data.level/3)))+1)+(response.data.level-(response.data.level/3)));
                
                response.data.health = Math.ceil(response.data.stats[5].base_stat * (response.data.level/10)+1);
                
                response.data.index = i;
                
                service.pokemonInfo.push(response.data);
                console.log(service.pokemonInfo);
            })
        }
}
    
    

    
    
    });