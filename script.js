//create function to create an object and get form data
function getData(form) {
    let formData = new FormData(form);

    /* for loop that was used to pair the id/property with the actual entry
    for (var pair of formData.entries()) {
        console.log(pair[0] + ":" + pair[1])}
    }*/
    let dataObj = Object.fromEntries(formData);
    let uuid = self.crypto.randomUUID();
    dataObj.custId = uuid;
    console.log(dataObj);
}

//Add eventListener for form submittal and prevent default of page reload
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
getData(e.target);

});

addEventListener("")
