// import fetch from 'node-fetch'
console.log('hi hi')
async function getUsers() {
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    let data = await response.json()
    return data;
}

//getUsers().then(data => console.log(data));



// async function getMLB() {
//     let response = await fetch("https://statsapi.mlb.com/api/v1/people?personIds=668939&season=2023&hydrate=stats(group=[batting],type=[hits,season])'");
//     let data = await response.json()
//     return data;
// }

//getMLB().then(data => console.log(data.people[0].stats[0].splits[0].stat.avg, data.people[0].stats[0].splits[0].stat))
//https://statsapi.mlb.com/api/v1/stats?stats=sabermetrics&group=hitting&sportId=1&season=2023

// async function get2023Players() {
//     let response = await fetch("https://statsapi.mlb.com/api/v1/stats?stats=sabermetrics&group=hitting&sportId=1&season=2023");
//     let data = await response.json()
//     return data
// }


// for (const person in players2023.stats[0].splits) {
//     console.log(person)
// };
// console.log(players2023.stats[0].splits)
// console.log(players2023.stats[0].splits[0].player.fullName)
// console.log(players2023.stats[0].splits.slice(-1)[0].player.fullName)
// console.log('players above')

// async function get2023PlayerStats() {
//     let response = await fetch("https://statsapi.mlb.com/api/v1/people?personIds=668939&hydrate=stats(group=[batting],type=[yearByYear])");
//     let data = await response.json()
//     return data.people[0]//.stats[0].splits.slice(-1)[0].stat;
// }


async function get2023Players() {
     let response = await fetch("https://statsapi.mlb.com/api/v1/sports/1/players?season=2023");
     let data = await response.json()
     console.log(data.people[0], 'new')
     return data.people
};

let players2023 = await get2023Players()

// Creates two dicts
var idToNameDict = new Object();
var nameToIdDict = new Object();

// first fills out dict from id:name (doing name:id first missed a few entries for some reason)
for (let i = 0; i < players2023.length; i++) {
    idToNameDict[players2023[i].id] = players2023[i].fullName

};

for (const [key, value] of Object.entries(idToNameDict)) {
    nameToIdDict[value] = key;
  }

// Converts to name: id format
// console.log(nameToIdDict, 'name to id')


let inputPlayer = 'Adam Frazier'
let playerId = nameToIdDict[inputPlayer]


async function get2023PlayerStats() {
    let response = await fetch("https://statsapi.mlb.com/api/v1/people?personIds=" + playerId + "&hydrate=stats(group=[batting],type=[yearByYear])");
    let data = await response.json()
    return data.people[0]//.stats[0].splits.slice(-1)[0].stat;
}

let playerStats = await get2023PlayerStats()



//get2023PlayerStats().then(data => console.log(data))
//getMLBAll().then(data => console.log(data.people[0].stats[0].splits.slice(-1)))
// let stats2023 = await get2023PlayerStats()
let name = playerStats.fullName
let hits =  playerStats.stats[0].splits.slice(-1)[0].stat.hits
let avg = playerStats.stats[0].splits.slice(-1)[0].stat.avg
let obp = playerStats.stats[0].splits.slice(-1)[0].stat.obp
let slg = playerStats.stats[0].splits.slice(-1)[0].stat.slg
let rbis = playerStats.stats[0].splits.slice(-1)[0].stat.rbi
let hrs = playerStats.stats[0].splits.slice(-1)[0].stat.homeRuns
let ops = playerStats.stats[0].splits.slice(-1)[0].stat.ops

let position = playerStats.primaryPosition.abbreviation
let team = playerStats.stats[0].splits.slice(-1)[0].team.name
let number = playerStats.primaryNumber


document.getElementById("name").innerHTML = name
document.getElementById("avg").innerHTML = avg
document.getElementById("hits").innerHTML = hits
document.getElementById("obp").innerHTML = obp
document.getElementById("slg").innerHTML = slg
document.getElementById("rbis").innerHTML = rbis
document.getElementById("hrs").innerHTML = hrs
document.getElementById("ops").innerHTML = ops
document.getElementById("header").innerHTML = '#' + number + ' ' + name + '<br></br>' + position + ' - ' + team


// export {get2023PlayerStats};

async function getTeam() {
    let response = await fetch("https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/1?enable=roster");
    let data = await response.json()
    return data
};

let orioles = await getTeam()



// Establishes variable to hold link to player's headshot
var playerPic = ''

async function getHeadshot() {
    // Goes through list of team's players and finds the headshot for the player whose name matches the input
    for (let i = 0; i < orioles.team.athletes.length; i++) {
        if (orioles.team.athletes[i].fullName == inputPlayer) {
            playerPic = orioles.team.athletes[i].headshot.href
            break
        }
    }
    return playerPic
};

// Calls function that returns link to player's headshot
let headshot = await getHeadshot()
document.getElementById("headshot").src = headshot

console.log('player pic', playerPic)