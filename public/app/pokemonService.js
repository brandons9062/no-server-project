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
    this.pokemonToFight;
    
    this.getPokemon = function(level){
        service.pokemonInfo = [];
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
                response.data.fullHealth = response.data.health;
                
                response.data.index = i;
                
                service.pokemonInfo.push(response.data);
                service.pokemonToFight = service.pokemonInfo[Math.floor((Math.random() * service.pokemonInfo.length)+1)];
                console.log(service.pokemonToFight);
            })
        }
        
}
    
    var Fighter = function(name){
        this.name = name;
        this.level = 1;
        this.experience = 0;
        this.experienceNeeded = 500;
        this.fullHealth = 20;
        this.health = 20;
        this.won = false;
        this.lost = false;
        this.attackPower = 10;
        this.takeDamage = function(index){
            var damage = service.pokemonInfo[index].attackPower;
            if(damage - this.health <= 0){
                this.health = 0;
                this.lost = true;
            }
            else{this.health -= damage}        
        };
        this.gainExperience = function(index){
            if(this.won){
                this.experience = this.experience + (service.pokemonInfo[index].level*200);
                return function calcExperience (){
                    if(this.experience >= this.experienceNeeded){
                        this.level += 1;
                        this.experience = this.experience - this.experienceNeeded;
                        this.experienceNeeded *= 2;
                        this.fullHealth = this.fullHealth * (this.level/5)+1;
                        this.health = this.fullHealth;
                        calcExperience();
                    }
                    this.won = false;
                }
            }
        };
    }
     this.createFighter = function (name){
        if(name){
        service.fighter = new Fighter(name);
        service.getPokemon(service.fighter.level);            
        }
        else {
            alert("GIVE YOUR HUNTER A NAME YA SLOWPOKE!");
        }
        
        }

    this.attack = function (){
        var criticalChance = Math.floor((Math.random() * 10)+1);
        var critical = 1;
        if (criticalChance == 10){
            critical = 2;
        }
        var dodge = Math.floor((Math.random() * 20)+1);
        var pokemonHealthAfterDamage = service.pokemonToFight.health - (service.fighter.attackPower * critical);
        
        if(pokemonHealthAfterDamage > 0){
            service.pokemonToFight.health = pokemonHealthAfterDamage;
        }
        else {
            service.pokemonToFight.health = 0;
            service.fighter.won = true;
            service.fighter.gainExperience();
        }
        
    }
    
    });