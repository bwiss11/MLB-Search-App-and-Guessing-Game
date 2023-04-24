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


async function get2023PlayerStats() {
    let response = await fetch("https://statsapi.mlb.com/api/v1/people?personIds=668939&hydrate=stats(group=[batting],type=[yearByYear])");
    let data = await response.json()
    console.log(data.people[0].fullName)
    return data.people[0]//.stats[0].splits.slice(-1)[0].stat;
}

//get2023PlayerStats().then(data => console.log(data))
//getMLBAll().then(data => console.log(data.people[0].stats[0].splits.slice(-1)))
let stats2023 = await get2023PlayerStats()
console.log(stats2023)
let name = stats2023.fullName
let hits = stats2023.stats[0].splits.slice(-1)[0].stat.hits
let avg = stats2023.stats[0].splits.slice(-1)[0].stat.avg
let obp = stats2023.stats[0].splits.slice(-1)[0].stat.obp
let slg = stats2023.stats[0].splits.slice(-1)[0].stat.slg
let rbis = stats2023.stats[0].splits.slice(-1)[0].stat.rbi
let hrs = stats2023.stats[0].splits.slice(-1)[0].stat.homeRuns
let ops = stats2023.stats[0].splits.slice(-1)[0].stat.ops
// let ops = (parseInt(obp) + parseInt(slg)).toString()


console.log(stats2023)

console.log(hits, avg, obp, slg, rbis)
document.getElementById("name").innerHTML = name
document.getElementById("avg").innerHTML = avg
document.getElementById("hits").innerHTML = hits
document.getElementById("obp").innerHTML = obp
document.getElementById("slg").innerHTML = slg
document.getElementById("rbis").innerHTML = rbis
document.getElementById("hrs").innerHTML = hrs
document.getElementById("ops").innerHTML = ops
export {get2023PlayerStats};

