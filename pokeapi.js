"use strict";

function displayPokemon(pokemonObject) {
    // map the contents of jsonObject to your page
    let parsedHeight = parseInt(pokemonObject.height);
    let parsedWeight = parseInt(pokemonObject.weight);
    let height = (parsedHeight * 3.9370);
    let weight = (parsedWeight / 4.5359237);

    document.getElementById("pokeName").innerHTML = pokemonObject.name;
    document.getElementById("pokeSprite").src = pokemonObject.sprites.front_default;
    document.getElementById("pokeHeight").innerHTML = (height.toFixed(2) + " inches");
    document.getElementById("pokeWeight").innerHTML = (weight.toFixed(2) + " lbs");

    var ul = document.getElementById("pokeAbility");
    ul.innerHTML = "";

    for (var i = 0; i < pokemonObject.abilities.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = pokemonObject.abilities[i].ability.name;
        ul.appendChild(li);
    }
}

function loadPokemon() {
    var pokemonId = document.getElementById("pokemonId").value.toLowerCase();
    callAjax(pokemonId);
}

function callAjax(pokemonId) {
    setState("loading");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {  // this means we found a pokemon and got data back.
                displayPokemon(JSON.parse(this.responseText));
                setState("found");
            }
            if (this.status == 404) {  // this means no pokemon was found for the id entered
                setState("error");
            }
        }
    };
    xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokemonId, true);
    xhttp.send();
}

function setState(state) {
    switch (state) {
        case "loading" : 
            document.getElementById("notFound").classList.add("hide");
            document.getElementById("pokemon").classList.add("hide");
            document.getElementById("loading").classList.remove("hide");    
            break;
        case "error" : 
            document.getElementById("notFound").classList.remove("hide");
            document.getElementById("pokemon").classList.add("hide");
            document.getElementById("loading").classList.add("hide");    
            break;
        case "found" : 
            document.getElementById("notFound").classList.add("hide");
            document.getElementById("pokemon").classList.remove("hide");
            document.getElementById("loading").classList.add("hide");    
            break;
    }
}