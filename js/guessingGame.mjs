const form = document.getElementById('guessing-form-ajax');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // prevent form submission

    console.log('running random.mjs')

    async function get2023Players() {
      let response = await fetch("https://statsapi.mlb.com/api/v1/sports/1/players?season=2023");
      let data = await response.json();
      return data.people;
  };
  

    async function getNumberMicro(upperLimit) {
        let response = await fetch("http://localhost:8000/randomnumber", 
        {
          method: 'POST',
          mode: 'cors',
          headers: {
              // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
              "Content-type": "application/json"
          },
          body: JSON.stringify({ range: upperLimit })
      })
        let data = await response.json()
        let num = data.randomnumber
        return num
      };
      

      // Gets the player's stats from 2023
      async function getPlayerStats(playerId) {
          let response = await fetch("https://statsapi.mlb.com/api/v1/people?personIds=" + playerId + "&hydrate=stats(group=[batting],type=[yearByYear])");
          let data = await response.json()
          console.log(data.people[0])
          return data.people[0];
}     
      
      // Retrieves the roster of the player's team from ESPN's API
      async function getTeam(teamNumber) {
          let response = await fetch("https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/" + teamNumber + "?enable=roster");
          let data = await response.json()
          return data
};

          // Goes through list of team's players and finds the headshot for the player whose name matches the input
      async function getHeadshot(teamRoster, inputPlayer) {
          for (let i = 0; i < teamRoster.team.athletes.length; i++) {
              if (teamRoster.team.athletes[i].fullName == inputPlayer) {
                  playerPic = teamRoster.team.athletes[i].headshot.href
                  break
              }
          }
          return playerPic
        };
        
      async function main() {
          // Gets a list of all the players that have played in the MLB this year
          let players2023 = await get2023Players();

          // Finds total numbers of players and generates a random number <= the total number of players
          let playersLength = players2023.length
          let randNumber = Number(await getNumberMicro(playersLength));
          let chosenPlayer = players2023[randNumber]

          // Records the player's name in a variable
          let randPlayer = chosenPlayer.fullName
          let playerId = chosenPlayer.id

          // Assigns player's 2023 stats to a variable
          let playerStats = await getPlayerStats(playerId)

          // Establishes a dictionary of teams and their corresponding team numbers in ESPN's API
          let teamsDict = {
            'Arizona Diamondbacks': '29', 'Atlanta Braves': '15', 'Baltimore Orioles': '1', 'Boston Red Sox': '2', 'Chicago Cubs': '16',
            'Chicago White Sox': '4', 'Cincinnati Reds': '17', 'Cleveland Guardians': '5', 'Colorado Rockies': '27', 'Detroit Tigers': '6', 'Houston Astros': '18',
            'Kansas City Royals': '7', 'Los Angeles Angels': '3', 'Los Angeles Dodgers': '19', 'Miami Marlins': '28', 'Milwaukee Brewers': '8', 'Minnesota Twins': '9', 
            'New York Mets': '21', 'New York Yankees': '10', 'Oakland Athletics': '11', 'Philadelphia Phillies': '22', 'Pittsburgh Pirates': '23', 'San Diego Padres': '25', 'San Francisco Giants': '26',
            'Seattle Mariners': '12', 'St. Louis Cardinals': '24', 'Tampa Bay Rays': '30', 'Texas Rangers': '13', 'Toronto Blue Jays': '14', 'Washington Nationals': '20'
          }
          // Gets player's team name
          let team = playerStats.stats[0].splits.slice(-1)[0].team.name
        
          // Gets player's team's ESPN API number from teamsDict
          let teamNumber = teamsDict[team]

          // Assigns the player's team's roster to a variable
          let teamRoster = await getTeam(teamNumber)

          // Calls function that returns link to player's headshot, assigns the headshot to be dynamically displayed on the Results page
          let headshot = await getHeadshot(teamRoster, randPlayer)

          // Gets player's position - used to return different data for pitchers vs. batters
          let position = playerStats.primaryPosition.abbreviation

          // Gets player's number and name to be displayed next to their headshot
          let name = playerStats.fullName
          let number = playerStats.primaryNumber

        //   // Adds the player's headshot to the page
        //   const headshotsection = document.querySelector(".ajax-section .headshot");

        //   // Adds the player's headshot
        //   const pic = document.createElement("div");
        //   pic.classList.add("headshot");
        //   const markuppic = `

        //   <div class="container">
        //     <div>
        //       <img src=${headshot}>
        //     </div>
        //     <div id="playerinfo">
        //       #${number} ${name} <br><br>  ${position} - ${team} 
        //     </div>
        //   </div>
        //   `;
        //   pic.innerHTML = markuppic
        //   headshotsection.appendChild(pic)

          // Adds the player's statistics to a table to be displayed
          const statssection = document.querySelector(".ajax-section .stats");
          statssection.innerHTML = ''

          console.log('number of seasons is ', playerStats.stats[0].splits, playerStats.stats[0].splits.length)
          const table = document.createElement("table");
          table.classList.add("stats");
          if (position == 'P') {
            console.log(playerStats.stats[0].splits.slice(-1)[0].stat)
            // Player stats for pitchers
            // Breaks players information into individual variables
            for (let season = 0; season < playerStats.stats[0].splits.length; season++) {
                console.log('season number ', season)
            
            let year = playerStats.stats[0].splits.slice(season)[0].season
            let games = playerStats.stats[0].splits.slice(season)[0].stat.gamesPlayed
            let inningsPitched = playerStats.stats[0].splits.slice(season)[0].stat.inningsPitched
            let wins =  playerStats.stats[0].splits.slice(season)[0].stat.wins
            let losses = playerStats.stats[0].splits.slice(season)[0].stat.losses
            let saves = playerStats.stats[0].splits.slice(season)[0].stat.saves
            let era = playerStats.stats[0].splits.slice(season)[0].stat.era
            let whip = playerStats.stats[0].splits.slice(season)[0].stat.whip
            let strikeouts = playerStats.stats[0].splits.slice(season)[0].stat.strikeOuts
            let strikeoutsPer9 = playerStats.stats[0].splits.slice(season)[0].stat.strikeoutsPer9Inn
            let oppOps = playerStats.stats[0].splits.slice(season)[0].stat.ops

          console.log('season number is' + season)
          if (season == 0) {
            // Puts in header rows while adding in first season's statistics
          let markupstats = `
                <th>Year</th>
                <th>Games</th>
                <th>Innings Pitched</th>
                <th>Win - Loss</th>
                <th>Saves</th>
                <th>Earned Run Average</th>
                <th>WHIP</th>
                <th>Strikeouts</th>
                <th>Strikeouts Per 9</th>
                <th>Opponent OPS</th>
              <tr> 
                <td>${year}</td>
                <td>${games}</td>
                <td>${inningsPitched}</td>
                <td>${wins} - ${losses}</td>
                <td>${saves}</td>
                <td>${era}</td>
                <td>${whip}</td>
                <td>${strikeouts}</td>
                <td>${strikeoutsPer9}</td>
                <td>${oppOps}</td>
              </tr>
          `;
          table.innerHTML = markupstats;
          statssection.appendChild(table);}
          else {
            // Only adds statistics (with no header rows) if it is past the first season
            const row = document.createElement("tr")
            let markupstats = `
            <tr>
                <td>${year}</td>
                <td>${games}</td>
                <td>${inningsPitched}</td>
                <td>${wins} - ${losses}</td>
                <td>${saves}</td>
                <td>${era}</td>
                <td>${whip}</td>
                <td>${strikeouts}</td>
                <td>${strikeoutsPer9}</td>
                <td>${oppOps}</td>
              </tr>
          `;
          row.innerHTML = markupstats;
          table.appendChild(row);
            }
          }
        } else {
          // Player stats for non-pitchers
          for (let season = 0; season < playerStats.stats[0].splits.length; season++) {
        
            let year = playerStats.stats[0].splits.slice(season)[0].season
            let hits =  playerStats.stats[0].splits.slice(season)[0].stat.hits
            let avg = playerStats.stats[0].splits.slice(season)[0].stat.avg
            let obp = playerStats.stats[0].splits.slice(season)[0].stat.obp
            let slg = playerStats.stats[0].splits.slice(season)[0].stat.slg
            let rbis = playerStats.stats[0].splits.slice(season)[0].stat.rbi
            let hrs = playerStats.stats[0].splits.slice(season)[0].stat.homeRuns
            let ops = playerStats.stats[0].splits.slice(season)[0].stat.ops

       // Fills out table with player's stats puts in header rows while adding in first season's statistics
       if (season == 0) {
       let markupstats = `
             <th>Year</th>
             <th>Hits</th>
             <th>Home Runs</th>
             <th>RBIs</th>
             <th>Batting Average</th>
             <th>On Base Percentage</th>
             <th>Slugging Percentage</th>
             <th>On Base + Slugging</th>
           <tr> 
             <td>${year}</td>
             <td>${hits}</td>
             <td>${hrs}</td>
             <td>${rbis}</td>
             <td>${avg}</td>
             <td>${obp}</td>
             <td>${slg}</td>
             <td>${ops}</td>
           </tr>
       `;
       table.innerHTML = markupstats;
       statssection.appendChild(table);
       }
       else {
        // Only adds statistics (with no header rows) if it is past the first season
        const row = document.createElement("tr")
        let markupstats = `
          <tr> 
            <td>${year}</td>
            <td>${hits}</td>
            <td>${hrs}</td>
            <td>${rbis}</td>
            <td>${avg}</td>
            <td>${obp}</td>
            <td>${slg}</td>
            <td>${ops}</td>
          </tr>`
      row.innerHTML = markupstats;
      table.appendChild(row);
       }
      }
    }
  }
      main()
});