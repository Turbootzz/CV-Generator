(function () {
   emailjs.init("UDekv49iFaLpYi35S");
})();

function sendMail() {
   let params = {
      pagina : document.getElementById("pagina").value,
      email : document.getElementById("emailinput").value,
      naam : document.getElementById("nameinput").value,
      message : document.getElementById("feedbackmessage").value,
   }
   emailjs.send("service_c3gmbut", "template_09645i4", params).then(function (res) {
      alert("Uw feedback is verstuurd. Code: " + res.status);
      console.log("Feedback sent");
   })
}

function sendMailano() {
   let params = {
      pagina : document.getElementById("pagina").value,
      message : document.getElementById("feedbackmessage-ano").value,
   }
   emailjs.send("service_c3gmbut", "template_09645i4", params).then(function (res) {
      alert("Uw anonieme feedback is verstuurd. Code: " + res.status);
      console.log("Feedback sent");
   })
}

function formfeedback() {
const form = document.getElementsByClassName('feedback-form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent HTML submission
  
  // Create payload of type multipart/form-data (awlays of this type when using the FormData() constructor):
  const fd = new FormData(form);

  // Convert to URL-encoded string:
  const urlEncoded = new URLSearchParams(fd).toString();
  
  fetch('http://localhost:3000/assets/views/feedback', {
    method: "POST",
    body: urlEncoded, // just 'fd' for multipart/form-data
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
      // Content-type header should only be set if data is url-encoded! A FormData object will set the header as multipart/form-data automatically (and setting it manually may lead to an error)
    }
  })
})
}