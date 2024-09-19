import fs from 'fs';

import deliveries from '../data/deliveries.json' assert { type:'json'}



function findHighestNoPlayerReplaced(){
    let dismissData = {};
    for(let key in deliveries){
        let {player_dismissed : playerName , bowler:bowlerName} = deliveries[key]
        if(playerName !== ""){
            if(!dismissData[playerName]){
                dismissData[playerName] = {}
                if(!dismissData[playerName][bowlerName]){
                    dismissData[playerName][bowlerName] = 1;
                }
                else{
                    dismissData[playerName][bowlerName]++;
                }
            }
            else{
                if(!dismissData[playerName][bowlerName]){
                    dismissData[playerName][bowlerName]=1;
                }
                else{
                    dismissData[playerName][bowlerName]++;
                }
            }
        }
    }

    let result = {};
    let max = 0;
        let player = "";
        let bowler = "";
    for(let key in dismissData){
        
        for(let value in dismissData[key]){
            if(dismissData[key][value]>max){
                max = dismissData[key][value];
                player = key;
                bowler = dismissData[key];
            }
        }

    }
    result[player] = {};
    result[player][bowler] = max;
    return result;
}

let result = findHighestNoPlayerReplaced();
const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/8_highest_No_Player_Replaced.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}