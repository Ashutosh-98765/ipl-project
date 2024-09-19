import fs from 'fs';
import matches from '../data/matches.json' assert { type: 'json' }



function teamWonTossAndMatch(){
    let result = {};
    for(let i=0; i<matches.length; i++){
        let toss_winner = matches[i].toss_winner
        let winner = matches[i].winner
        if(toss_winner === winner){
        if(result[winner]){
            result[winner]++
        }
        else{
            result[winner] = 1;
        }
    }
    }
    return result;
}

let result = teamWonTossAndMatch();
const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/5_team_Won_Toss_And_Match.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}
