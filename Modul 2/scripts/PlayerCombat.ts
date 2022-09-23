
//clear condition, genom att döda ett mosnter clearar du en stage och kan gå till nästa
import { changeClearcondition } from "./collision-detection.js";

//Gets player action buttons
const attackButton = document.getElementById('Attack');
const blockButton = document.getElementById('Block');
const healButton = document.getElementById('Heal');
const itemsButton = document.getElementById('Items');

//Gets the randomly generated enemy (needs to be updated to generate enemy on demand, inte något du måste göra nu)


//import { enemy } from './enemyGen.js';
import { createEnemy } from './enemyGen.js';

var enemy = createEnemy();


var empowerCounter;
var MGenhanceCounter;
var WeakPotCounter;
function itemslot1(){

    

}
function itemslot2(){


}
function itemslot3(){


}


// Item list 
class item
{

    Name: string;
    turns:number;
    amount: number;
    

    constructor(Name: string, turn: number, amount : number, ){
        
        this.Name = Name;
        this.turns = turn;
        this.amount = amount;
       
}
}
var EmpPot = new item("empower potion", 3, user.STR*1.25);
var HpPot = new item("Red Healing potion", 0, (user.MHP-user.CHP)*0.7);
var MgEnchance = new item("Magical enchancment scroll", 3, user.STR*0.5);
var MgHealing = new item("Magical healing scroll",0,user.MHP,)
var WeakPot = new item("Weakening potion", 4,enemy.STR*0.3)  
 





//Gets player (Needs to get saved stats instead of player framework, inte något du måste göra nu)
import { user } from './updateStats.js';
import { endCombat, lvlUp } from './startCombat.js';
import { endGame } from './startCombat.js';
import { portal } from './startCombat.js';


//playerTurn visar om det är spelarens tur eller inte
var playerTurn = null;
// pBlock visar om spelaren har valt "Block", kommer vara true tills spelaren har blockerat en attack, måste sättas till "false" av fienden när fienden attackerar
var pBlock = false;
var pBlockRounds = 0;
// maxH är limiten av hur mycket spelaren kan heala, så om dom börjar fighten med 10hp så kan dom inte heala up till 20hp

// updateStats updaterar spelarens stats på skärmen, MÅSTE KALLAS VARJE GÅNG NÅGOT SOM T.EX HP ÄNDRAS!!
import { updateStats } from './updateStats.js';
// updateStatsE updaterar fiendens stats på skärmen, MÅSTE KALLAS VARJE GÅNG NÅGOT SOM T.EX HP ÄNDRAS!!
import { updateStatsE } from './enemyGen.js';


// Sätter statsen i början av figthen
updateStats();
updateStatsE();

function changeTurn() {
    if (playerTurn == true) {
        playerTurn = false;
        document.getElementById('turnCounter').innerText = enemy.Name + "s Turn";
        document.getElementById('turnCounter').classList.remove('playerBorder');
        document.getElementById('turnCounter').classList.add('enemyBorder');
        updateStats();
        updateStatsE();
        setTimeout(enemyAction, 1500);
    }
    else if (playerTurn == false) {
        playerTurn = true;
        updateStats();
        updateStatsE();
        document.getElementById('turnCounter').innerText = user.Name + "s Turn";
        document.getElementById('turnCounter').classList.remove('enemyBorder');
        document.getElementById('turnCounter').classList.add('playerBorder');
    }
}


// Kollar vem som har högst speed och bestämmer om det är spelarens tur eller inte
export function turnDecider() {
    user.CHP = user.MHP;
    updateStats();
    updateStatsE();


    if (enemy.SPD > user.SPD) {
        playerTurn = false;
        document.getElementById('turnCounter').innerText = enemy.Name + "s Turn";
        document.getElementById('turnCounter').classList.remove('playerBorder');
        document.getElementById('turnCounter').classList.add('enemyBorder');
        setTimeout(enemyAction, 1500);
    }
    else if (enemy.SPD <= user.SPD) {
        playerTurn = true;
        document.getElementById('turnCounter').innerText = user.Name + "s Turn";
        document.getElementById('turnCounter').classList.remove('enemyBorder');
        document.getElementById('turnCounter').classList.add('playerBorder');
    }

}

