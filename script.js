//create function to create an object and get form data
function getData(form) {
    const formData = new FormData(form);

    /* for loop that was used to pair the id/property with the actual entry
    for (var pair of formData.entries()) {
        console.log(pair[0] + ":" + pair[1])}
    }*/
    let dataObj = Object.fromEntries(formData);
    dataObj.custId = crypto.randomUUID();
    return dataObj;
}

//Add eventListener for form submittal and prevent default of page reload
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

const form = e.target;
const dataObj = getData(form);

//Ensures dataLayer exists and push to GTM
window.dataLayer = window.dataLayer || [];
dataLayer.push({
    event : 'contact_form_submit',
    formData: dataObj
});

//Push to Google Sheets
fetch('https://script.google.com/macros/s/AKfycbxdk3AyzrlnEqyQwTeRgv2tbMt90DHuNvtmGwv-ww6XIxTyFYnXH4ZPJ8J3YO6QjQr0/exec', {
    method: 'POST',
    body: JSON.stringify,
    headers:{'Content-Type': 'application/json'}
});

form.style.display = 'none';
document.getElementById('thankYouMsg').style.display = 'block';
});
