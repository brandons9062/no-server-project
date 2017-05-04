angular.module('myApp')
    .controller('findAndFightCtrl', function ($scope, pokemonService) {

    $scope.pokemonInfo = pokemonService.pokemonInfo;
    
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
            var damage = $scope.pokemonInfo[index].attackPower;
            if(damage - this.health <= 0){
                this.health = 0;
                this.lost = true;
            }
            else{this.health -= damage}        
        };
        this.gainExperience = function(index){
            if(this.won){
                this.experience = this.experience + ($scope.pokemonInfo[index].level*200);
                return function calcExperience (){
                    if(this.experience >= this.experienceNeeded){
                        this.level += 1;
                        this.experience = this.experience - this.experienceNeeded;
                        this.experienceNeeded *= 2;
                        this.fullHealth = this.fullHealth * (this.level/5)+1;
                        this.health = this.fullHealth;
                        calcExperience();
                    }
                }
            }
        };
    
};
    $scope.goToSeePrey = '/';
    $scope.createFighter = function (name){
        if(name){
        $scope.fighter = new Fighter(name);
        pokemonService.getPokemon($scope.fighter.level);            $scope.goToSeePrey = "seePrey";
        }
        else {
            alert("GIVE YOUR HUNTER A NAME YA SLOWPOKE!");
        }
        }
    
    
    
    
    
    
    });
