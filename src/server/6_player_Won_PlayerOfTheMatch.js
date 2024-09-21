import fs from 'fs';
import matches from '../data/matches.json' assert { type: 'json' }



function player_Won_PlayerOfTheMatch(){
   let playerList = {};
   for(let i=0; i<matches.length; i++){
    let { season , player_of_match } = matches[i]
    
    if(playerList[season]){
        if(playerList[season][player_of_match]){
            playerList[season][player_of_match]++;
        }
        else{
            playerList[season][player_of_match] =1;
        }
    }
    else{
        playerList[season]={};
        playerList[season][player_of_match]=1;
    }
   }
   let playerOfTheSeason ={};
   for(let key in playerList){
   let max = 0;
   let playerName = "";
   let value = playerList[key];
   for(let player in value){
    if(value[player] > max){
        max = value[player]
        playerName = player;

    }
   }
   playerOfTheSeason[key] = {};
   playerOfTheSeason[key][playerName] = max;
   }
   return playerOfTheSeason;
}


let result = player_Won_PlayerOfTheMatch();
// console.log(result);
const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/6_player_Won_PlayerOfTheMatch.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}