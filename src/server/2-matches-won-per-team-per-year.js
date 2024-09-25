// 2. Number of matches won per team per year in IPL.

import fs from 'fs';
import matches from '../data/matches.json' assert { type: 'json' }



// function matchesWonTeamPerYear(){
//     let wonMatchesPerYear = {};
//     for(let i=0; i<matches.length; i++){
//         let season = matches[i]['season']
//         let winner = matches[i]['winner']
//         if(wonMatchesPerYear[season]){
//             if(wonMatchesPerYear[season][winner]){
//                 wonMatchesPerYear[season][winner]++;
//             }
//             else{
//                 if(winner === ""){
//                     continue;
//                 }
//                 else{
//                     wonMatchesPerYear[season][winner] =1;
//                 }
//             }
//         }
//         else{
//             wonMatchesPerYear[season] = {};
//             wonMatchesPerYear[season][winner] = 1;
//         }
//     }
//     return wonMatchesPerYear;

// }

function matches_Won_Per_TeamPerYear(){
    let matchesWonTeamPerYear = {};
    for(let i=0; i<matches.length;i++){
        let { season , winner } = matches[i];
        if(matchesWonTeamPerYear[season]){
            if(matchesWonTeamPerYear[season][winner]){
                matchesWonTeamPerYear[season][winner]++;
            }
            else{
                if(winner === ""){
                    continue;
                }
                else{
                    matchesWonTeamPerYear[season][winner] = 1;
                }
            }
        }
            else{
                matchesWonTeamPerYear[season]={};
                matchesWonTeamPerYear[season][winner] = 1;
            }
        }
        return matchesWonTeamPerYear
    }


let result = matches_Won_Per_TeamPerYear();


const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/2_matches_Won_Per_Team_Per_Year.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}