let genericForm = document.getElementById('player-search-form-ajax');

genericForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let firstname = document.getElementById("inputfirstname").value
    let lastname = document.getElementById("inputlastname").value
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/testResult", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            


        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

        // Send the request and wait for the response
    xhttp.send();
    console.log('hiiiii', firstname, lastname)
});




