let countryInput;
let cityForWeather = "";
let arrayCountries = [];
let arrayAllCountries = [];
let searchHistoryA = JSON.parse(localStorage.getItem("searchHistory"));


$("#submit-button").on("click", function(){
    countryInput = $("#country-input").val()
    countryInput = capitalizeCountryName(countryInput);
    renderSearch();
});

function renderSearch(){
    let country = countryInput;
    
    $("#country-input").val("checking country....");
    
    let url = "http://covid-api.mmediagroup.fr/v1/cases?country=" + country;
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
    let url = "http://covid-api.mmediagroup.fr/v1/cases"
    
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
        let countryItem = $("<li>")
        $(".search-history").append(countryItem);
        countryItem.text(searchHistoryA[i]);
        countryItem.addClass("clickable");
        countryItem.attr("data-country", searchHistoryA[i]);
    }
    $(".clickable").on("click", function(){
        countryInput = $(this).attr("data-country");
        console.log(countryInput);
        renderSearch();
    });
}

function capitalizeCountryName(name){
    console.log("INPUT COUNTRY " + name);
    for(let i = 0; i < arrayAllCountries.length; i++){
        if(arrayAllCountries[i].toLowerCase() === name.toLowerCase()){
            console.log("OUTPUT is : " + arrayAllCountries[i])
            return arrayAllCountries[i];
        }
    }
    return "";
}