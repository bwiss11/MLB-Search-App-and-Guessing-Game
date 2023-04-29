// import fetch from 'node-fetch'

// import e from "express";

console.log('test.mjs called');

const form = document.getElementById('player-search-form-ajax');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent form submission

  const inputFirstName = document.getElementById('inputfirstname').value;
  const inputLastName = document.getElementById('inputlastname').value;
  async function get2023Players() {
    let response = await fetch("https://statsapi.mlb.com/api/v1/sports/1/players?season=2023");
    let data = await response.json();
    return data.people;
};

// Assigns list of all the players to a variable
let players2023 = await get2023Players();
//   const response = await fetch(`/api?q=${userInput}`); // make API request
//   const data = await response.json(); // parse response data
// Creates two dicts, one for going from player ID to their name and vice versa
var idToNameDict = new Object();
var nameToIdDict = new Object();

// First fills out dict from id:name (doing name:id first missed a few entries for some reason)
for (let i = 0; i < players2023.length; i++) {
    idToNameDict[players2023[i].id] = players2023[i].fullName

};

// Fills out dictionary for going from name to player ID
for (const [key, value] of Object.entries(idToNameDict)) {
    nameToIdDict[value] = key;
  }

// Current spot to hardcode in the player you want
let inputPlayer = inputFirstName + ' ' + inputLastName
let playerId = nameToIdDict[inputPlayer]

// Gets the player's stats from 2023
async function get2023PlayerStats() {
    let response = await fetch("https://statsapi.mlb.com/api/v1/people?personIds=" + playerId + "&hydrate=stats(group=[batting],type=[yearByYear])");
    let data = await response.json()
    return data.people[0];
}

// Assigns player's 2023 stats to a variable
let playerStats = await get2023PlayerStats()
  // render new HTML page with API results
//   const renderedHtml = ejs.render(template, { data });
  console.log(playerStats);
});




let playerSearchForm = document.getElementById('player-search-form-ajax');
console.log(playerSearchForm)
console.log('hi')

// playerSearchForm.addEventListener("submit", function(e) {
//     e.preventDefault();
//     let playerFirstName = document.getElementById("input-firstname");
//     let playerLastName = document.getElementById("input-lastname");
//     let playerFullName = playerFirstName + ' ' + playerLastName;
//     console.log(playerFullName, 'is player fullname');
// });

// Gets a list of all of the players that have played in 2023
// async function get2023Players() {
//      let response = await fetch("https://statsapi.mlb.com/api/v1/sports/1/players?season=2023");
//      let data = await response.json();
//      return data.people;
// };

// // Assigns list of all the players to a variable
// let players2023 = await get2023Players();

// // Creates two dicts, one for going from player ID to their name and vice versa
// var idToNameDict = new Object();
// var nameToIdDict = new Object();

// // First fills out dict from id:name (doing name:id first missed a few entries for some reason)
// for (let i = 0; i < players2023.length; i++) {
//     idToNameDict[players2023[i].id] = players2023[i].fullName

// };

// // Fills out dictionary for going from name to player ID
// for (const [key, value] of Object.entries(idToNameDict)) {
//     nameToIdDict[value] = key;
//   }

// // Current spot to hardcode in the player you want
// let inputPlayer = 'Adley Rutschman'
// let playerId = nameToIdDict[inputPlayer]

// // Gets the player's stats from 2023
// async function get2023PlayerStats() {
//     let response = await fetch("https://statsapi.mlb.com/api/v1/people?personIds=" + playerId + "&hydrate=stats(group=[batting],type=[yearByYear])");
//     let data = await response.json()
//     return data.people[0];
// }

// // Assigns player's 2023 stats to a variable
// let playerStats = await get2023PlayerStats()



