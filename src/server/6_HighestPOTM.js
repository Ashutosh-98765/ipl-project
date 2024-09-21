import matches from '../data/matches.json' assert {type : 'json'};

function highest_POTM_Per_Season(){

    let matchPOTMseason = matches.reduce((acc , {season , player_of_match}) => {
        acc[season] = acc[season] || {};
        acc[season][player_of_match] = (acc[season][player_of_match] || 0) + 1;
        return acc;
    },{});
//    console.log(matchPOTMseason);

    let highestPOTMEachSeason = Object.entries(matchPOTMseason).reduce((acc , [key , value]) => {
        acc[key] = acc[key] || {};
        let max = 0
        let batsman = "";
        Object.entries(value).forEach(([key , value]) => {
            if(value > max){
                max = value;
                batsman = key;
            }
        });
        acc[key][batsman] = max;
        return acc;
        
    },{});
   console.log(Object.entries(matchPOTMseason))
    console.log(highestPOTMEachSeason);
}
highest_POTM_Per_Season();