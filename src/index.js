import { matchesPerYear } from './server/1-matches-per-year.js'
import { matchesWonPerTeamPerYear } from './server/2-matches-won-per-team-per-year.js'
import { extraRunConcededPerTeamIn2016 } from './server/3-extra-run-conceded-per-team-in-2016.js'
import { topEconomicalBowlerIn2015 } from './server/4-top-economic-bowler-in-2015.js'
import { teamWonTossAndMatch }from './server/5-team-won-toss-and-match.js'
import { highestNumberOfPOTM } from './server/6-highest-number-of-potm-in-each-season.js'
import { strikeRateOfBatsmanInEachSeason } from './server/7-strikerate-of-batsman-in-each-season.js'
import { highestNumberOfPlayerDismissed } from './server/8-highest-number-of-player-replaced.js'
import { bowlerBestInSuperover} from './server/9-bowler-with-best-economy-in-superover.js'
import fs from 'fs';

function writeToFile(fileName, data) {
    try {
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
        console.log(`${fileName} written successfully`);
    } catch (error) {
        console.error(`Error writing ${fileName}: `, error);
    }
}


function runFunctions() {
    let matchesPerYearData = matchesPerYear();
    writeToFile('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/matchesPerYear.json', matchesPerYearData);

    let matchesWonPerYearData = matchesWonPerTeamPerYear();
    writeToFile('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/matchesWonPerTeamPerYear.json', matchesWonPerYearData);

    let extraRunsConcededData = extraRunConcededPerTeamIn2016();
    writeToFile('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/extraRunsConceded2016.json', extraRunsConcededData);

    let topEconomicalBowlersData = topEconomicalBowlerIn2015();
    writeToFile('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/topEconomicBowler2015.json', topEconomicalBowlersData);

    let teamWonTossAndMatchData = teamWonTossAndMatch();
    writeToFile('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/teamWonTossAndMatch.json', teamWonTossAndMatchData);

    let highestPotmPerSeasonData = highestNumberOfPOTM();
    writeToFile('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/highestPotmPerSeason.json', highestPotmPerSeasonData);

    let strikeRateEachSeasonData = strikeRateOfBatsmanInEachSeason();
    writeToFile('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/batsmamStrikeRateEachSeason.json', strikeRateEachSeasonData);

    let highestDismissalPlayerData = highestNumberOfPlayerDismissed();
    writeToFile('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/highestDismissalCount.json', highestDismissalPlayerData);

    let bestEconomySuperOverBowlerData = bowlerBestInSuperover();
    writeToFile('/home/dell/JS-IPL-DATA-PROJECT/src/public/output/bestEconomySuperOver.json' , bestEconomySuperOverBowlerData);

}

runFunctions();