// // Sets variables equal to their corresponding data from 2023 stats
// let name = playerStats.fullName
// let hits =  playerStats.stats[0].splits.slice(-1)[0].stat.hits
// let avg = playerStats.stats[0].splits.slice(-1)[0].stat.avg
// let obp = playerStats.stats[0].splits.slice(-1)[0].stat.obp
// let slg = playerStats.stats[0].splits.slice(-1)[0].stat.slg
// let rbis = playerStats.stats[0].splits.slice(-1)[0].stat.rbi
// let hrs = playerStats.stats[0].splits.slice(-1)[0].stat.homeRuns
// let ops = playerStats.stats[0].splits.slice(-1)[0].stat.ops
// let position = playerStats.primaryPosition.abbreviation
// let team = playerStats.stats[0].splits.slice(-1)[0].team.name
// let number = playerStats.primaryNumber


// document.getElementById("name").innerHTML = name
// document.getElementById("avg").innerHTML = avg
// document.getElementById("hits").innerHTML = hits
// document.getElementById("obp").innerHTML = obp
// document.getElementById("slg").innerHTML = slg
// document.getElementById("rbis").innerHTML = rbis
// document.getElementById("hrs").innerHTML = hrs
// document.getElementById("ops").innerHTML = ops
// document.getElementById("header").innerHTML = '#' + number + ' ' + name + '<br></br>' + position + ' - ' + team
// console.log('here'
// )

// // export {get2023PlayerStats};

// // Function and other code that was used to initially create teamsDict, no longer needed
// // let teamsDict = Object()

// // async function getAllTeams() {
// //     let response = await fetch("https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams");
// //     let data = await response.json()
// //     return data.sports[0].leagues[0].teams
// // }
// // let allTeams = await getAllTeams()
// // for (let i=0; i < allTeams.length; i++) {
// //     teamsDict[allTeams[i].team.displayName] =  allTeams[i].team.id
// // }

// let teamsDict = {
//     'Arizona Diamondbacks': '29', 'Atlanta Braves': '15', 'Baltimore Orioles': '1', 'Boston Red Sox': '2', 'Chicago Cubs': '16',
//     'Chicago White Sox': '4', 'Cincinnati Reds': '17', 'Cleveland Guardians': '5', 'Colorado Rockies': '27', 'Detroit Tigers': '6', 'Houston Astros': '18',
//     'Kansas City Royals': '7', 'Los Angeles Angels': '3', 'Los Angeles Dodgers': '19', 'Miami Marlins': '28', 'Milwaukee Brewers': '8', 'Minnesota Twins': '9', 
//     'New York Mets': '21', 'New York Yankees': '10', 'Oakland Athletics': '11', 'Philadelphia Phillies': '22', 'Pittsburgh Pirates': '23', 'San Diego Padres': '25', 'San Francisco Giants': '26',
//     'Seattle Mariners': '12', 'St. Louis Cardinals': '24', 'Tampa Bay Rays': '30', 'Texas Rangers': '13', 'Toronto Blue Jays': '14', 'Washington Nationals': '20'
//   }

// // Gets player's team's ESPN API number from teamsDict
// let teamNumber = teamsDict[team]

// // Retrieves the roster of the player's team from ESPN's API
// async function getTeam() {
//     let response = await fetch("https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/" + teamNumber + "?enable=roster");
//     let data = await response.json()
//     return data
// };

// // Assigns the player's team's roster to a variable
// let teamRoster = await getTeam()

// // Establishes variable to hold link to player's headshot
// var playerPic = ''

// // Goes through list of team's players and finds the headshot for the player whose name matches the input
// async function getHeadshot() {
//     for (let i = 0; i < teamRoster.team.athletes.length; i++) {
//         if (teamRoster.team.athletes[i].fullName == inputPlayer) {
//             playerPic = teamRoster.team.athletes[i].headshot.href
//             break
//         }
//     }
//     return playerPic
// };

// // Calls function that returns link to player's headshot, assigns the headshot to be dynamically displayed on the Results page
// let headshot = await getHeadshot()
// document.getElementById("headshot").src = headshot

// export {get2023Players};