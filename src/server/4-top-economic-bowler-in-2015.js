// 4. Top 10 economical bowlers in the year 2015

import matches from '../data/matches.json' assert { type: 'json' }
import deliveries from '../data/deliveries.json' assert { type: 'json'}

export function topEconomicalBowlerIn2015() {
  let matchId2015 = [];
  let bowlersList = {};
  try {
    for (let i = 0; i < matches.length; i++) {
      let { season, id } = matches[i];

      if (season === "2015") {
        matchId2015.push(id);
      }
    }

    for (let i = 0; i < deliveries.length; i++) {
      let { match_id, wide_runs, bye_runs, bowler, total_runs } = deliveries[i];
      if (matchId2015.includes(match_id)) {
        if (bowlersList[bowler]) {
          bowlersList[bowler]['totalRuns'] += Number(total_runs);
          if (Number(wide_runs) == 0 && Number(bye_runs) == 0) {
            bowlersList[bowler]['totalBalls']++;
          }
        }
        else {
          bowlersList[bowler] = { 'totalRuns': 0, 'totalBalls': 0 }
          bowlersList[bowler]['totalRuns'] = Number(total_runs);
          if (Number(wide_runs) == 0 && Number(bye_runs) == 0) {
            bowlersList[bowler]['totalBalls']++;
          }
        }

      }
    }

    let top10EconomialBowlers = [];
    for (let bowler in bowlersList) {
      let over = bowlersList[bowler]['totalBalls'] / 6;
      let totalRuns = bowlersList[bowler]['totalRuns'];
      let eco = totalRuns / over;
      top10EconomialBowlers.push({ 'bowler': bowler, 'eco': eco })
    }
    top10EconomialBowlers.sort((a, b) => a.eco - b.eco);
    return top10EconomialBowlers.slice(0, 10);
  }

  catch (error) {
    console.error("Error while calculating top economical bowlers: ", error);
    return {};
  }
}
