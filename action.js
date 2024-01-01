let api_key = "api-34162D1E805442498B3542DA89A21F85";
let sendEmail = async (name, email, content) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "api_key": "api-34162D1E805442498B3542DA89A21F85",
    "to": [
        "CTO Emegbue Chukwudi <ecj4real@gmail.com>"
    ],
    "sender": "No Reply <noreply@johnchukwudi.com>",
    "subject": "Contact From Portfolio - " + name,
    "text_body": content + '. ' + 'From: (' + name +') ' + email,
    "html_body": content + '. <br/>' + 'From: (' + name +') ' + email
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://api.smtp2go.com/v3/email/send", requestOptions)
        .then(response => response.text())
        .then(result => {$.notify("Message Sent Successfully", "success");})
        .catch(error => {$.notify("An Error occured", "error");})
        .finally(()=>{
            document.getElementById("messageSubmitButton").innerHTML = 'SEND MESSAGE &nbsp; <i class="fas fa-chevron-right"></i>';
            document.getElementById("messageSubmitButton").disabled = false;
            contactForm.reset();
        });


}

let contactForm = document.getElementById("contact_us_form");

contactForm.addEventListener("submit", async (event) => {
    document.getElementById("messageSubmitButton").innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending';
    let name = document.getElementById("contact_name").value;
    let email = document.getElementById("contact_email").value;
    let content = document.getElementById("contact_message").value;

    let website = document.getElementById("website").value;
    if(website) return;

    await sendEmail(name, email, content);    
});