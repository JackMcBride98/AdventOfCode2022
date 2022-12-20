var fs = require('fs');
let contents = fs.readFileSync('exampleInput.txt', 'utf8').split('\r\n').map(line => ({name: line.match(/(?<=Valve )\w*/)[0], flowRate: parseInt(line.match(/(?<=rate=)\d*/)[0]), leadsTo: line.match(/[A-Z]{2}/g)}));
contents.forEach(content => content.leadsTo = content.leadsTo.filter(lead => lead !==  content.name));
console.log(contents);

const time = 1;

let i = 0;
let location = 0;
let valves = contents;
while ( i < time){
    let currentLocation = valves[location];
    let worthwhileValves = contents.filter(valve => valve.flowRate > 0);
    let currentTime = 1;
    let visitableValves = [...currentLocation.leadsTo];
    let stillToGetToValves = worthwhileValves.filter(valve => !valve.timeToGetThere);
    while (worthwhileValves.some(valve => !valve.timeToGetThere)) {
        console.log(visitableValves, worthwhileValves)
        for (let valve of stillToGetToValves) {
            if (visitableValves.includes(valve.name)){

                valve.timeToGetThere = currentTime;
            }
        }
        currentTime++;
        //Add visitable valves in
        for (let valve of visitableValves) {
            let theValve = valves.find(valve => valve.name === valve);
            if (theValve){

            visitableValves.push(...theValve.leadsTo);
            }
        }
        visitableValves = Array.from(new Set(visitableValves));
        stillToGetToValves = worthwhileValves.filter(valve => !valve.timeToGetThere)
    }
    // for (valve of worthwhileValves) {
    //     console.log(valve)
    // }
        //find time to valve from currentLocation



    // console.log(worthwhileValves)
    // let possibleActions =
    i++;
}
console.log(worthwhileValves)