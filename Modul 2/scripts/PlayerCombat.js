//clear condition, genom att döda ett mosnter clearar du en stage och kan gå till nästa
import { changeClearcondition } from "./collision-detection.js";
//Gets player action buttons
const attackButton = document.getElementById('Attack');
const blockButton = document.getElementById('Block');
const healButton = document.getElementById('Heal');
const itemsButton = document.getElementById('Items');
import { createEnemy } from './enemyGen.js';
var enemy = createEnemy();
function useItem(slot) {
    switch (slot) {
        case 1: {
            items.Item1 = null;
            itemsButton.style.display = "block";
            attackButton.style.display = "block";
            blockButton.style.display = "block";
            healButton.style.display = "block";
            document.getElementById("iBox1").style.display = "none";
            document.getElementById("iBox2").style.display = "none";
            document.getElementById("iBox3").style.display = "none";
            break;
        }
        case 2: {
            items.Item2 = null;
            itemsButton.style.display = "block";
            attackButton.style.display = "block";
            blockButton.style.display = "block";
            healButton.style.display = "block";
            document.getElementById("iBox1").style.display = "none";
            document.getElementById("iBox2").style.display = "none";
            document.getElementById("iBox3").style.display = "none";
            break;
        }
        case 3: {
            items.Item3 = null;
            itemsButton.style.display = "block";
            attackButton.style.display = "block";
            blockButton.style.display = "block";
            healButton.style.display = "block";
            document.getElementById("iBox1").style.display = "none";
            document.getElementById("iBox2").style.display = "none";
            document.getElementById("iBox3").style.display = "none";
            break;
        }
    }
}
// Items stuff
var emp = false;
var STRTime = 0;
var regTime = 0;
var weaTime = 0;
var twoTime = false;
var ogSTR = 0;
function itemslot1() {
    switch (items.Item1) {
        case "Health Potion": {
            var hpHealed = (user.MHP - user.CHP) * 0.7;
            user.CHP += hpHealed;
            logger("player", "Health Potion", hpHealed);
            changeTurn();
            break;
        }
        case "Empower Potion": {
            emp = true;
            logger("player", "Empower Potion", 0);
            changeTurn();
            break;
        }
        case "Greater Strength Scroll": {
            ogSTR = user.STR;
            var newSTR = Math.ceil(user.STR * 1.5);
            user.STR += newSTR;
            STRTime = 3;
            logger("player", "Greater Strength Scroll", newSTR);
            changeTurn();
            break;
        }
        case "Regeneration Potion": {
            var hpHealed = Math.ceil(user.MHP * 0.1);
            user.CHP += hpHealed;
            regTime = 2;
            logger("player", "Regeneration Potion", hpHealed);
            changeTurn();
            break;
        }
        case "Potion of Weakness": {
            weaTime = 3;
            logger("player", "Potion of Weakness", 0);
            changeTurn();
            break;
        }
        case "Bomb": {
            var dmg = Math.floor(enemy.MHP * 0.25);
            enemy.CHP -= dmg;
            logger("player", "Bomb", dmg);
            changeTurn();
            break;
        }
        case "Throwing Knife": {
            var dmg = Math.floor(enemy.MHP * 0.10);
            enemy.CHP -= dmg;
            logger("player", "Throwing Knife", dmg);
            break;
        }
        case "Double Action Potion": {
            twoTime = true;
            logger("player", "Double Action Potion", 0);
            break;
        }
    }
}
//Gets player (Needs to get saved stats instead of player framework, inte något du måste göra nu)
import { items, user } from './updateStats.js';
import { endCombat, lvlUp } from './startCombat.js';
import { endGame } from './startCombat.js';
import { portal } from './startCombat.js';
//playerTurn visar om det är spelarens tur eller inte
var playerTurn = true;
// pBlock visar om spelaren har valt "Block", kommer vara true tills spelaren har blockerat en attack, måste sättas till "false" av fienden när fienden attackerar
var pBlock = false;
var pBlockRounds = 0;
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
    const el = document.createElement('p');
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
        case "Health Potion": {
            el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + 'used' +
                '<span class="yellowText">Health Potion </span>' + 'and healed' + '<span class="greenText">' + amount + " HP!</span>'";
            el.classList.remove('playerBorder');
            el.classList.add('enemyBorder');
            break;
        }
        case "Empower Potion": {
            el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + 'used' +
                '<span class="yellowText">Empower Potion</span>' + 'and will now do double damaga!';
            el.classList.remove('playerBorder');
            el.classList.add('enemyBorder');
            break;
        }
        case "Greater Strength Scroll": {
            el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + 'used' +
                '<span class="yellowText">Greater Strength Scroll</span>' + 'and will do 50% more damage 3 times!';
            el.classList.remove('playerBorder');
            el.classList.add('enemyBorder');
            break;
        }
        case "Regeneration Potion": {
            el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + 'used' +
                '<span class="yellowText">Regeneration Potion</span>' + 'and will heal ' + '<span class="greenText">' + amount + " HP for 3 turns!</span>'";
            el.classList.remove('playerBorder');
            el.classList.add('enemyBorder');
            break;
        }
        case "Potion of Weakness": {
            el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + 'used' +
                '<span class="yellowText">Potion of Weakness</span>' + ', ' + enemy.Name + 'will now do 50% less damage for 3 turns!';
            el.classList.remove('playerBorder');
            el.classList.add('enemyBorder');
            break;
        }
        case "Bomb": {
            el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + 'used' +
                '<span class="yellowText">Throwing Knife</span>' + 'used Bomb and dealth ' + '<span class="redText">' + amount + "</span> damage to ";
            el.classList.remove('playerBorder');
            el.classList.add('enemyBorder');
            break;
        }
        case "Throwing Knife": {
            el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + 'used' +
                '<span class="yellowText">Throwing Knife</span>' + 'used Throwing Knife and dealth ' + '<span class="redText">' + amount + "</span> damage to " + enemy.Name;
            el.classList.remove('playerBorder');
            el.classList.add('enemyBorder');
            break;
        }
        case "Double Action Potion": {
            el.innerHTML = '<span class="blueText">' + user.Name + '</span>' + 'used' +
                '<span class="yellowText">Double Action Potion</span>' + '<span class="yellowText">and now has two actions!</span>';
            el.classList.remove('playerBorder');
            el.classList.add('enemyBorder');
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
            damageDone = Math.ceil(damageDone * ((50 + enemy.DEF - user.STR) / 100));
            enemy.CHP = enemy.CHP - damageDone;
            if (enemy.CHP <= 0) {
                changeClearcondition();
                endCombat();
                lvlUp();
                portal();
                eBlockRounds = 0;
                eBlock = false;
                pBlockRounds = 0;
                pBlock = false;
                user.CHP = user.MHP;
            }
            else {
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
                eBlockRounds = 0;
                eBlock = false;
                pBlockRounds = 0;
                pBlock = false;
                user.CHP = user.MHP;
            }
            else {
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
        logger("player", "block", 1);
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
        itemsButton.style.display = "none";
        attackButton.style.display = "none";
        blockButton.style.display = "none";
        healButton.style.display = "none";
        if (items.Item1 != null) {
            document.getElementById("iBox1").innerText = items.Item1;
            document.getElementById("iBox1").style.display = "block";
            document.getElementById("iBox1").classList.add('buttonText');
        }
        if (items.Item2 != null) {
            document.getElementById("iBox2").innerText = items.Item2;
            document.getElementById("iBox1").classList.add('buttonText');
        }
        if (items.Item3 != null) {
            document.getElementById("iBox3").innerText = items.Item3;
            document.getElementById("iBox1").classList.add('buttonText');
        }
        document.getElementById("iBack").style.display = "block";
    }
});
document.getElementById("iBack").addEventListener('click', function handleClick() {
    if (playerTurn == true) {
        itemsButton.style.display = "none";
        document.getElementById("iBox1").style.display = "inital";
        document.getElementById("iBox2").style.display = "inital";
        document.getElementById("iBox3").style.display = "inital";
    }
});
document.getElementById("iBox1").addEventListener('click', function handleClick() {
    if (playerTurn == true) {
        itemslot1();
    }
});
document.getElementById("iBox2").addEventListener('click', function handleClick() {
    if (playerTurn == true) {
        itemsButton.style.display = "none";
        document.getElementById("iBox1").style.display = "inital";
        document.getElementById("iBox2").style.display = "inital";
        document.getElementById("iBox3").style.display = "inital";
    }
});
document.getElementById("iBox3").addEventListener('click', function handleClick() {
    if (playerTurn == true) {
        itemsButton.style.display = "none";
        document.getElementById("iBox1").style.display = "inital";
        document.getElementById("iBox2").style.display = "inital";
        document.getElementById("iBox3").style.display = "inital";
    }
});
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var eBlockRounds = 0;
var eBlock = false;
function enemyAction() {
    if (enemy.Name == "Forest Lord") {
        console.log("forst lord AI");
        let chance = Math.random() * 100;
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
        else if (chance <= 85) {
            if (eBlock) {
                enemyAction();
            }
            else {
                eBlock = true;
                eBlockRounds = 3;
                logger("enemy", "block", damageDone);
                changeTurn();
            }
        }
        else {
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
    else if (enemy.Name == "Naga") {
        let chance = Math.random() * 100;
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
        else if (chance <= 75) {
            if (eBlock) {
                enemyAction();
            }
            else {
                eBlock = true;
                eBlockRounds = 3;
                logger("enemy", "block", damageDone);
                changeTurn();
            }
        }
        else {
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
    else if (enemy.Name == "Minotaur") {
        let chance = Math.random() * 100;
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
        else if (chance <= 85) {
            if (eBlock) {
                enemyAction();
            }
            else {
                eBlock = true;
                eBlockRounds = 3;
                logger("enemy", "block", damageDone);
                changeTurn();
            }
        }
        else {
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
    else if (enemy.Name == "Dragon Gate Keeper") {
        if (enemy.CHP <= enemy.CHP * 0.2) {
            let chance = Math.random() * 100;
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
            else if (chance <= 70) {
                if (eBlock) {
                    enemyAction();
                }
                else {
                    eBlock = true;
                    eBlockRounds = 3;
                    logger("enemy", "block", damageDone);
                    changeTurn();
                }
            }
            else {
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
        else {
            let chance = Math.random() * 100;
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
            else if (chance <= 90) {
                if (eBlock) {
                    enemyAction();
                }
                else {
                    eBlock = true;
                    eBlockRounds = 3;
                    logger("enemy", "block", damageDone);
                    changeTurn();
                }
            }
            else {
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
    else {
        const rndInt = randomIntFromInterval(1, 6);
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
                        logger("enemy", "block", damageDone);
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
