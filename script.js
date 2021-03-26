let countryInput = $("#country-input");
let cityForWeather = "";
let arrayCountries = [];
let selectCountries = $("#select-countries");

$("#submit-button").on("click", renderSearch);

function renderSearch(event){

    event.preventDefault();
    let country = "";
    if(selectCountries[0].value != null){
        country = selectCountries[0].value;
    }else{
        country = countryInput.val();
    }
    let url = "http://covid-api.mmediagroup.fr/v1/cases?country=" + country;
    fetch(url)
        .then(function (response){
            if(response.status != 200){
                alert("Invalid country");
            }
            return response.json();
        })
        .then(function(data){
            console.log(data);
            $("#country-name").text(country);
            $("#population").text("Population: " + data.All.population);
            $("#capital-name").text("Catital city: " + data.All.capital_city);
            $("#confirmed-cases").text("Confirmed cases: " + data.All.confirmed);
            $("#deaths").text("Deaths: " + data.All.deaths);
            $("#recovered").text("Deaths: " + data.All.recovered);

        })
    
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
            console.log(arrayCountries);
            for(let i = 0; i < arrayCountries.length; i++){
                selectCountries.append("<option value="+arrayCountries[i]+">"+arrayCountries[i]+"</option>")
            }
            selectCountries.show();
        })
        
}
getListCountry();
