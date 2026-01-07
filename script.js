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

setTimeout(() => {
    form.submit();
}, 300);

});