function genrateRandomNumber(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;

}



var box = document.getElementById('LogBox');
const child = document.getElementById('log');

export function emptyLogs() {
    box.innerHTML = '';
}

function logger(who, action, amount) {
    box = document.getElementById('LogBox');
    const el = document.createElement('p')

    var other;
    if (who == "enemy")
        other == user.Name;
    else if (who == "player")
        other == enemy.Name;
    else
        other == "error";

    switch (action) {
        case "attack": {
            if (who == "player" && eBlock) {
                el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + ' tried to ' + ' <span class="yellowText">hit </span>' + '<span class="redText">' + enemy.Name + '</span>' + " but " + '<span class="redText">' + enemy.Name + '</span>' + '<span class="bluerText"> blocked</span>' + ' and only took ' + '<span class="yellowText">' + amount + " DMG!</span>'";
                el.classList.remove('enemyBorder');
                el.classList.add('playerBorder');
            }
            else if (who == "enemy" && pBlock) {
                el.innerHTML = '<span class="redText">' + enemy.Name + '</span>' + ' tried to ' + ' <span class="yellowText">hit </span>' + '<span class="blueText">' + user.Name + '</span>' + " but " + '<span class="blueText">' + user.Name + '</span>' + '<span class="bluerText"> blocked</span>' + ' and only took ' + '<span class="yellowText">' + amount + " DMG!</span>'";
                el.classList.remove('playerBorder');
                el.classList.add('enemyBorder');
            }
            else {
                if (who == "player") {
                    el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + ' <span class="yellowText">hit </span>' + '<span class="redText">' + enemy.Name + '</span>' + " for " + '<span class="yellowText">' + amount + " DMG!</span>'";
                    el.classList.remove('enemyBorder');
                    el.classList.add('playerBorder');
                }
                else if (who == "enemy") {
                    el.innerHTML = '<span class="redText">' + enemy.Name + '</span>' + ' <span class="yellowText">hit </span>' + '<span class="blueText">' + user.Name + '</span>' + " for " + '<span class="yellowText">' + amount + " DMG!</span>'";
                    el.classList.remove('playerBorder');
                    el.classList.add('enemyBorder');
                }
            }
            break;
        }
        case "block": {

            if (who == "player") {
                el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + ' used ' + '<span class="bluerText">block!</span>';
                el.classList.remove('enemyBorder');
                el.classList.add('playerBorder');
            }
            else if (who == "enemy") {
                el.innerHTML = '<span class="redText">' + enemy.Name + '</span>' + ' used ' + '<span class="bluerText">block!</span>';
                el.classList.remove('playerBorder');
                el.classList.add('enemyBorder');
            }
            break;
        }
        case "heal": {

            if (who == "player") {
                el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + '<span class="greenText"> healed</span>' + ' for ' + '<span class="greenText">' + amount + " HP!</span>'";
                el.classList.remove('enemyBorder');
                el.classList.add('playerBorder');
            }
            else if (who == "enemy") {
                el.innerHTML = '<span class="redText">' + enemy.Name + '</span>' + '<span class="greenText"> healed</span>' + '  for ' + '<span class="greenText">' + amount + " HP!</span>'";
                el.classList.remove('playerBorder');
                el.classList.add('enemyBorder');
            }
            break;
        }
        default: {
            //statements; 
            break;
        }
    }

    el.classList.add('log');
    box.insertBefore(el, box.children[0]);


}

//Spelarens Attack function
attackButton.addEventListener('click', function handleClick() {

    if (playerTurn == true && enemy.CHP != 0) {
        var damageDone = Math.ceil(user.STR * (genrateRandomNumber(90, 110) / 100));
        if (eBlockRounds > 0) {
            
            damageDone = Math.ceil( damageDone * ((50 + enemy.DEF - user.STR) / 100));
            enemy.CHP = enemy.CHP - damageDone;
            if (enemy.CHP <= 0) {
                changeClearcondition();
                endCombat();
                lvlUp();
                portal();
            }else{
                changeTurn();

            }
            logger("player", "attack", damageDone);
            eBlockRounds--;
            if (eBlockRounds == 0) {
                eBlock = false;
            }
            
            
            
        }
        else {
            enemy.CHP -= damageDone;
            logger("player", "attack", damageDone);
            if (enemy.CHP <= 0) {
                changeClearcondition();
                endCombat();
                lvlUp();
                portal();

            }else{
                changeTurn();
            }
        }
        

    }


});

