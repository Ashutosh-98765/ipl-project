// 1.Number of matches played per year for all the years in IPL.

import fs from 'fs';
import matches from '../data/matches.json' assert { type: 'json' }

// function matchPerYear(){
//   let result ={};
//   for(let i=0; i<matches.length; i++){
//     let season = matches[i]['season'];
//     if(result[season]){
//       result[season] = result[season]+1;
//     }
//     else{
//       result[season]=1;
//     }
//   }
//   return result;
// }



function match_Per_Year(){
  let matchPerYear ={};
  for(let i=0; i<matches.length; i++){
    let { season } = matches[i];
    if(matchPerYear[season]){
      matchPerYear[season]++;
    }
    else{
      matchPerYear[season]=1;
    }
  }
  return matchPerYear;
}
let result = match_Per_Year();


const jsonData = JSON.stringify(result, null, 2);

try {
  fs.writeFileSync('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/1_matchesPerYear.json' , jsonData);
  console.log("File parsed successfully");
} catch (error) {
  console.log("Error occured while parsing ",error);
}
