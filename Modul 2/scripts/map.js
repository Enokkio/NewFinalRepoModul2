//defining all images for the game
const starterTownImg = new Image();
starterTownImg.src = 'images/Pallettown.png';
const forestmap1 = new Image();
forestmap1.src = 'images/forest.png';
//define  
var PlayerStage = document.querySelector('#canvas');
var wall = document.querySelector('#wall');
const player = document.getElementById('player');
const cavemap1 = new Image();
cavemap1.src = 'images/pixelCave.png';
//event define boxes
var MonsterEvent = document.querySelector('.monster-event');
var NextLevel = document.querySelector('.next-level');
var StoryEvent = document.querySelector('.story-event');
//define self collission
// function overlaps() {
//   var rect1 = NextLevel.getBoundingClientRect();
//   var rect2 = MonsterEvent.getBoundingClientRect();
//   var isInHoriztonalBounds =
//     rect1.x < rect2.x + rect2.width +100 && 100 +rect1.x + rect1.width > rect2.x;
//   var isInVerticalBounds =
//     rect1.y < rect2.y + rect2.height + 100 && rect1.y + rect1.height + 100 > rect2.y;
//   var isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
//   var istrueoverlap = xleft -80 <= monsterXleft && xright +80 >= monsterXright && ybot +80>= monsterYbot && ytop-80 <= monsterYtop
//  var xleft = parseInt(StoryEvent.style.left);
//   var xright = parseInt(StoryEvent.style.right);
//   var ybot = parseInt(StoryEvent.style.bottom);
//   var ytop = parseInt(StoryEvent.style.top);
//   var monsterXleft = parseInt(MonsterEvent.style.left);
//   var monsterXright = parseInt(MonsterEvent.style.right);
//   var monsterYbot = parseInt(MonsterEvent.style.bottom);
//   var monsterYtop = parseInt(MonsterEvent.style.top);
//   return istrueoverlap;
// }
//-----------------------------------------------------------CODE FOR SELFDETECTION BAD NAMING BE WARNED ASK ENOK FOR INFO----------------------------------------------------------------------------------------------------------------------
//randompositionning
function randompos() {
    MonsterEvent.style.left = randomIntFromInterval(100, 600) + 'px';
    MonsterEvent.style.top = randomIntFromInterval(50, 275) + 'px';
    StoryEvent.style.left = randomIntFromInterval(100, 600) + 'px';
    StoryEvent.style.top = randomIntFromInterval(50, 275) + 'px';
    colideron = true;
}
let colideron = true;
overlapDetectself();
//self collision checker
function overlapDetectself() {
    randompos();
    if (colideron == true) {
        let interactDivs = document.querySelector(".monster-event");
        let interactDivs2 = document.querySelector(".story-event");
        //console.log(interactDivs)
        for (let index = 0; index < 1; index++) {
            let eventbox = interactDivs.getBoundingClientRect(); //Get bounding info for boxes 
            let eventbox2 = interactDivs2.getBoundingClientRect(); //Get bounding info for player
            let xleft = eventbox.left;
            let xright = eventbox.right;
            let ytop = eventbox.top;
            const ybot = eventbox.bottom;
            let playerXleft = eventbox2.left;
            let playerXright = eventbox2.right;
            let PlayerYtop = eventbox2.top;
            let playerYbot = eventbox2.bottom;
            //gör så att den checkar även för vilken class
            if (xleft - 45 <= playerXleft && xright + 45 >= playerXright && ybot + 45 >= playerYbot && ytop - 45 <= PlayerYtop && colideron == true) {
                //console.log("they are doing da thing");
                randompos();
            }
            else {
                //console.log(colideron)
                colideron = false;
                //console.log(colideron)
                //console.log("I am happening")
            }
        }
    }
}
//defining canvas in script to draw images on it as maps
//---------------------------Define music
let defaultAudio = document.getElementById("audio1");
let battleAudio = document.getElementById("audio2");
export function playDefAudio() {
    defaultAudio.loop = true;
    defaultAudio.play();
    //console.log("U SING ME")
}
export function pauseDefAudio() {
    defaultAudio.pause();
    //console.log("U SING ME")
}
export function playBatAudio() {
    battleAudio.loop = true;
    battleAudio.play();
    //console.log("U SING ME")
}
export function pauseBatAudio() {
    battleAudio.pause();
    console.log("U SING ME");
}
window.onload = function () {
    playDefAudio();
    PlayerStage.style.backgroundImage = "url('images/forest.png')";
};
//function to load eventboxes
function loadboxes() {
    let chance = Math.random() * 100;
    console.log(chance);
    if (chance <= 20) {
        StoryEvent.style.display = "none";
        console.log("no story");
    }
    else
        (StoryEvent.style.display = "block");
    MonsterEvent.style.display = "block";
}
function uponloadOfStage() {
    loadboxes();
    overlapDetectself(); //to detect overlap between randoms pos
}
//Function for creating random numbers
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function loadMapsStage1() {
    //reset location of player
    player.style.top = 325 + 'px';
    player.style.left = 325 + 'px';
    colideron = true;
    uponloadOfStage();
    //We need a while stageclear = true do this function
    //And we need to use player data to see which stage to load, so for example if stage is   0<stage<5 we use a function between stages 1-5 through a function
    //satte in random number generation funktionen sådana att den skulle komma med i exporten
    PlayerStage.style.backgroundImage = "url('images/caveFiller.png')";
    wall.style.backgroundImage = "url('images/cave_background.png')";
}
export function loadMapsStage2() {
    //reset location of player
    player.style.top = 325 + 'px';
    player.style.left = 325 + 'px';
    uponloadOfStage();
    //We need a while stageclear = true do this function
    //And we need to use player data to see which stage to load, so for example if stage is   0<stage<5 we use a function between stages 1-5 through a function
    //satte in random number generation funktionen sådana att den skulle komma med i exporten
    PlayerStage.style.backgroundImage = "url('images/innerCaveFiller.png')";
    wall.style.backgroundImage = "url('images/innerCave_background.png')";
}
export function loadMapsStage3() {
    //reset location of player
    player.style.top = 325 + 'px';
    player.style.left = 325 + 'px';
    uponloadOfStage();
    //We need a while stageclear = true do this function
    //And we need to use player data to see which stage to load, so for example if stage is   0<stage<5 we use a function between stages 1-5 through a function
    //satte in random number generation funktionen sådana att den skulle komma med i exporten
    PlayerStage.style.backgroundImage = "url('images/mike.png')";
    wall.style.backgroundImage = "url('images/ww.png')";
}
export function loadMapsStage4() {
    //reset location of player
    player.style.top = 325 + 'px';
    player.style.left = 325 + 'px';
    uponloadOfStage();
    //We need a while stageclear = true do this function
    //And we need to use player data to see which stage to load, so for example if stage is   0<stage<5 we use a function between stages 1-5 through a function
    //satte in random number generation funktionen sådana att den skulle komma med i exporten
    PlayerStage.style.backgroundImage = "url('images/mike.png')";
    wall.style.backgroundImage = "url('images/ww.png')";
}
export function loadMapsStage5() {
    //reset location of player
    player.style.top = 325 + 'px';
    player.style.left = 325 + 'px';
    uponloadOfStage();
    //We need a while stageclear = true do this function
    //And we need to use player data to see which stage to load, so for example if stage is   0<stage<5 we use a function between stages 1-5 through a function
    //satte in random number generation funktionen sådana att den skulle komma med i exporten
    PlayerStage.style.backgroundImage = "url('images/mike.png')";
    wall.style.backgroundImage = "url('images/ww.png')";
}
export function loadMapsStage6() {
    //reset location of player
    player.style.top = 325 + 'px';
    player.style.left = 325 + 'px';
    uponloadOfStage();
    //We need a while stageclear = true do this function
    //And we need to use player data to see which stage to load, so for example if stage is   0<stage<5 we use a function between stages 1-5 through a function
    //satte in random number generation funktionen sådana att den skulle komma med i exporten
    PlayerStage.style.backgroundImage = "url('images/mike.png')";
    wall.style.backgroundImage = "url('images/ww.png')";
}
