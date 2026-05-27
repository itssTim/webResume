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
};

//Segment Tracking
document.querySelectorAll('a[data-project]').forEach(link => {
    link.addEventListener('click', function() {
        analytics.track('project_link_clicked', {
            project_name: this.dataset.project,
            url: this.href
        });
    });
});

document.querySelector('#resumeBtn').addEventListener('click', function() {
    analytics.track('resume_pdf_downloaded', {
        file_name: this.href
    });
});
//End Segment Tracking

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

//Convert object to string for fetch
const params = new URLSearchParams(dataObj).toString();

//Push to Segment
analytics.track("contact_form_submit", dataObj);

//Push to Google Sheets
fetch('https://script.google.com/macros/s/AKfycbwRsmVRC7vhVYGN4POa6YpXjkBBPNcLDDRQ8EYGZX6FmWl6Nf2xvR4txdOwrmPSniwX/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    body: params
});

form.style.display = 'none';
document.getElementById('thankYouMsg').style.display = 'block';
});


/*
//Add eventListener for resume download and prevent default of page reload
// Custom resume download event — refactored to use GTM native file_download
// Retained as reference for dataLayer push implementation
document.getElementById("resumeBtn").addEventListener("click", function(e) {
   window.dataLayer.push({
    event: 'resume_download'
   });
});
*/