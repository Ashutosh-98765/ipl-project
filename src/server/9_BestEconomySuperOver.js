import deliveries from  '../data/deliveries.json' assert {type : 'json'};

function best_Economy_SuperOver(){
    let bowlerStats = deliveries.reduce((acc , {bowler , is_super_over, total_runs}) => {
        if(is_super_over === "1"){
            if(!acc[bowler]){
                acc[bowler] = {'totalRuns' : 0 , 'totalBalls' : 0};
                acc[bowler]['totalRuns'] = acc[bowler]['totalRuns'] + Number(total_runs);
                acc[bowler]['totalBalls']++;
            }
            else{
                acc[bowler]['totalRuns'] = acc[bowler]['totalRuns'] + Number(total_runs);
                acc[bowler]['totalBalls']++;
            }
        }
        return acc;
    }, {});

    // console.log(bowlerStats);

    let economy = Object.entries(bowlerStats).reduce((acc , [bowler , stats]) => {
        let eco = stats['totalRuns'] / (stats['totalBalls']/6);
        acc[bowler] = eco;
        return acc;
    },[]);
    // console.log(economy);

    // economy.sort(([,a],[,b]) => {
    //     console.log(a , b);
    //     return a - b;
    // });




    let sortedEconomy = Object.entries(economy).sort(([,a] , [,b]) => {
        return a-b;
    }).reduce((acc , [key , value]) => {
        acc[key] = value;
        return acc;
    }, {});

    // console.log(sortedEconomy);

    console.log(Object.entries(sortedEconomy).slice(0,1));
    
}
best_Economy_SuperOver();
