// import fetch from 'node-fetch'

// import e from "express";

const form = document.getElementById('player-search-form-ajax');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent form submission

  const inputFirstName = document.getElementById('inputfirstname').value;
  const inputLastName = document.getElementById('inputlastname').value;
  const searchYear = document.getElementById('year-dropdown').value;
  async function getPlayers(year) {
    let response = await fetch("https://statsapi.mlb.com/api/v1/sports/1/players?season=" + year);
    let data = await response.json();
    return data.people;
};

// Assigns list of all the players to a variable
let players = await getPlayers(searchYear);
//   const response = await fetch(`/api?q=${userInput}`); // make API request
//   const data = await response.json(); // parse response data
// Creates two dicts, one for going from player ID to their name and vice versa
var idToNameDict = new Object();
var nameToIdDict = new Object();

// First fills out dict from id:name (doing name:id first missed a few entries for some reason)
for (let i = 0; i < players.length; i++) {
    idToNameDict[players[i].id] = players[i].fullName

};

// Fills out dictionary for going from name to player ID
for (const [key, value] of Object.entries(idToNameDict)) {
    nameToIdDict[value] = key;
  }

// Current spot to hardcode in the player you want
let inputPlayer = inputFirstName + ' ' + inputLastName
let playerId = nameToIdDict[inputPlayer]

// Gets the player's information
async function getPlayerInfo() {
    let response = await fetch("https://statsapi.mlb.com/api/v1/people?personIds=" + playerId + "&hydrate=stats(group=[batting],type=[yearByYear])");
    let data = await response.json()
    return data.people[0];
}

// Assigns player's stats to a variable
let playerStats = await getPlayerInfo()

// Gets player data to be displayed next to headshot
let name = playerStats.fullName
let position = playerStats.primaryPosition.abbreviation
let team = playerStats.stats[0].splits.slice(-1)[0].team.name
let number = playerStats.primaryNumber

let teamsDict = {
  'Arizona Diamondbacks': '29', 'Atlanta Braves': '15', 'Baltimore Orioles': '1', 'Boston Red Sox': '2', 'Chicago Cubs': '16',
  'Chicago White Sox': '4', 'Cincinnati Reds': '17', 'Cleveland Guardians': '5', 'Colorado Rockies': '27', 'Detroit Tigers': '6', 'Houston Astros': '18',
  'Kansas City Royals': '7', 'Los Angeles Angels': '3', 'Los Angeles Dodgers': '19', 'Miami Marlins': '28', 'Milwaukee Brewers': '8', 'Minnesota Twins': '9', 
  'New York Mets': '21', 'New York Yankees': '10', 'Oakland Athletics': '11', 'Philadelphia Phillies': '22', 'Pittsburgh Pirates': '23', 'San Diego Padres': '25', 'San Francisco Giants': '26',
  'Seattle Mariners': '12', 'St. Louis Cardinals': '24', 'Tampa Bay Rays': '30', 'Texas Rangers': '13', 'Toronto Blue Jays': '14', 'Washington Nationals': '20'
}

// Gets player's team's ESPN API number from teamsDict
let teamNumber = teamsDict[team]

// Retrieves the roster of the player's team from ESPN's API
async function getTeam() {
  let response = await fetch("https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/" + teamNumber + "?enable=roster");
  let data = await response.json()
  return data
};

// Assigns the player's team's roster to a variable
let teamRoster = await getTeam()

// Establishes variable to hold link to player's headshot
var playerPic = ''

// Goes through list of team's players and finds the headshot for the player whose name matches the input
async function getHeadshot() {
    for (let i = 0; i < teamRoster.team.athletes.length; i++) {
        if (teamRoster.team.athletes[i].fullName == inputPlayer) {
            playerPic = teamRoster.team.athletes[i].headshot.href
            break
        }
    }
    return playerPic
};

// Calls function that returns link to player's headshot, assigns the headshot to be dynamically displayed on the Results page
let headshot = await getHeadshot()

// Adds the player's headshot to the page
const headshotsection = document.querySelector(".ajax-section .headshot");

// Clears section if there is already an old picture being displayed
headshotsection.innerHTML = ''

// Adds the player's headshot
const pic = document.createElement("div");
pic.classList.add("headshot");
const markuppic = `

<div class="container">
  <div>
    <img src=${headshot}>
  </div>
  <div id="playerinfo">
    #${number} ${name} <br><br>  ${position} - ${team} 
  </div>
</div>
`;
pic.innerHTML = markuppic
headshotsection.appendChild(pic)


// Adds the player's statistics to a table to be displayed
const statssection = document.querySelector(".ajax-section .stats");

// Clears section if there is already old stats being displayed
statssection.innerHTML = ''
// Gets the player's stats from the year that was searched
for (year in playerStats.stats[0].splits) {
  if (playerStats.stats[0].splits[year].season == searchYear) {
    yearStats = playerStats.stats[0].splits[year]
}
  }
  
if (position == 'P') {

  // Player stats for pitchers
  // Breaks players information into individual variables
  let inningsPitched = yearStats.stat.inningsPitched
  let wins =  yearStats.stat.wins
  let losses = yearStats.stat.losses
  let saves = yearStats.stat.saves
  let era = yearStats.stat.era
  let whip = yearStats.stat.whip
  let strikeouts = yearStats.stat.strikeOuts
  let strikeoutsPer9 = yearStats.stat.strikeoutsPer9Inn
  let oppOps = yearStats.stat.ops

const table = document.createElement("table");
table.classList.add("stats");
const markupstats = `
<br>
      <th>Name</th>
      <th>Innings Pitched</th>
      <th>Win - Loss</th>
      <th>Saves</th>
      <th>Earned Run Average</th>
      <th>WHIP</th>
      <th>Strikeouts</th>
      <th>Strikeouts Per 9</th>
      <th>Opponent OPS</th>
    <tr> 
      <td>${name}</td>
      <td>${inningsPitched}</td>
      <td>${wins} - ${losses}</td>
      <td>${saves}</td>
      <td>${era}</td>
      <td>${whip}</td>
      <td>${strikeouts}</td>
      <td>${strikeoutsPer9}</td>
      <td>${oppOps}</td>
    </tr>
<br>
`;
table.innerHTML = markupstats;
statssection.appendChild(table);
} else {
  // Player stats for non-pitchers
  // Breaks players information into individual variables
  let hits =  yearStats.stat.hits
  let avg = yearStats.stat.avg
  let obp = yearStats.stat.obp
  let slg = yearStats.stat.slg
  let rbis = yearStats.stat.rbi
  let hrs = yearStats.stat.homeRuns
  let ops = yearStats.stat.ops
// Fills out table with player's stats
const table = document.createElement("table");
table.classList.add("stats");
const markupstats = `
<br>
      <th>Name</th>
      <th>Hits</th>
      <th>Home Runs</th>
      <th>RBIs</th>
      <th>Batting Average</th>
      <th>On Base Percentage</th>
      <th>Slugging Percentage</th>
      <th>On Base + Slugging</th>
    <tr> 
      <td>${name}</td>
      <td>${hits}</td>
      <td>${hrs}</td>
      <td>${rbis}</td>
      <td>${avg}</td>
      <td>${obp}</td>
      <td>${slg}</td>
      <td>${ops}</td>
    </tr>
<br>
`;
table.innerHTML = markupstats;
statssection.appendChild(table);
}

form.reset()


});