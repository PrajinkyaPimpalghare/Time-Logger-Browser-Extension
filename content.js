// content.js

// Define the username and password variables here
var username = '';  // Replace with actual username
var password = '';  // Replace with actual password

// Function to fill the username and password fields
function fillData() {
  var usernameField = document.getElementById('userNameInput');
  var passwordField = document.getElementById('passwordInput');

  if (usernameField) {
    usernameField.value = username;
  }

  if (passwordField) {
    passwordField.value = password;
  }
}

// Function to submit the form
function submitData() {
  var submitButton = document.getElementById('submitButton');

  if (submitButton) {
    submitButton.click();
  }
}

// Execute fillData and submitData functions
fillData();
submitData();
