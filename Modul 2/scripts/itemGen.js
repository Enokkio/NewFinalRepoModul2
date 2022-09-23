import { updateDisplay } from './lvlUp.js';
import { lvlUp } from './startCombat.js';
import { flags, saveJSON, sword, helmet, armor, loadJSON, user } from './updateStats.js';
let userStage = flags.stageNr;
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var whatItem = 0;
let Gsword = {
    Name: 'Sword',
    HP: 0,
    STR: Math.ceil(3 ** ((userStage / 10) + 1)),
    DEF: 0,
    SPD: Math.ceil(3 ** ((userStage / 10) + 1)),
};
let Garmor = {
    Name: 'Armor',
    HP: Math.ceil(1.5 ** ((userStage / 10) + 1)),
    STR: Math.ceil(1.5 ** ((userStage / 10) + 1)),
    DEF: Math.ceil(1.5 ** ((userStage / 10) + 1)),
    SPD: Math.ceil(1.5 ** ((userStage / 10) + 1)),
};
let Ghelmet = {
    Name: 'Helmet',
    HP: Math.ceil(3 ** ((userStage / 10) + 1)),
    STR: 0,
    DEF: Math.ceil(3 ** ((userStage / 10) + 1)),
    SPD: 0,
};
function createSword() {
    for (var i = userStage * 3; i > 0; i--) {
        var statChosen = randomIntFromInterval(1, 4);
        switch (statChosen) {
            case 1: {
                Gsword.HP += 5;
                break;
            }
            case 2: {
                Gsword.STR += 1;
                break;
            }
            case 3: {
                Gsword.DEF += 1;
                break;
            }
            case 4: {
                Gsword.SPD += 1;
                break;
            }
        }
    }
    console.log(Gsword);
}
function createArmor() {
    for (var i = userStage * 3; i > 0; i--) {
        var statChosen = randomIntFromInterval(1, 4);
        switch (statChosen) {
            case 1: {
                Garmor.HP += 5;
                break;
            }
            case 2: {
                Garmor.STR += 1;
                break;
            }
            case 3: {
                Garmor.DEF += 1;
                break;
            }
            case 4: {
                Garmor.SPD += 1;
                break;
            }
        }
    }
    console.log(Garmor);
}
function createHelmet() {
    for (var i = userStage * 3; i > 0; i--) {
        var statChosen = randomIntFromInterval(1, 4);
        switch (statChosen) {
            case 1: {
                Ghelmet.HP += 5;
                break;
            }
            case 2: {
                Ghelmet.STR += 1;
                break;
            }
            case 3: {
                Ghelmet.DEF += 1;
                break;
            }
            case 4: {
                Ghelmet.SPD += 1;
                break;
            }
        }
    }
    console.log(Ghelmet);
}
function createItem() {
    whatItem = randomIntFromInterval(1, 3);
    switch (whatItem) {
        case 1:
            createSword();
            break;
        case 2:
            createArmor();
            break;
        case 3:
            createHelmet();
            break;
    }
}
export function updateItem() {
    console.log(whatItem);
    switch (whatItem) {
        case 1:
            user.MHP -= sword.HP;
            user.STR -= sword.STR;
            user.DEF -= sword.DEF;
            user.SPD -= sword.SPD;
            sword.HP = Gsword.HP;
            sword.STR = Gsword.STR;
            sword.DEF = Gsword.DEF;
            sword.SPD = Gsword.SPD;
            user.MHP += sword.HP;
            user.STR += sword.STR;
            user.DEF += sword.DEF;
            user.SPD += sword.SPD;
            console.log(user);
            saveJSON();
            loadJSON();
            updateDisplay();
            break;
        case 2:
            user.MHP -= armor.HP;
            user.STR -= armor.STR;
            user.DEF -= armor.DEF;
            user.SPD -= armor.SPD;
            armor.HP = Garmor.HP;
            armor.STR = Garmor.STR;
            armor.DEF = Garmor.DEF;
            armor.SPD = Garmor.SPD;
            user.MHP += armor.HP;
            user.STR += armor.STR;
            user.DEF += armor.DEF;
            user.SPD += armor.SPD;
            saveJSON();
            loadJSON();
            updateDisplay();
            break;
        case 3:
            user.MHP -= helmet.HP;
            user.STR -= helmet.STR;
            user.DEF -= helmet.DEF;
            user.SPD -= helmet.SPD;
            helmet.HP = Ghelmet.HP;
            helmet.STR = Ghelmet.STR;
            helmet.DEF = Ghelmet.DEF;
            helmet.SPD = Ghelmet.SPD;
            user.MHP += helmet.HP;
            user.STR += helmet.STR;
            user.DEF += helmet.DEF;
            user.SPD += helmet.SPD;
            saveJSON();
            loadJSON();
            updateDisplay();
            break;
    }
}
export function showYourItem() {
    let htmlElems = document.getElementsByClassName("yourItemStats")[0].children;
    if (whatItem == 1) {
        for (let i = 0; i < htmlElems.length; i++) {
            if (i != 0) {
                htmlElems[i].innerHTML = htmlElems[i].id + ": " + sword[htmlElems[i].id];
            }
            else {
                htmlElems[i].innerHTML = sword.Name;
            }
        }
    }
    if (whatItem == 2) {
        for (let i = 0; i < htmlElems.length; i++) {
            if (i != 0) {
                htmlElems[i].innerHTML = htmlElems[i].id + ": " + armor[htmlElems[i].id];
            }
            else {
                htmlElems[i].innerHTML = armor.Name;
            }
        }
    }
    if (whatItem == 3) {
        for (let i = 0; i < htmlElems.length; i++) {
            if (i != 0) {
                htmlElems[i].innerHTML = htmlElems[i].id + ": " + helmet[htmlElems[i].id];
            }
            else {
                htmlElems[i].innerHTML = helmet.Name;
            }
        }
    }
}
export function showNewItem() {
    let htmlElems2 = document.getElementsByClassName("newItemStats")[0].children;
    if (whatItem == 1) {
        for (let i = 0; i < htmlElems2.length; i++) {
            if (i != 0) {
                htmlElems2[i].innerHTML = htmlElems2[i].id + ": " + Gsword[htmlElems2[i].id];
            }
            else {
                htmlElems2[i].innerHTML = Gsword.Name;
            }
        }
    }
    if (whatItem == 2) {
        for (let i = 0; i < htmlElems2.length; i++) {
            if (i != 0) {
                htmlElems2[i].innerHTML = htmlElems2[i].id + ": " + Garmor[htmlElems2[i].id];
            }
            else {
                htmlElems2[i].innerHTML = armor.Name;
            }
        }
    }
    if (whatItem == 3) {
        for (let i = 0; i < htmlElems2.length; i++) {
            if (i != 0) {
                htmlElems2[i].innerHTML = htmlElems2[i].id + ": " + Ghelmet[htmlElems2[i].id];
            }
            else {
                htmlElems2[i].innerHTML = Ghelmet.Name;
            }
        }
    }
}
export function itemDroped() {
    createItem();
    showYourItem();
    showNewItem();
    document.getElementById('gearScreen').style.display = "flex";
}
var takeBtn = document.getElementById('takeBtn');
takeBtn.addEventListener('click', function () {
    updateItem();
    document.getElementById('gearScreen').style.display = "none";
    saveJSON();
    console.log(sword);
    console.log(armor);
    console.log(helmet);
    lvlUp();
});
var passBtn = document.getElementById('passBtn');
passBtn.addEventListener('click', function () {
    document.getElementById('gearScreen').style.display = "none";
    console.log(sword);
    console.log(armor);
    console.log(helmet);
    lvlUp();
});
