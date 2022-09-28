//importing functions to save
import { items, saveJSON } from "./updateStats.js";
import { updateStats } from './updateStats.js';
import { user } from './updateStats.js';
import { flags } from './updateStats.js';
//import colidor 
import{itemDroped} from './itemGen.js';
import { combatDone} from './collision-detection.js'
import { changeClearcondition} from './collision-detection.js'
import { endGame } from './startCombat.js'

//import updatedisplay to update stuff
import {updateDisplay} from './lvlUp.js'
function statyield1(stage) {
    let x = Math.random()+0.3;//random integer från 0.3 to 1
    
    let y = Math.ceil((1.672 *flags.stageNr+ 0.4806)*x)
    console.log(x)
    return y;
  }
  
//defines querythings
  let innterStoryText = document.querySelector(".story-text-tag");
  let titleText = document.querySelector(".story-title-tag");


  
  
  
  export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
function hideStorydiv(){
  var storydiv = <HTMLElement>document.querySelector('.storydiv');
  storydiv.style.display = "none"

}
  //function to update data
  //---------------------------------------Function with loading stories and etc. -----------------------------------------------------------
  function updateData() {
    saveJSON();
    combatDone();
    hideStorydiv();
console.log("Im updating at the wrong time")

}
function buttonDisplaChange(){
  let button1 = document.querySelector(".buttonYES") as HTMLElement;
  let button2 = document.querySelector(".buttonNO") as HTMLElement;
  button1.style.visibility = "hidden"
  button2.style.visibility = "hidden"
}
//Needed empty function



  //--------------------------------------------------------------------Functions for stories to med loaded into function random story. -----------------------------------------------------------
          //--------------------------------------------------------------------Loading of commons stories -----------------------------------------------------------

  function loadcommonstory(){

    let button1 = document.querySelector(".buttonYES") as HTMLElement;
    let button2 = document.querySelector(".buttonNO") as HTMLElement;

    var allcommon = [];  
  
    let x=statyield1(flags.stageNr)
    let y=statyield1(flags.stageNr)
    var commonstories = {
      helpoldman: { title: "Help an old man", storytext: `An old man is struggling with walking, help him?\n `,
          option1() {
      
            buttonDisplaChange();
            let z = Math.random() *100;
            console.log(z)

            if (z <=  20) {
              user.CHP -= (x+5);
              flags.karma += 20;
              console.log(user);
              
              innterStoryText.innerHTML = `The old man stabbed you, and you lost ${x+5} HP`;
              if (user.CHP <=0) {
  
                setTimeout(hideStorydiv, 3000)
                endGame();
              }
            }
            else if(z <=100){
              innterStoryText.innerHTML = `The old man thanks you`;
              flags.karma += 10;
              setTimeout(updateData, 3000)
            }

          
              
          },
          option2(){
            updateData();

          }
         },
      StealFromOrphans: { title: "Unflattering thievery", storytext: `Steal food from some orphans \n `,
          option1() {

              user.MHP += 10;
              flags.karma -= 30;
              console.log(user);
              updateData();

              
          },
          option2(){
            updateData();
          }
        },
          StrangeFood: { title:"You've found a strange looking apple appeared", storytext: `Do you wish to consume it? \n `,
          option1() {
            buttonDisplaChange();
            let z = Math.random() *100;
            if (z <= 10) {
              innterStoryText.innerHTML = `the apple was quite delicious \n Healed for ${x}`;
              user.CHP +=x;
              flags.deliciousApple = true;
              setTimeout(updateData, 3000)


            }
            else
            {
              innterStoryText.innerHTML = `That was a horrid tasting apple \n Lost ${x} HP`;

              user.CHP -=Math.floor(x);
              flags.horridApple = true;
              if (user.CHP<=0) {
                setTimeout(hideStorydiv,3000)
                endGame();
              }
              setTimeout(updateData, 3000)


            }

              
          },
          option2(){
            updateData();
          }
          
        },

        hpPotDrop: { title:"You've found a Health Potion!", storytext: `Do you want to take it? \n `,
          option1() {
            buttonDisplaChange();
              innterStoryText.innerHTML = `the apple was quite delicious \n Healed for ${x}`;
              if(items.Item1 == null){
                items.Item1 = "Health Potion";
                innterStoryText.innerHTML = items.Item1 + ` was placed in slot 1!`;
              }
              else if(items.Item2 == null){
                items.Item2 = "Health Potion";
                innterStoryText.innerHTML = items.Item2 + ` was placed in slot 2!`;

              }
              else if(items.Item3 == null){
                items.Item3 = "Health Potion";
                innterStoryText.innerHTML = items.Item3 + ` was placed in slot 3!`;

              }
              setTimeout(updateData, 3000);
          },
          option2(){
            updateData();
          }
        },

        EmpPotion: { title:"You've found a Empower Potion!", storytext: `Do you want to take it? \n `,
          option1() {
            buttonDisplaChange();
              if(items.Item1 == null){
                items.Item1 = "Empower Potion";
                innterStoryText.innerHTML = items.Item1 + ` was placed in slot 1!`;
              }
              else if(items.Item2 == null){
                items.Item2 = "Empower Potion";
                innterStoryText.innerHTML = items.Item2 + ` was placed in slot 2!`;

              }
              else if(items.Item3 == null){
                items.Item3 = "Empower Potion";
                innterStoryText.innerHTML = items.Item3 + ` was placed in slot 3!`;

              }
              setTimeout(updateData, 3000);
          },
          option2(){
            updateData();
          }
        },

        PowerScroll: { title:"You've found a Greater Strength Scroll!", storytext: `Do you want to take it? \n `,
          option1() {
            buttonDisplaChange();
            let z = Math.random() *100;
              if(items.Item1 == null){
                items.Item1 = "Greater Strength Scroll";
                innterStoryText.innerHTML = items.Item1 + ` was placed in slot 1!`;
              }
              else if(items.Item2 == null){
                items.Item2 = "Greater Strength Scroll";
                innterStoryText.innerHTML = items.Item2 + ` was placed in slot 2!`;

              }
              else if(items.Item3 == null){
                items.Item3 = "Greater Strength Scroll";
                innterStoryText.innerHTML = items.Item3 + ` was placed in slot 3!`;

              }
              setTimeout(updateData, 3000);
          },
          option2(){
            updateData();
          }
        },

        RegenPotion: { title:"You've found a Regeneration Potion!", storytext: `Do you want to take it? \n `,
          option1() {
            buttonDisplaChange();
              if(items.Item1 == null){
                items.Item1 = "Regeneration Potion";
                innterStoryText.innerHTML = items.Item1 + ` was placed in slot 1!`;
              }
              else if(items.Item2 == null){
                items.Item2 = "Regeneration Potion";
                innterStoryText.innerHTML = items.Item2 + ` was placed in slot 2!`;

              }
              else if(items.Item3 == null){
                items.Item3 = "Regeneration Potion";
                innterStoryText.innerHTML = items.Item3 + ` was placed in slot 3!`;

              }
              setTimeout(updateData, 3000);
          },
          option2(){
            updateData();
          }
        },

        WeaknessPot: { title:"You've found a Potion of Weakness!", storytext: `Do you want to take it? \n `,
          option1() {
            buttonDisplaChange();
              if(items.Item1 == null){
                items.Item1 = "Potion of Weakness";
                innterStoryText.innerHTML = items.Item1 + ` was placed in slot 1!`;
              }
              else if(items.Item2 == null){
                items.Item2 = "Potion of Weakness";
                innterStoryText.innerHTML = items.Item2 + ` was placed in slot 2!`;

              }
              else if(items.Item3 == null){
                items.Item3 = "Potion of Weakness";
                innterStoryText.innerHTML = items.Item3 + ` was placed in slot 3!`;

              }
              setTimeout(updateData, 3000);
          },
          option2(){
            updateData();
          }
        },

        Bomb: { title:"You've found a Bomb!", storytext: `Do you want to take it? \n `,
          option1() {
            buttonDisplaChange();
              if(items.Item1 == null){
                items.Item1 = "Bomb";
                innterStoryText.innerHTML = items.Item1 + ` was placed in slot 1!`;
              }
              else if(items.Item2 == null){
                items.Item2 = "Bomb";
                innterStoryText.innerHTML = items.Item2 + ` was placed in slot 2!`;

              }
              else if(items.Item3 == null){
                items.Item3 = "Bomb";
                innterStoryText.innerHTML = items.Item3 + ` was placed in slot 3!`;

              }
              setTimeout(updateData, 3000);
          },
          option2(){
            updateData();
          }
        },

        ThrowingKnife: { title:"You've found a Throwing Knife!", storytext: `Do you want to take it? \n `,
          option1() {
            buttonDisplaChange();
              if(items.Item1 == null){
                items.Item1 = "Throwing Knife";
                innterStoryText.innerHTML = items.Item1 + ` was placed in slot 1!`;
              }
              else if(items.Item2 == null){
                items.Item2 = "Throwing Knife";
                innterStoryText.innerHTML = items.Item2 + ` was placed in slot 2!`;

              }
              else if(items.Item3 == null){
                items.Item3 = "Throwing Knife";
                innterStoryText.innerHTML = items.Item3 + ` was placed in slot 3!`;

              }
              setTimeout(updateData, 3000);
          },
          option2(){
            updateData();
          }
        },

        FreeActionPotion: { title:"You've found a Double Action Potion!", storytext: `Do you want to take it? \n `,
          option1() {
            buttonDisplaChange();
              if(items.Item1 == null){
                items.Item1 = "Double Action Potion";
                innterStoryText.innerHTML = items.Item1 + ` was placed in slot 1!`;
              }
              else if(items.Item2 == null){
                items.Item2 = "Double Action Potion";
                innterStoryText.innerHTML = items.Item2 + ` was placed in slot 2!`;
              }
              else if(items.Item3 == null){
                items.Item3 = "Double Action Potion";
                innterStoryText.innerHTML = items.Item3 + ` was placed in slot 3!`;

              }
              setTimeout(updateData, 3000);
          },
          option2(){
            updateData();
          }
        },
        
        Rats: { title: "Running rat", storytext: ` A rat appears and steals your hp, chase after it?\n `,
          option1() {
            buttonDisplaChange();
            let z = Math.random() *100;
            if (z <= 70) {
              innterStoryText.innerHTML = `You've successfully captured the rat \n Gained: ${x} speed`;
              user.SPD +=x;
              setTimeout(updateData, 3000)
              flags.karma += 20;


            }
            else
            {
              innterStoryText.innerHTML = `You failed to capture the rat \n Lost ${Math.ceil(user.MHP *0.1)}  HP`;

              user.MHP -=Math.ceil(user.MHP *0.1);
              flags.karma += 20;
            
                setTimeout(updateData,3000);              


            }

              
          },
          option2(){
            innterStoryText.innerHTML = `You didn't chase after it \n Lost ${Math.ceil(user.MHP *0.1)}  HP`;

            user.MHP -=Math.ceil(user.MHP *0.1);
            setTimeout(updateData,3000);
          }
        },
        lifeCrystal: { title: "Finding gems", storytext: `You found a red crystal on the floor, wanna pick it up?\n `,
          option1() {
            buttonDisplaChange();
            innterStoryText.innerHTML = `As you pick up the crystal you feel a an increase in vitality HP \n +${Math.ceil(user.MHP/10)} Hp`;
            user.MHP += Math.ceil(user.MHP/10);
            user.CHP += Math.ceil(user.MHP/10);


            setTimeout(updateData,3000);

          },
          option2(){
           updateData();
          }
        },
        Speed: { title: "Finding gems", storytext: `You found a shimmering blue crystal on the floor, wanna pick it up?\n `,
          option1() {
            buttonDisplaChange();
            innterStoryText.innerHTML = `As you pick up the crystal you feel a an increase in speed \n +${Math.ceil(user.SPD/10)} speed`;
            user.SPD += Math.ceil(user.MHP/10);
            


            setTimeout(updateData,3000);

          },
          option2(){
           updateData();
          }
        },
        defense: { title: "Finding gems", storytext: `You found a radiant grey crystal on the floor, wanna pick it up?\n `,
        option1() {
          buttonDisplaChange();
          innterStoryText.innerHTML = `As you pick up the crystal you feel a an increase in defense \n +${Math.ceil(user.DEF/10)} defense`;
          user.DEF += Math.ceil(user.MHP/10);
          


          setTimeout(updateData,3000);

        },
        option2(){
         updateData();
        }
      },
      darkRed: { title: "Finding gems", storytext: `You found a radiant Dark red crystal on the floor, wanna pick it up?\n `,
        option1() {
          buttonDisplaChange();
          innterStoryText.innerHTML = `As you pick up the crystal you feel your wounds healing \n +${Math.ceil((user.MHP-user.CHP)/2)} defense`;
          user.CHP += Math.ceil((user.MHP-user.CHP)/2);
          


          setTimeout(updateData,3000);

        },
        option2(){
         updateData();
        }
      },
      Foraging: { title: "Searching for things", storytext: `As you travel you get the idea to forage for something useful, are you gonna do it?\n `,
      option1() {
        buttonDisplaChange();
        let z = getRndInteger(1,6)
        if (z==1) {
          innterStoryText.innerHTML = `You've picked up some strange mushrooms and ate them \n gained ${Math.floor(x)} speed`;
          user.SPD +=Math.floor(x);

        }
        else if (z==2) {
          innterStoryText.innerHTML = `You stubbed your toe while foragin, and gave up on doing it -${Math.floor(x)} speed`;
          user.SPD -=Math.floor(x);
          if (user.SPD<=5) {
            user.SPD = 6;
          }


        }
        else if (z==3) {
          innterStoryText.innerHTML = `You somehow found fruits. + ${Math.floor(x)}hp`;
          user.CHP +=Math.floor(x);
          if (user.CHP > user.MHP) {
            user.CHP = user.MHP;
            
          }
          
        }
        else if (z==4) {
          innterStoryText.innerHTML = `You found a stone, it did nothing`;

          
        }
        else if (z==5) {
          innterStoryText.innerHTML = `You helped some forest animals, good karma`;
         flags.karma +=20

          
        }
        else if (z==6) {
          innterStoryText.innerHTML = `You destroyed some ant nests, bad karma bro`;
          flags.karma -=50

          
        }
        


        setTimeout(updateData,3000);

      },
      option2(){
       updateData();
      }
    },
     
    };
    
    
    for (var key in commonstories) { //Each object in the object common stories is a key. So  We are telling it to att each key in commonstories to allcommon
        allcommon.push(commonstories[key]);
    }
  
    console.log("common story");
    let b = getRndInteger(0, allcommon.length);
    titleText.innerHTML = allcommon[b].title;
    innterStoryText.innerHTML = allcommon[b].storytext;
    document.getElementById('button1').onclick = function(){
      console.log("hello")
      console.log(allcommon[b].option1)

      allcommon[b].option1();
  }

  document.getElementById('button2').onclick = function(){
    console.log("hello")
    console.log(allcommon[b].option2)
    allcommon[b].option2();
}
  }
  
          //--------------------------------------------------------------------Loading of rare stories -----------------------------------------------------------

  function loadRareStories(){

    let button1 = document.querySelector(".buttonYES") as HTMLElement;
    let button2 = document.querySelector(".buttonNO") as HTMLElement;

    var allRares = [];  
  
    let x=statyield1(flags.stageNr)
    let y=statyield1(flags.stageNr)
    var rareStories = {

      Redmagician: { title: "The magician in red", storytext: `A magician offers you to convert 10% of your hp to STR in exchange for 10% of your HP \n `,
          option1() {
            buttonDisplaChange()
            innterStoryText.innerHTML = `The Magician took ${Math.ceil(user.MHP*0.2)} HP and you gained ${Math.ceil(user.MHP*0.1)} strength`;
            user.STR += Math.ceil(user.MHP*0.1);
            user.MHP -= Math.ceil(user.MHP*0.2);
            user.CHP -= Math.ceil(user.CHP*0.2)



            setTimeout(updateData, 3000)
          },
          option2(){
            updateData();
          },


          RawChicken: { title: "Someones favorite food", storytext: `Upon your journey you get offered some raw chicken, wanna try? \n `,
          option1() {
            buttonDisplaChange();
            let z = Math.random() *100;
            if (z <= 20) {
              innterStoryText.innerHTML = `Chicken = protenin, Protein = Strength \n Gained ${Math.ceil(x)}`;
              user.STR+=Math.ceil(x);
              flags.ChickenEater = true;

              setTimeout(updateData, 3000)

            }
            else
            {
              innterStoryText.innerHTML = `Next time someone offers you raw chicken you should question yourself if you eat it \n lost ${Math.ceil(x)}`;

              user.CHP -=Math.ceil(x);
              flags.Foodpoisoning = true;
              if (user.CHP <=0) {
                setTimeout(hideStorydiv,3000)
                endGame();
              }


            }

              
          },
          option2(){
            updateData();
          }
         },

         Thegiant: { title: "Sunil the giant", storytext: `Sunil the giant challanges you to an arm wresting match, do you accept his challange?\n `,
          option1() {
            buttonDisplaChange()
            if(user.STR<300){
              innterStoryText.innerHTML = `Sunil easily destroyed you as if you were just an tiny insiginificant ant, He tells you to return when you're stronger`;
              flags.LoseAgainstGiant = true;
            }
            else{
              innterStoryText.innerHTML = `You defeated sunil in arm wrestling + \n He gives you an item from his collection`;
              itemDroped();
              flags.WonAgainsGiant = true;



            }

            setTimeout(updateData, 3000)
          },
          option2(){
            updateData();
          },

        },    
        blueMagician: { title: "The magician in blue", storytext: `A magician offers you to convert 10% of your STR to defense in exchange for 10% of your HP \n `,
        option1() {
          buttonDisplaChange()
          innterStoryText.innerHTML = `The Magician took ${Math.ceil(user.MHP*0.1)} HP and you gained ${Math.ceil(user.STR*0.1)} defense, while your strength decreased by ${Math.ceil(user.STR*0.1)}`;
          user.STR -= Math.ceil(user.STR*0.1);
          user.DEF += Math.ceil(user.STR*0.1)
          user.MHP -= Math.ceil(user.MHP*0.1);
          user.CHP -= Math.ceil(user.CHP*0.1)



          setTimeout(updateData, 3000)
        },
        option2(){
          updateData();
        },
        
      },  
      MagicianInRainbow: { title: "A color happy magician", storytext: `A magician offers you to convert 30% HP into 10% stat increanse in all other stats \n `,
      option1() {
        buttonDisplaChange()
        innterStoryText.innerHTML = `The Magician took ${Math.floor(user.MHP*0.3)} HP and you gained 10% in other stats`;
        user.STR += Math.ceil(user.STR*0.1);
        user.DEF += Math.ceil(user.DEF*0.1);
        user.SPD += Math.ceil(user.SPD*0.1);


        user.MHP -= Math.ceil(user.MHP*0.3);
        user.CHP -= Math.ceil(user.CHP*0.3)



        setTimeout(updateData, 3000)
      },
      option2(){
        updateData();
      },
    },


  }

  };
    
    
  
    for (var key in rareStories) { //Each object in the object common stories is a key. So  We are telling it to att each key in commonstories to allcommon
        allRares.push(rareStories[key]);
    }
  
    console.log("rare story");
    let b = getRndInteger(0, allRares.length);
    titleText.innerHTML = allRares[b].title;
    innterStoryText.innerHTML = allRares[b].storytext;
    document.getElementById('button1').onclick = function(){
      console.log("hello")
      console.log(allRares[b].option1)

      allRares[b].option1();
  }

  document.getElementById('button2').onclick = function(){
    console.log("hello")
    console.log(allRares[b].option2)
    allRares[b].option2();
}
  }

            //--------------------------------------------------------------------Loading of epic stories -----------------------------------------------------------


  function loadEpicStories(){

    let button1 = document.querySelector(".buttonYES") as HTMLElement;
    let button2 = document.querySelector(".buttonNO") as HTMLElement;

    var allEpics = [];  
  
    let x=statyield1(flags.stageNr)
    let y=statyield1(flags.stageNr)
    var epicStories = {

         FindingTreasure: { title: "The classic Treasure", storytext: `You've found a treasure chest, do you wish to open it?\n`,
         option1() {
          itemDroped();
        updateData();           

         },
         option2(){
           updateData();
         }
         },
         WagyuCow: { title: "Delicious Meat", storytext: `You've stumbled upon a fat cow and feel quite hungry, wanna go for a hunt? \n`,
         option1() {
          let z = Math.random() *100;
          if (z <= 80) {
            let b =Math.random() *100;
            flags.karma -= 20;

            innterStoryText.innerHTML = `You've succesfully hunted a cow \n`
            if (b <= 95) {
              innterStoryText.innerHTML += ' and you cooked it succesfully \n healed for max HP';
              user.CHP = user.MHP;
              buttonDisplaChange();

            }
            else{
              innterStoryText.innerHTML += 'But you succesfully managed to burn the meat when cooking it';
              buttonDisplaChange();
            }
          }
          else if ( z <= 90)
          {
            innterStoryText.innerHTML = `Failed to capture a ccow i see\n`
            buttonDisplaChange();
          }
          else if ( z <= 100)
          {
            innterStoryText.innerHTML = `You broke your arm when you fell while hunting the cow \n lost permanent 10% HP`
            user.MHP -= Math.ceil(user.MHP*0.1)
            buttonDisplaChange();
          }
          
          setTimeout(updateData,3000)
                   

         },
         option2(){
          flags.karma += 20;

           updateData();
         }
         },
    };
    
    
  
    for (var key in epicStories) { //Each object in the object common stories is a key. So  We are telling it to att each key in commonstories to allcommon
        allEpics.push(epicStories[key]);
    }
  
    console.log("epic story");
    let b = getRndInteger(0, allEpics.length);
    titleText.innerHTML = allEpics[b].title;
    innterStoryText.innerHTML = allEpics[b].storytext;
    document.getElementById('button1').onclick = function(){
      console.log("hello")
      console.log(allEpics[b].option1)

      allEpics[b].option1();
  }
  document.getElementById('button2').onclick = function(){
    console.log("hello")
    console.log(allEpics[b].option2)
    allEpics[b].option2();
}

  }


  //--------------------------------------------------------------------Loading of mythic stories -----------------------------------------------------------


  function loadMythicStories(){

  let button1 = document.querySelector(".buttonYES") as HTMLElement;
  let button2 = document.querySelector(".buttonNO") as HTMLElement;


    var allMythics = [];
  
  
    let x=statyield1(flags.stageNr)
    let y=statyield1(flags.stageNr)
    var mythicStories = {

       CardGame: { title: "A Game Of Cards", storytext: `A groud of strangers appears in front of you and invites you to a game of cards. Do you wish to join them?  \n`,
      option1() {
      
        buttonDisplaChange();
        let z = Math.random() *100;
        console.log(z)

        if (z <=  80) {
          console.log(user);
          
          innterStoryText.innerHTML = `While you didn't win the game was quite relaxing \n You become fully healed ` ;
          user.CHP = user.MHP;
        }
        else if(z <= 100){
          innterStoryText.innerHTML = "After an intense game you somehow come out on top \n You get a 15% STR increase ";
          user.STR = Math.ceil(user.STR*1.15)
        }
          


          setTimeout(updateData, 3000)
      },
      option2(){
        updateData();

      }
        }, 
        DevilsDeal: { title: "A deal with the  Devil", storytext: `The Devil has watched your journey and offers you a deal, 90% of your HP in exchange for great power. Do you wish to take the deal?  \n`,
        option1() {
        
          buttonDisplaChange();
          let z = Math.random() *100;
          console.log(z)
  
          if (z <=  99.9) {
            console.log(user);
            
            innterStoryText.innerHTML = `Taking the deal with the devil doubled your strength in exchange for ${user.MHP*0.9}` ;
            user.MHP = Math.ceil(user.MHP*0.1);
            user.STR = Math.ceil(user.STR*2);
            flags.DevilsDeal = true;
          }
          else if(z <= 100){
            innterStoryText.innerHTML = "the Devil is engraged as the odds are with you, you tricked even the devil, getting you 50% strength at no cost.";
            user.STR = Math.floor(user.STR*1.50)
          }
            
  
  
            setTimeout(updateData, 3000)
        },
        option2(){
          updateData();
  
        }
      },
      StatueOfDivnity: { title: "A statue of divinity", storytext: `You see a statue with divine radiance, do you wish to give your HP to it?\n`,
        option1() {
        
          buttonDisplaChange();
  
  
          if (flags.karma > 0) {
            console.log(user);
            
            innterStoryText.innerHTML = `The statue blesses you with a minor increase in all stats,` ;
            user.MHP = Math.ceil(user.MHP*1.1);
            user.STR = Math.ceil(user.STR*1.1);
            user.SPD = Math.ceil(user.SPD*1.1);
            user.DEF = Math.ceil(user.DEF*1.1);
            
            
          }
          else if(flags.karma > 300){
            innterStoryText.innerHTML = "The statue blesses your with a greater blessing due to your good karm, and you get fully healed";
            user.MHP = Math.ceil(user.MHP*1.2);
            user.STR = Math.ceil(user.STR*1.2);
            user.SPD = Math.ceil(user.SPD*1.2);
            user.DEF = Math.ceil(user.DEF*1.2);        
            user.CHP = user.MHP;
            flags.HolyWarrior = true;
            }
            else if (flags.karma<=0){

              innterStoryText.innerHTML = "The statue gives no reaction";


            }
            else if (flags.karma<=-100){

              innterStoryText.innerHTML = "The statue gives takes 20% HP for your bad karma ";
              user.MHP = Math.floor(user.MHP*0.8);
              user.CHP = Math.floor(user.CHP*0.8);



            }
            
  
  
            setTimeout(updateData, 3000)
        },
        option2(){
          updateData();
  
        }
      }
    };
    
    
  
    for (var key in mythicStories) { //Each object in the object common stories is a key. So  We are telling it to att each key in commonstories to allcommon
        allMythics.push(allMythics[key]);
    }
  
    console.log("mythic story");
    let b = getRndInteger(0, allMythics.length);
    innterStoryText.innerHTML = allMythics[b].storytext;
    titleText.innerHTML = allMythics[b].title;

    document.getElementById('button1').onclick = function(){
      console.log("hello")
      console.log(allMythics[b].option1)

      allMythics[b].option1();
  }
    document.getElementById('button2').onclick = function(){
      console.log("hello")
      console.log(allMythics[b].option2)
      allMythics[b].option2();
}
    }

  




              
 //--------------------------------------------------------------------To load stories in collision detection -----------------------------------------------------------
 export function Randomstory() {
   
    var storydiv = <HTMLElement>document.querySelector('.storydiv');
    storydiv.style.display = "block"

    var storybox = <HTMLElement>document.querySelector('.story-event');
    storybox.style.display = "none"

  let button1 = document.querySelector(".buttonYES") as HTMLElement;
  let button2 = document.querySelector(".buttonNO") as HTMLElement;
  

  button1.style.visibility = "visible";
  button2.style.visibility = "visible";
  button1.style.display = "block";
  button2.style.display = "block";

   let chance = Math.random() *100;
   if (chance <=65) {

     console.log("common") 
     loadcommonstory();
     
 
   }
   else if (chance <= 90) {
       console.log("rare story");
       loadRareStories();
 
   }
   else if (chance <= 99) {
    console.log("epic") 

        loadEpicStories();
    }

   else if (chance <= 100) {
    console.log("myth") 

       loadMythicStories();
   }
 }