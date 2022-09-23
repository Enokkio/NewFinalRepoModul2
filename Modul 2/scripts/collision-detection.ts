//check if clear condition är true
let clearcondition = false;

//imports for gaming

export function changeClearcondition(){
if (clearcondition == false) {
    clearcondition = true
}
else{
clearcondition = false;

}

}
//importing music 

import { pauseDefAudio } from './map.js';
import { playBatAudio } from './map.js'
import { playDefAudio } from "./map.js";
import { pauseBatAudio } from './map.js'


//define monster event and etc
var storybox = <HTMLElement>document.querySelector('.story-event');


//import map loading functions
import { loadMapsStage1 } from './map.js';
import { loadMapsStage2 } from './map.js';
import { loadMapsStage3 } from './map.js';
import { loadMapsStage4 } from './map.js';
import { loadMapsStage5 } from './map.js';
import { loadMapsStage6 } from './map.js';




import {portalOff, startCombat } from './startCombat.js';
import { flags, saveJSON } from "./updateStats.js";
//import story loading function
import { Randomstory} from "./storiesloader.js"
import { getRndInteger } from './storiesloader.js'



const player = document.getElementById("player");
 var coliderOn = true;

export function combatDone(){
    coliderOn = true;
}

setInterval( overlapDetect, 500);//vi gör så att function för collission detectas vare 1sekund

var StoryEvent = document.querySelector('.story-event') as HTMLElement;


function overlapDetect(){
    if(coliderOn == true){
    const interactDivs = document.getElementsByClassName("collisionDetect")
    //console.log(interactDivs)


 for (let index = 0; index < interactDivs.length; index++) {

    const eventbox = interactDivs[index].getBoundingClientRect();//Get bounding info for boxes 
    const playerCOORDS = player.getBoundingClientRect();//Get bounding info for player

    const xleft = eventbox.left ;
    const xright = eventbox.right ;
    const ytop = eventbox.top ;
    const ybot = eventbox.bottom ;

    const playerXleft = playerCOORDS.left;
    const playerXright = playerCOORDS.right;
    const PlayerYtop = playerCOORDS.top;
    const playerYbot = playerCOORDS.bottom;

    if (xleft -45 <= playerXleft && xright +45 >= playerXright && ybot +45>= playerYbot && ytop-45 <= PlayerYtop && interactDivs[index].classList.contains("story-event") && StoryEvent.style.display == "block" ){
        coliderOn = false;

        Randomstory();

        console.log("shello")
        


    }
                                                                                                                             //gör så att den checkar även för vilken class
    if (xleft -45 <= playerXleft && xright +45 >= playerXright && ybot +45>= playerYbot && ytop-45 <= PlayerYtop && interactDivs[index].classList.contains("next-level")) {//makes bounding info as if it was a cube
        
        
     
        
      
        loadStageBasedOnStageNR();
        portalOff();
       
    }
    if (xleft -45 <= playerXleft && xright +45 >= playerXright && ybot +45>= playerYbot && ytop-45 <= PlayerYtop && interactDivs[index].classList.contains("monster-event")) {//makes bounding info as if it was a cube
        startCombat();
        console.log("oh no a monster appared");
        coliderOn = false;
        playBatAudio();
        pauseDefAudio();

    }
}    
    }
}


 function loadStageBasedOnStageNR(){
    if ( flags.stageNr >= 0 && flags.stageNr <= 5 && clearcondition == true) {//check for what stage
        loadMapsStage1(); //loadar en exported function från map.js vilket editas med map.ts    
        flags.stageNr++;
        saveJSON();
        changeClearcondition();
        console.log("forest")
    }   
   else if (flags.stageNr >= 6 && flags.stageNr <10  && clearcondition == true) {
    loadMapsStage2();
    flags.stageNr++;
    changeClearcondition();
    saveJSON();

    console.log("Cave")



   }
   else if (flags.stageNr >= 10 && flags.stageNr <15  && clearcondition == true) {
    loadMapsStage3();
    flags.stageNr++;
    changeClearcondition();
    saveJSON();



   }
   else if (flags.stageNr >= 15 && flags.stageNr <20  && clearcondition == true) {
    loadMapsStage4();
    flags.stageNr++;
    changeClearcondition();
    saveJSON();



   }
   else if (flags.stageNr >= 20 && flags.stageNr <25 && clearcondition == true) {
    loadMapsStage5();
    flags.stageNr++;
    changeClearcondition();
    saveJSON();



   }
   else if (flags.stageNr == 25  && clearcondition == true) {
    loadMapsStage6();
    changeClearcondition();
    saveJSON();

   }

}