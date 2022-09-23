import{user} from "./updateStats.js"

class Enemy
{

    Name: string;
    Sprite:string;
    Level: number;
    MHP: number;
    CHP: number;
    STR: number;
    DEF: number;
    SPD: number;
    XpRew: Number;

    constructor(Name: string, Sprite: string, Level: number, MaxHP: number, CurrentHealth: number, Strength: number, Defense: number, Speed: number, XpRew: Number){
        
        this.Name = Name;
        this.Sprite = Sprite;
        this.Level = Level;
        this.MHP = MaxHP;
        this.CHP = CurrentHealth;
        this.STR = Strength;
        this.DEF = Defense;
        this.SPD = Speed;
        this.XpRew = XpRew;
    }
}

  //Forest enemies

  export var enemy = new Enemy("","", 0, 0, 0, 0, 0, 0, 0);
  let ForestMobs: string[] = ["wolf", "forestGuy", "spider" ];
  let MobSprites: string[] = ["/images/mike.png", "/images/mike.png", "/images/mike.png"];


function genrateRandomNumber(min, max)
{

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 

}


import { flags } from './updateStats.js';



export function createEnemy()
{


if (flags.stageNr == 5) {
        enemy.Name = "Forest Lord";
        enemy.MHP = Math.ceil(1.5* user.MHP);
        enemy.CHP = Math.ceil(enemy.MHP);
        enemy.STR = Math.ceil(1.3 * user.STR);
        enemy.SPD = Math.ceil(0.5 * user.SPD + 5);

        return enemy;
}
else if(flags.stageNr == 10) {
    enemy.Name = "Naga";
    enemy.MHP = Math.ceil(1.1* user.MHP);
    enemy.CHP = Math.ceil(enemy.MHP);
    enemy.STR = Math.ceil(0.9 * user.STR + 10);
    enemy.DEF = Math.ceil(user.DEF*0.8);
    enemy.SPD = Math.ceil(user.SPD + 5);

    return enemy;
}
else if(flags.stageNr == 15) {
    enemy.Name = "Minotaur";
    enemy.MHP = Math.ceil(1.3* user.MHP);
    enemy.CHP = Math.ceil(enemy.MHP);
    enemy.STR = Math.ceil(1.3 * user.STR);
    enemy.DEF = Math.ceil(user.DEF*0.8 + 20);
    enemy.SPD = Math.ceil(0.7 * user.SPD + 5);

    return enemy;
}
else if(flags.stageNr == 20) {
    enemy.Name = "Dragon Gate Keeper";
    enemy.MHP = Math.ceil(1.5* user.MHP);
    enemy.CHP = Math.ceil(enemy.MHP);
    enemy.STR = Math.ceil(1.2 * user.STR);
    enemy.DEF = Math.ceil(user.DEF*1.2);
    enemy.SPD = Math.ceil(user.SPD*1.05);

    return enemy;
}
else if(flags.stageNr == 25) {
    enemy.Name = "Dungeon Lord";
    enemy.MHP = Math.ceil(2.5* user.MHP);
    enemy.CHP = Math.ceil(enemy.MHP);
    enemy.STR = Math.ceil(1.1 * user.STR);
    enemy.DEF = Math.ceil(user.DEF*1.5);
    enemy.SPD = Math.ceil(user.SPD*0.9 + 40);

    return enemy;
}
else{

    //console.log("Creating enemy!");
    var enemyInd = genrateRandomNumber(0,2);
    enemy.Name = ForestMobs[enemyInd];
    enemy.Sprite = MobSprites[enemyInd];
    


    enemy.Level = genrateRandomNumber(flags.stageNr - 1, flags.stageNr + 1);
    if(enemy.Level < 1)
        enemy.Level = 1;

    enemy.MHP = Math.ceil(user.MHP * 0.5);
    enemy.STR = Math.ceil(user.STR * 0.5);
    enemy.DEF = Math.ceil(user.DEF * 0.5);
    enemy.SPD = Math.ceil(user.SPD * 0.5);

    for(var i = enemy.Level * 3; i > 0; i--)
    {

       var statChosen = genrateRandomNumber(1,4);
        switch (statChosen) {

            case 1:{
                enemy.MHP += 5;
                break;
            }
            case 2:{
                enemy.STR += 1;
                break;
            }
            case 3:{
                enemy.DEF += 1;
                break;
            }
            case 4:{
                enemy.SPD += 1;
                break;
            }

        }
    }
    enemy.CHP = enemy.MHP;
    return enemy;


}
    
    
}
console.log(enemy.Sprite);
    console.log("test");



export function updateStatsE() {
    let htmlElems = document.getElementsByClassName("Estat-display")[0].children
    for (let i = 0; i < htmlElems.length; i++) {
        if(i != 2){
            htmlElems[i].innerHTML = htmlElems[i].id + ": " + enemy[htmlElems[i].id];
            }
            else{
            htmlElems[i].innerHTML = "HP: " + enemy.CHP + '/' + enemy.MHP;
            }
    }
    document.getElementById('monster-event').style.backgroundImage = `url(${enemy.Sprite})`;
    document.getElementById('enemy').style.backgroundImage = `url(${enemy.Sprite})`;

    
}