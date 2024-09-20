// 5. Find the number of times each team won the toss 
// and also won the match

import fs from 'fs';
import matches from '../data/matches.json' assert { type: 'json' }



// function teamWonTossAndMatch(){
//     let result = {};
//     for(let i=0; i<matches.length; i++){
//         let toss_winner = matches[i].toss_winner
//         let winner = matches[i].winner
//         if(toss_winner === winner){
//         if(result[winner]){
//             result[winner]++
//         }
//         else{
//             result[winner] = 1;
//         }
//     }
//     }
//     return result;
// }

function team_Won_Toss_And_Match(){
  let teamWonTossAndMatch = {};
  for(let i=0; i<matches.length; i++){
    let { winner , toss_winner} = matches[i];
    if(winner === toss_winner){
      if(teamWonTossAndMatch[winner]){
        teamWonTossAndMatch[winner]++;
      }
      else{
        teamWonTossAndMatch[winner] = 1;
      }
    }
  }
  return teamWonTossAndMatch
}

let result = team_Won_Toss_And_Match();
const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/5_team_Won_Toss_And_Match.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}
