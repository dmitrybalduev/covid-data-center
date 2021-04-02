let countryInput;
let cityForWeather = "";
let arrayCountries = [];
let arrayAllCountries = [];
let searchHistoryA = JSON.parse(localStorage.getItem("searchHistory"));
let code = "";

$("#submit-button").on("click", function(){
    countryInput = $("#country-input").val()
    countryInput = capitalizeCountryName(countryInput);
    renderSearch();    
});

function renderSearch(){
    let country = countryInput;
    //getting code for given country:
     getCode(country);
    $("#country-input").val("checking country....");
    
    let url = "https://covid-api.mmediagroup.fr/v1/cases?country=" + country;
    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            if(Object.keys(data)[0] === "Afghanistan"){
                displayError();
                return;
            }
            //this creates an array
            if(searchHistoryA == null){
                searchHistoryA = [];
            }
            // this line below checks to see if the country has already been searched for
            if(!searchHistoryA.includes(country)){
                searchHistoryA.push(country);  
            } 
            localStorage.setItem("searchHistory", JSON.stringify(searchHistoryA));
            
            
            $("#country-name").text(country);
            $("#population").text("Population: " + data.All.population);
            $("#capital-name").text("Catital city: " + data.All.capital_city);
            $("#confirmed-cases").text("Confirmed cases: " + data.All.confirmed);
            $("#deaths").text("Deaths: " + data.All.deaths);
            $("#recovered").text("Deaths: " + data.All.recovered);
            //the below line clears the search box after the search is complete
            $("#country-input").val("");
            flag();

        })
        
}

//this function fills the search box with a message prompting the user to enter an actual country
function displayError(){
    $("#country-input").val("please enter a valid country");
    $("#country-input").css("color","red");

    setTimeout(function(){
        $("#country-input").val("");
        $("#country-input").css("color","black");
    },1500);
}

function getListCountry(){
    let url = "https://covid-api.mmediagroup.fr/v1/cases"
    
    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            arrayCountries = Object.keys(data);
            arrayCountries.splice( arrayCountries.length-2, 2);
            arrayAllCountries = arrayCountries;
            $('#country-input').autocomplete({
                source: arrayAllCountries,
            });
        })
}
getListCountry();


previouslySearchedCountries();
// this function generates the search history list
function previouslySearchedCountries(){  
    console.log(searchHistoryA);
    if(searchHistoryA == null){
        return;
    };
    for(let i=0; i<searchHistoryA.length; i++){
        let countryItem = $("<button>")
        $(".search-history").append(countryItem);
        countryItem.text(searchHistoryA[i]);
        countryItem.addClass("clickable");
        countryItem.css("display", "block");
        countryItem.attr("data-country", searchHistoryA[i]);
        countryItem.css("display", "block")
    }
    $(".clickable").on("click", function(){
        countryInput = $(this).attr("data-country");
        console.log(countryInput);
        renderSearch();
    });
}

function capitalizeCountryName(name){
    //looping through the array of countries list
    for(let i = 0; i < arrayAllCountries.length; i++){
        //check if input country matches with any of countries from array ignoring case
        if(arrayAllCountries[i].toLowerCase() === name.toLowerCase()){
            return arrayAllCountries[i];
        }
    }
    return "";
}

//function to get country code by country name
function getCode(countryName){
    //let code = "";
    fetch("https://api.first.org/data/v1/countries?q=" + countryName)
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        //retrieving code from JSON object
        code = Object.keys(data.data)[0];
    })
    //return code;
}

let imgError = $("<p>")
let isError = false;
function flag(){
    //let url = "https://wft-geo-db.p.rapidapi.com/v1/geo/countries/"+code;  //"+=afc5f5f08amshf6217d97864312ep1529d2jsn75cc6f37ffb1";
    //the above is a different way
    console.log("CODE HERE: " + code);
    fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/countries/"+code, {
        "method": "GET",
        "headers": {
        "x-rapidapi-key": "afc5f5f08amshf6217d97864312ep1529d2jsn75cc6f37ffb1"
        //"x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
        }
    })
    .then(function (response){
            if(response.status != 200){
                $(".info-display").hide();
                $(".grid-3").append(imgError);
                imgError.text("no image");
                imgError.show();
                isError = true;
                return;
            }else{
                isError = false;
            }
            return response.json();
    })
    .then(function(re) {
        console.log(re);
        if(!isError){
            imgError.hide();
            $(".info-display").show();
            $(".info-display").attr("src", re.data.flagImageUri);
        }
    })
    .catch(function(err) {
        console.error(err);
    });
}
