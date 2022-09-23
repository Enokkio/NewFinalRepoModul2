export let user = {
    Name: "",
    Level: 1,
    MHP: 5,
    CHP: 5,
    STR: 1,
    DEF: 1,
    SPD: 1,
};
export let flags = {
    stageNr: 1,
    karma: 0,
    story1: false,
    story2: false,
    story3: false,
    story4: false,
    DevilsDeal: false,
    HolyWarrior: false,
    horridApple: false,
    deliciousApple: false,
    Foodpoisoning: false,
    ChickenEater: false,
    WonAgainsGiant: false,
    LoseAgainstGiant: false,
};
export let sword = {
    Name: 'Sword',
    HP: 0,
    STR: 0,
    DEF: 0,
    SPD: 0,
};
export let armor = {
    Name: 'Armor',
    HP: 0,
    STR: 0,
    DEF: 0,
    SPD: 0,
};
export let helmet = {
    Name: 'Helmet',
    HP: 0,
    STR: 0,
    DEF: 0,
    SPD: 0,
};
loadJSON();
console.log(user);
console.log(flags);
console.log(sword);
console.log(armor);
console.log(helmet);
var nameBox = document.getElementById('nameBox');
nameBox.value = user.Name;
export function saveJSON() {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("flags", JSON.stringify(flags));
    localStorage.setItem("sword", JSON.stringify(sword));
    localStorage.setItem("armor", JSON.stringify(armor));
    localStorage.setItem("helmet", JSON.stringify(helmet));
}
// To check if user exists
export function loadJSON() {
    if (localStorage.user == null || localStorage.user == "null") {
        console.log("sav");
        var ccScreen = document.getElementById('characterCreator');
        ccScreen.style.display = "grid";
    }
    else {
        user = JSON.parse(localStorage.getItem("user"));
        flags = JSON.parse(localStorage.getItem("flags"));
        sword = JSON.parse(localStorage.getItem("sword"));
        armor = JSON.parse(localStorage.getItem("armor"));
        helmet = JSON.parse(localStorage.getItem("helmet"));
        saveJSON();
    }
}
updateStats();
export function updateStats() {
    let htmlElems = document.getElementsByClassName("stat-display")[0].children;
    for (let i = 0; i < htmlElems.length; i++) {
        if (i != 2) {
            htmlElems[i].innerHTML = htmlElems[i].id + ": " + user[htmlElems[i].id];
        }
        else {
            htmlElems[i].innerHTML = "HP: " + user.CHP + '/' + user.MHP;
        }
    }
}
export function deleteJSON() {
    localStorage.clear();
}
