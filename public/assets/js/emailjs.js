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
   emailjs.send("service_iq9eq5d", "template_09645i4", params).then(function (res) {
      alert("Uw feedback is verstuurd. Code: " + res.status);
      console.log("Feedback sent");
   })
}