//Spelarens block function
blockButton.addEventListener('click', function handleClick() {

    if (playerTurn == true && pBlock == false) {
        pBlock = true;
        pBlockRounds = 3;
        logger("player", "block", 1)
        changeTurn();
        //console.log("You will block!");
    }
});

//Spelarens heal function
healButton.addEventListener('click', function handleClick() {

    if (playerTurn == true && user.CHP != user.MHP) {
        var healAmount = Math.ceil(user.MHP * (genrateRandomNumber(30, 90) / 100));
        if ((user.CHP + healAmount) > user.MHP) {
            var hpOverMax = (user.CHP + healAmount) - user.MHP;
            user.CHP = user.MHP;
            //console.log('more than');
            logger("player", "heal", (healAmount - hpOverMax));
        }
        else {
            //console.log('less than');
            user.CHP = user.CHP + healAmount;
            logger("player", "heal", healAmount);
        }
        changeTurn();
    }
});

//Spelarens Items function
itemsButton.addEventListener('click', function handleClick() {

    if (playerTurn == true) {
        changeTurn();
        //console.log('items clicked');
    }

});

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var eBlockRounds = 0;
var eBlock = false;


function enemyAction() {

if (enemy.Name == "Forest Lord") {
    console.log("forst lord AI")
    let chance = Math.random()*100
   if (chance <= 50) {
    var damageDone = Math.ceil(Math.ceil(enemy.STR * (genrateRandomNumber(90, 110) / 100)));
    if (pBlockRounds > 0) {
        pBlockRounds--;
        if (pBlockRounds == 0) {
            pBlock = false;
        }
        console.log(damageDone);
        damageDone = (damageDone * Math.ceil(((50 + user.DEF - enemy.STR) / 100)));
        console.log(damageDone);
        user.CHP = user.CHP - damageDone;
        if (user.CHP <= 0) {
            changeClearcondition();
            endGame();
        }
    }
    else {
        user.CHP -= damageDone;
        if (user.CHP <= 0) {
            changeClearcondition();
            endGame();
        }
    }
logger("enemy", "attack", damageDone);

changeTurn();
   }
   else if(chance <=85){
    if (eBlock) {
        enemyAction();
    }
    else {
        eBlock = true;
        eBlockRounds = 3;
        logger("enemy", "block", damageDone)
        changeTurn();
    }
   }
   else{
    if (enemy.CHP != enemy.MHP) {
        var healAmount = Math.ceil(enemy.MHP * (genrateRandomNumber(30, 90) / 100));
        if ((enemy.CHP + healAmount) > enemy.MHP) {
            var hpOverMax = (enemy.CHP + healAmount) - enemy.MHP;
            enemy.CHP = enemy.MHP;
            logger("enemy", "heal", (healAmount - hpOverMax));
        }
        else {
            enemy.CHP = enemy.CHP + healAmount;
            logger("enemy", "heal", healAmount);
        }
        changeTurn();
    }
    else {
        enemyAction();
    }

   }
}
else if (enemy.Name == "Naga"){
    let chance = Math.random()*100
    if (chance <= 30) {
     var damageDone = Math.ceil(Math.ceil(enemy.STR * (genrateRandomNumber(90, 110) / 100)));
     if (pBlockRounds > 0) {
         pBlockRounds--;
         if (pBlockRounds == 0) {
             pBlock = false;
         }
         console.log(damageDone);
         damageDone = (damageDone * Math.ceil(((50 + user.DEF - enemy.STR) / 100)));
         console.log(damageDone);
         user.CHP = user.CHP - damageDone;
         if (user.CHP <= 0) {
             changeClearcondition();
             endGame();
         }
     }
     else {
         user.CHP -= damageDone;
         if (user.CHP <= 0) {
             changeClearcondition();
             endGame();
         }
     }
 logger("enemy", "attack", damageDone);
 
 changeTurn();
    }
    else if(chance <=75){
     if (eBlock) {
         enemyAction();
     }
     else {
         eBlock = true;
         eBlockRounds = 3;
         logger("enemy", "block", damageDone)
         changeTurn();
     }
    }
    else{
     if (enemy.CHP != enemy.MHP) {
         var healAmount = Math.ceil(enemy.MHP * (genrateRandomNumber(30, 90) / 100));
         if ((enemy.CHP + healAmount) > enemy.MHP) {
             var hpOverMax = (enemy.CHP + healAmount) - enemy.MHP;
             enemy.CHP = enemy.MHP;
             logger("enemy", "heal", (healAmount - hpOverMax));
         }
         else {
             enemy.CHP = enemy.CHP + healAmount;
             logger("enemy", "heal", healAmount);
         }
         changeTurn();
     }
     else {
         enemyAction();
     }
 
    }
}
else if (enemy.Name == "Minotaur"){
    let chance = Math.random()*100
    if (chance <= 70) {
     var damageDone = Math.ceil(Math.ceil(enemy.STR * (genrateRandomNumber(90, 110) / 100)));
     if (pBlockRounds > 0) {
         pBlockRounds--;
         if (pBlockRounds == 0) {
             pBlock = false;
         }
         console.log(damageDone);
         damageDone = (damageDone * Math.ceil(((50 + user.DEF - enemy.STR) / 100)));
         console.log(damageDone);
         user.CHP = user.CHP - damageDone;
         if (user.CHP <= 0) {
             changeClearcondition();
             endGame();
         }
     }
     else {
         user.CHP -= damageDone;
         if (user.CHP <= 0) {
             changeClearcondition();
             endGame();
         }
     }
 logger("enemy", "attack", damageDone);
 
 changeTurn();
    }
    else if(chance <=85){
     if (eBlock) {
         enemyAction();
     }
     else {
         eBlock = true;
         eBlockRounds = 3;
         logger("enemy", "block", damageDone)
         changeTurn();
     }
    }
    else{
     if (enemy.CHP != enemy.MHP) {
         var healAmount = Math.ceil(enemy.MHP * (genrateRandomNumber(30, 90) / 100));
         if ((enemy.CHP + healAmount) > enemy.MHP) {
             var hpOverMax = (enemy.CHP + healAmount) - enemy.MHP;
             enemy.CHP = enemy.MHP;
             logger("enemy", "heal", (healAmount - hpOverMax));
         }
         else {
             enemy.CHP = enemy.CHP + healAmount;
             logger("enemy", "heal", healAmount);
         }
         changeTurn();
     }
     else {
         enemyAction();
     }
 
    }
}
else if (enemy.Name == "Dragon Gate Keeper"){
    if(enemy.CHP <= enemy.CHP*0.2) {
let chance = Math.random()*100
    if (chance <= 30) {
     var damageDone = Math.ceil(Math.ceil(enemy.STR * (genrateRandomNumber(90, 110) / 100)));
     if (pBlockRounds > 0) {
         pBlockRounds--;
         if (pBlockRounds == 0) {
             pBlock = false;
         }
         console.log(damageDone);
         damageDone = (damageDone * Math.ceil(((50 + user.DEF - enemy.STR) / 100)));
         console.log(damageDone);
         user.CHP = user.CHP - damageDone;
         if (user.CHP <= 0) {
             changeClearcondition();
             endGame();
         }
     }
     else {
         user.CHP -= damageDone;
         if (user.CHP <= 0) {
             changeClearcondition();
             endGame();
         }
     }
 logger("enemy", "attack", damageDone);
 
 changeTurn();
    }
    else if(chance <=70){
     if (eBlock) {
         enemyAction();
     }
     else {
         eBlock = true;
         eBlockRounds = 3;
         logger("enemy", "block", damageDone)
         changeTurn();
     }
    }
    else{
     if (enemy.CHP != enemy.MHP) {
         var healAmount = Math.ceil(enemy.MHP * (genrateRandomNumber(30, 90) / 100));
         if ((enemy.CHP + healAmount) > enemy.MHP) {
             var hpOverMax = (enemy.CHP + healAmount) - enemy.MHP;
             enemy.CHP = enemy.MHP;
             logger("enemy", "heal", (healAmount - hpOverMax));
         }
         else {
             enemy.CHP = enemy.CHP + healAmount;
             logger("enemy", "heal", healAmount);
         }
         changeTurn();
     }
     else {
         enemyAction();
     }
 
    }
    }
    else{
    let chance = Math.random()*100
    if (chance <= 70) {
     var damageDone = Math.ceil(Math.ceil(enemy.STR * (genrateRandomNumber(90, 110) / 100)));
     if (pBlockRounds > 0) {
         pBlockRounds--;
         if (pBlockRounds == 0) {
             pBlock = false;
         }
         console.log(damageDone);
         damageDone = (damageDone * Math.ceil(((50 + enemy.DEF - user.STR) / 100)));
         console.log(damageDone);
         user.CHP = user.CHP - damageDone;
         if (user.CHP <= 0) {
             changeClearcondition();
             endGame();
         }
     }
     else {
         user.CHP -= damageDone;
         if (user.CHP <= 0) {
             changeClearcondition();
             endGame();
         }
     }
 logger("enemy", "attack", damageDone);
 
 changeTurn();
    }
    else if(chance <=90){
     if (eBlock) {
         enemyAction();
     }
     else {
         eBlock = true;
         eBlockRounds = 3;
         logger("enemy", "block", damageDone)
         changeTurn();
     }
    }
    else{
     if (enemy.CHP != enemy.MHP) {
         var healAmount = Math.ceil(enemy.MHP * (genrateRandomNumber(30, 90) / 100));
         if ((enemy.CHP + healAmount) > enemy.MHP) {
             var hpOverMax = (enemy.CHP + healAmount) - enemy.MHP;
             enemy.CHP = enemy.MHP;
             logger("enemy", "heal", (healAmount - hpOverMax));
         }
         else {
             enemy.CHP = enemy.CHP + healAmount;
             logger("enemy", "heal", healAmount);
         }
         changeTurn();
     }
     else {
         enemyAction();
     }
 
    }
}
}
 else{
    const rndInt = randomIntFromInterval(1, 6)

    switch (rndInt) {
        case 1:
        case 2:
        case 3:
            {
                //console.log('Enemy attacking');
                var damageDone = Math.ceil(Math.ceil(enemy.STR * (genrateRandomNumber(90, 110) / 100)));
                    if (pBlockRounds > 0) {
                        pBlockRounds--;
                        if (pBlockRounds == 0) {
                            pBlock = false;
                        }
                        console.log(damageDone);
                        damageDone = (damageDone * Math.ceil(((50 + user.DEF - enemy.STR) / 100)));
                        console.log(damageDone);
                        user.CHP = user.CHP - damageDone;
                        if (user.CHP <= 0) {
                            changeClearcondition();
                            endGame();
                        }
                    }
                    else {
                        user.CHP -= damageDone;
                        if (user.CHP <= 0) {
                            changeClearcondition();
                            endGame();
                        }
                    }
                logger("enemy", "attack", damageDone);
                
                changeTurn();
                break;
            }

        case 4:
        case 5:
            {
                if (eBlock) {
                    enemyAction();
                }
                else {
                    eBlock = true;
                    eBlockRounds = 3;
                    logger("enemy", "block", damageDone)
                    changeTurn();
                }


                break;
            }
        case 6: {
            if (enemy.CHP != enemy.MHP) {
                var healAmount = Math.ceil(enemy.MHP * (genrateRandomNumber(30, 90) / 100));
                if ((enemy.CHP + healAmount) > enemy.MHP) {
                    var hpOverMax = (enemy.CHP + healAmount) - enemy.MHP;
                    enemy.CHP = enemy.MHP;
                    logger("enemy", "heal", (healAmount - hpOverMax));
                }
                else {
                    enemy.CHP = enemy.CHP + healAmount;
                    logger("enemy", "heal", healAmount);
                }
                changeTurn();
            }
            else {
                enemyAction();
            }
            break;
        }


    }
    }
}
