require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionDestination = document.getElementById("missionTarget");
   missionDestination.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src=${imageUrl}>
                `;
}
function validateInput(testInput) {
    if(testInput === "") {
        return "Empty";
    } else if(isNaN(testInput) === true) {
       return "Not a Number";
   } else if (isNaN(testInput) === false) {
       return "Is a Number";
   }
}
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {


   if(fuelLevel < 10000 || cargoLevel > 10000) {
       if (fuelLevel < 10000) {
           document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
       } else {
           document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
       }
       if (cargoLevel > 10000) {
           document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
       } else {
           document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
       }
       document.getElementById("faultyItems").style.visibility = "visible";
       document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
       document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";
    } else {
       document.getElementById("faultyItems").style.visibility = "visible";
       document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
       document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
       document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch";
       document.getElementById("launchStatus").style.color = "rgb(65, 159, 106)";
    }


    let pilotStatus = document.getElementById("pilotStatus");
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    let copilotStatus = document.getElementById("copilotStatus");
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;


}
async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });
    return planetsReturned;
}
function pickPlanet(planets) {
    let planetIndex = Math.floor(Math.random() * planets.length);
    return planets[planetIndex];
}
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
