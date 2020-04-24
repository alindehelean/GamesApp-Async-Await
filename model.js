var apiURL = "https://games-app-siit.herokuapp.com";

// function getGamesList(callbackFunction){
//     fetch(apiURL + "/games", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         } 
//     }).then(function(response){
//         return response.json();
//     }).then(function(arrayOfGames){
//         console.log(arrayOfGames);
//         callbackFunction(arrayOfGames);
//     });
// }

async function getGamesList() {
    const response = await fetch(apiURL + "/games", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    const arrayOfGames = response.json();
    return arrayOfGames;
  }

// function deleteGame(gameID, callbackFunction) {
//     console.log(gameID);
//     fetch(apiURL + "/games/" + gameID, {
//         method: "DELETE"
//     }).then(function(r){
//         console.log(r);
//         return r.text(); 
        
//     }).then(function(apiresponse){
        
//         console.log(apiresponse);
//         callbackFunction(apiresponse);
//     });

// }

async function deleteGame(gameID){
    const r = await fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    });
    const apiresponse = r.text();
    return apiresponse;
}

// function createGameRequest(gameObj, callbackCreateGame){
//     fetch(apiURL + "/games", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: gameObj 
//     }).then(function(response){
//         console.log(response);
//         return response.json();
//     }).then(function(createdGame){
//         console.log(createdGame);
//         callbackCreateGame(createdGame);
//     });
// }

async function createGameRequest(gameObj){
    const response = await fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObj
    });
    const createdGame = response.json();
    return createdGame; 
}


// function updateGameRequest(gameid,updatedGameObj, callbackUpdateGame){
//     fetch(apiURL + "/games/" + gameid,  {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: updatedGameObj
//     }).then(function(response){
//         return response.json();
//     }).then(function(updatedResponse){
//         // console.log(updatedResponse);
//         callbackUpdateGame(updatedResponse);
//     });
// }

async function updateGameRequest(gameid,updatedGameObj){
    const response = await fetch(apiURL + "/games/" + gameid, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: updatedGameObj
    });
    const updatedResponse = response.json();
    return updatedResponse; 
}

// Difference

// "application/json"
// {"cheie": "valoare", "cheie2": "valoare2"}

//application/x-www-form-urlencoded
// cheie=valoare&cheie2=valoare2