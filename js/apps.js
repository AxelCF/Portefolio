function crypt() {
  const string = "elaxmaurice9719gmail.com";
  const result =
    string.substring(2, 4) +
    string.substring(0, 2) +
    "." +
    string.substring(4, 11) +
    "." +
    string.substring(13, 15) +
    string.substring(11, 13) +
    "@" +
    string.substring(15);
  return result;
}

function sendEmail() {
  Email.send({
    SecureToken: "d3c0db2c-3cf9-4178-9caf-7c7345207d88",
    To: crypt(),
    From: crypt(),
    Subject: "This is the subject",
    Body:
      "Name: " +
      document.getElementById("name").value +
      "<br> Email: " +
      document.getElementById("email").value +
      "<br> Phone no: " +
      document.getElementById("phone").value +
      "<br> Message: " +
      document.getElementById("message").value,
  }).then((message) => alert("Message Sent Succesfully"));
}
