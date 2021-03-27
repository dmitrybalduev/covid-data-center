let countryInput = $("#country-input");
let cityForWeather = "";
let arrayCountries = [];
let arrayAllCountries = [];

$("#submit-button").on("click", renderSearch);

function renderSearch(event){

    event.preventDefault();
    country = countryInput.val();
    
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

        })
}

function displayError(){

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
