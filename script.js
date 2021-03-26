let countryInput = $("#country-input");


$("#submit-button").on("click", renderSearch);

function renderSearch(event){

    event.preventDefault();
    let country = countryInput.val();
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
            $("#output").text("Confirmed cases: " + data.All.confirmed);
        })
    
}

