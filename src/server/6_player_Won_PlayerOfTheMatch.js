import fs from 'fs';
import matches from '../data/matches.json' assert { type: 'json' }



function playerWonPlayerOfTheMatch(){
   let resultData = {};
   for(let i=0; i<matches.length; i++){
    let season = matches[i].season;
    let playerOfTheMatch = matches[i].player_of_match;
    if(resultData[season]){
        if(resultData[season][playerOfTheMatch]){
            resultData[season][playerOfTheMatch]++;
        }
        else{
            resultData[season][playerOfTheMatch] =1;
        }
    }
    else{
        resultData[season]={};
        resultData[season][playerOfTheMatch]=1;
    }
   }
   let result ={};
   for(let key in resultData){
   let max = 0;
   let playerName = "";
   let value = resultData[key];
   for(let player in value){
    if(value[player] > max){
        max = value[player]
        playerName = player;

    }
   }
   result[key] = {};
   result[key][playerName] = max;
   }
   return result;
}


let result = playerWonPlayerOfTheMatch();
// console.log(result);
const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/6_player_Won_PlayerOfTheMatch.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}