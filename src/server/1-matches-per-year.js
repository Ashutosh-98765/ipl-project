// 1.Number of matches played per year for all the years in IPL.

import matches from '../data/matches.json' assert { type: 'json' }

export function matchesPerYear() {
  let matchPerYear = {};
  try {
    for (let i = 0; i < matches.length; i++) {
      let { season } = matches[i];
      if (!season) {
        throw new Error("Season data is missing");
      }

      if (matchPerYear[season]) {
        matchPerYear[season]++;
      }
      else {
        matchPerYear[season] = 1;
      }
    }
    return matchPerYear;
  }

  catch (error) {
    console.error("Error while processing matches per year data: ", error);
    return {};
  }
}

