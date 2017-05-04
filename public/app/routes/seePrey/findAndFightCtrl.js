angular.module('myApp')
    .controller('findAndFightCtrl', function ($scope, pokemonService) {

    $scope.pokemonInfo = [];
    
$scope.getPokemon = function(){
        for(var i = 0; i < 50; i++){
            pokemonService.getPokemonInfo(Math.floor((Math.random() * 600)+1))
            .then(function(response){
                
                response.data.level = Math.floor((Math.random() * 50)+1);
                
                response.data.attackPower = Math.floor(Math.random() * ((response.data.level - (response.data.level-(response.data.level/3)))+1)+(response.data.level-(response.data.level/3)));
                
                response.data.health = response.data.stats[5].base_stat * (response.data.level/10)+1;
                
                response.data.index = i;
                
                $scope.pokemonInfo.push(response.data);
                console.log($scope.pokemonInfo);
            })
        }
    
}
$scope.getPokemon();
    
var Fighter = function(name){
        this.name = name;
        this.level = 1;
        this.experience = 0;
        this.experienceNeeded = 500;
        this.fullHealth = 40;
        this.health = 40;
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
    
    $scope.testFighter = new Fighter('Brandon');
    console.log($scope.testFighter);
    
    
    
    
    });
