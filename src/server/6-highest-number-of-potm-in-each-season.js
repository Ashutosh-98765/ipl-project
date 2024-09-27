// Find a player who has won the highest number of Player of the Match awards for each season

import matches from '../data/matches.json' assert { type: 'json' }

export function highestNumberOfPOTM() {
    let playerListPerSeason = {};
    try {
        for (let i = 0; i < matches.length; i++) {
            let { season, player_of_match } = matches[i]

            if (playerListPerSeason[season]) {
                if (playerListPerSeason[season][player_of_match]) {
                    playerListPerSeason[season][player_of_match]++;
                }
                else {
                    playerListPerSeason[season][player_of_match] = 1;
                }
            }
            else {
                playerListPerSeason[season] = {};
                playerListPerSeason[season][player_of_match] = 1;
            }
        }
        let playerOfTheSeason = {};
        for (let key in playerListPerSeason) {
            let max = 0;
            let playerName = "";
            let value = playerListPerSeason[key];
            for (let player in value) {
                if (value[player] > max) {
                    max = value[player]
                    playerName = player;

                }
            }
            playerOfTheSeason[key] = {};
            playerOfTheSeason[key][playerName] = max;
        }
        return playerOfTheSeason;
    }

    catch (error) {
        console.error("Error while calculating highest player of the match per season: ", error);
        return {};
    }
}
