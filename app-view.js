
// getGamesList(function(arrayOfGames){
//     for(var i = 0; i < arrayOfGames.length; i++) {
//         createDomElement(arrayOfGames[i]);
//     }
// });

async function startApp() {
    try{
        const arrayOfGames = await getGamesList();
        console.log(arrayOfGames)
        for (var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
        }
    } catch {
        alert('Error!');
    }
  }
  
  startApp();


function createDomElement(gameObj){
    var container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.setAttribute("id", gameObj._id)
    gameELement.innerHTML = `<h1>${gameObj.title}</h1> 
                            <img src="${gameObj.imageUrl}" />
                            <p>${gameObj.description}</p> 
                            <button class="delete-btn">Delete Game</button>
                            <button class="update-btn">Edit Game</button>`; 
                        
    
    container1.appendChild(gameELement);


    document.getElementById(`${gameObj._id}`).addEventListener("click", function(event){
        console.log(event.target);
        if(event.target.classList.contains('delete-btn')){
            // deleteGame(gameELement.getAttribute("id"), function(apiResponse){
            // //console.log(event.target);
            // //console.log(apiResponse);
            // removeDeletedElementFromDOM(event.target.parentElement);
            // })

        async function removeGameFromApp(){
            try{
                const apiresponse = await deleteGame(event.target.parentElement.getAttribute("id"));
                console.log(apiresponse);
                removeDeletedElementFromDOM(event.target.parentElement);
            }catch{
                console.log("Error");
            }
        } 

        removeGameFromApp();


        } else if(event.target.classList.contains('update-btn')){
            const updateGameElement = document.createElement("div");
            updateGameElement.setAttribute("class","update");
            updateGameElement.innerHTML = `<form class="updateForm">
                                    <label for="gameTitle">Title *</label>
                                    <input type="text" value="" name="gameTitle" id="gameTitle"/>
                                    <label for="gameDescription">Description</label>
                                    <textarea name="gameDescription" id="gameDescription"></textarea>
                                    <label for="gameImageUrl">Image URL *</label>
                                    <input type="text" name="gameImageUrl" id="gameImageUrl"/>
                                    <button class="editBtn">Save Changes</button>
                                    <button class="cancelBtn">Cancel</button>
                                  </form>`;

            gameELement.appendChild(updateGameElement);
            clone(gameELement,updateGameElement);
            //console.log('ceva');
            //console.log(updateGameElement);
        } else if(event.target.classList.contains('cancelBtn')){
            removeDeletedElementFromDOM(event.target.parentElement.parentElement);
        } else if(event.target.classList.contains('editBtn')){
            event.preventDefault();
    
        const updatedGameTitle = event.target.parentElement.querySelector('#gameTitle').value;
        const updatedGameDescription = event.target.parentElement.querySelector('#gameDescription').value;
        const updatedGameImage = event.target.parentElement.querySelector('#gameImageUrl').value;
        
       async function editedDom(){
            try{
        gameELement.querySelector('h1').innerHTML = await updatedGameTitle;
        gameELement.querySelector('p').innerHTML = await updatedGameDescription;
        gameELement.querySelector('img').src = await updatedGameImage;
            }catch{
                console.log("Error");
            }
        }
    
        var urlEncoded = new URLSearchParams();
        urlEncoded.append("title", updatedGameTitle);
        urlEncoded.append("description", updatedGameDescription);
        urlEncoded.append("imageUrl", updatedGameImage);
         
            // updateGameRequest(gameELement.getAttribute("id"), urlEncoded,editedDom);  

            async function appUpdateGameRequest(){
                try{
                    const updatedResponse = await updateGameRequest(gameELement.getAttribute("id"),urlEncoded)
                    console.log(updatedResponse);
                    editedDom();
                }catch {
                    console.log("Error");
                }
            }

            appUpdateGameRequest();

            removeDeletedElementFromDOM(event.target.parentElement.parentElement); 

        }
    });
}

function clone(divELement,updateDivElement) {
    const copiedGameTitle = divELement.querySelector("h1").innerText; 
    const copiedGameDescription = divELement.querySelector("p").innerText;
    const copiedGameUrl = divELement.querySelector("img").getAttribute("src");
    //console.log(copiedGameUrl);
    //console.log(copiedGameDescription);
    //console.log(copiedGameTitle);
    const newGameTitle = updateDivElement.querySelector('input[name="gameTitle"]'); 
    newGameTitle.value += copiedGameTitle; 
    const newGameDescription = updateDivElement.querySelector('textarea');
    newGameDescription.value += copiedGameDescription;
    const newImageUrl = updateDivElement.querySelector('input[name="gameImageUrl"]');
    newImageUrl.value += copiedGameUrl;
}

function removeDeletedElementFromDOM(domElement){
    domElement.remove();
}

function validateFormElement(inputElement, errorMessage){
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}

document.querySelector(".submitBtn").addEventListener("click", function(event){
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");

    if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);

        // createGameRequest(urlencoded, createDomElement);

        async function appCreateGameRequest(){
            try{
                const createdGame = await createGameRequest(urlencoded);
                console.log(createdGame);
                createDomElement(createdGame);
            }catch{
                console.log("Error");
            }
        }
        appCreateGameRequest();
    }

})
