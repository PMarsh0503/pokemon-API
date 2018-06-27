const baseURL= "https://pokeapi.co/api/v2/pokemon/";
let url;

//Search Form
const name = document.querySelector(".name");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");

//Results Section
const section = document.querySelector("section");

const res = document.querySelector(".results");
res.style.display = "none";

searchForm.addEventListener("submit", fetchResults);

function fetchResults(e) {
    console.log(e);
    e.preventDefault();
    //Assemble full URL
    url = baseURL + name.value + "/";
    console.log(url);

    fetch(url)
    .then(function(result) {
        console.log(result)
        return result.json();
    })
    .then(function(json) {
        console.log(json);
        displayResults(json);
    });
}

function displayResults(json) {
    while(section.firstChild) {
        section.removeChild(section.firstChild);
    }
    
    res.style.display = "block";
    //console.log("Name:", json.name);

    if(json.name == 0) {
        console.log("No results");
    } else {
        //console.log(json.stats)
        let heading = document.createElement("h2");
        let cap = json.name.charAt(0).toUpperCase() + json.name.substr(1);
        heading.textContent = cap;
        
        section.appendChild(heading);

        let type = document.createElement("h3");
        if(json.types.length === 1){
            type.textContent= "Type: " + json.types[0].type.name;
        }
        if(json.types.length === 2){
            type.textContent= "Types: " + 
            json.types[0].type.name.charAt(0).toUpperCase() + json.types[0].type.name.substr(1) + ", " + 
            json.types[1].type.name.charAt(0).toUpperCase() + json.types[1].type.name.substr(1);
        }

        section.appendChild(type);

        let row = document.createElement("div");
        row.setAttribute("class", "row");
        let titleL = document.createElement("div");
        titleL.setAttribute("class", "col-7");
        let titleR = document.createElement("div");
        titleR.setAttribute("class", "col-5");

        titleL.textContent = "Stat Name";
        titleR.textContent = "Base Stat";
        
        section.appendChild(row);
        row.appendChild(titleL);
        row.appendChild(titleR);

        for(let i = 0; i < json.stats.length; i++) {
            //console.log(i);
            //console.log(json.stats[i].stat.name, json.stats[i].base_stat);

            let contentL = document.createElement("div");
            contentL.setAttribute("class", "col-7");
            let contentR = document.createElement("div");
            contentR.setAttribute("class", "col-5");

            let orig = json.stats[i].stat.name.charAt(0).toUpperCase() + json.stats[i].stat.name.substr(1);
            let rep = orig.replace("-", " ")

            contentL.textContent = rep;
            contentR.textContent = json.stats[i].base_stat;

            row.appendChild(contentL);
            row.appendChild(contentR);
            section.appendChild(row);

        }
    }
}
