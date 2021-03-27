let countryInput = $("#country-input");
let cityForWeather = "";
let arrayCountries = [];
let selectCountries = $("#select-countries");
let arrayAllCountries = [];

$("#submit-button").on("click", renderSearch);

function renderSearch(event){

    event.preventDefault();
    let country = "";
    country = countryInput.val();
    $("#country-input").val("checking country....");
    
    let url = "http://covid-api.mmediagroup.fr/v1/cases?country=" + country;
    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            if(Object.keys(data)[0] === "Afghanistan" && country !== "Afghanistan"){
                displayError();
                return;
            }
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
            console.log("ARRAY ALL COUNTRIES: " + arrayAllCountries);
            console.log(arrayCountries);
        })
        
}
getListCountry();

//select-countries