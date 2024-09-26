// 1.Number of matches played per year for all the years in IPL.

import matches from '../../data/matches.json' assert {type : 'json'};

function matches_per_year(){
    let matchesPerYear = {};
     matches.forEach(({season}) => {
        matchesPerYear[season] = (matchesPerYear[season] || 0) + 1;
    })
    console.log(matchesPerYear);
}

matches_per_year();


function matchesPerYearReduce(){
    let result = matches.reduce((acc , {season}) =>{
        acc[season] = (acc[season] || 0) + 1;
        return acc;
    },{});
    console.log(result);
}
matchesPerYearReduce();

function matches_PerYear_Reduce(){
    let result = matches.reduce((acc, item)=> {
        let {season} = item;
        if(!acc[season])
        {
            acc[season] = 0;
        }
        
            acc[season]++;
    
        return acc;
    },{});
    return result;
}
console.log(matches_PerYear_Reduce())