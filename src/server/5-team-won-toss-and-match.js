// 5. Find the number of times each team won the toss  and also won the match

import matches from '../data/matches.json' assert { type: 'json' }

export function teamWonTossAndMatch() {
  let teamWonTossAndMatchList = {};
  try {
    for (let i = 0; i < matches.length; i++) {
      let { winner, toss_winner } = matches[i];
      if (winner === toss_winner) {
        if (teamWonTossAndMatchList[winner]) {
          teamWonTossAndMatchList[winner]++;
        }
        else {
          teamWonTossAndMatchList[winner] = 1;
        }
      }
    }
    return teamWonTossAndMatchList
  }

  catch (error) {
    console.error("Error while calculating teams that won both toss and match: ", error);
    return {};
  }
}

