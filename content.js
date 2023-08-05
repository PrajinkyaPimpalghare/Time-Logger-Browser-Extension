// This is a sample content script; you need to adapt it to your specific website's structure.
// Make sure to identify the correct username and password fields, and the submit button.

// Example selectors. Replace these with your actual element IDs or CSS selectors.
const usernameFieldSelector = '#userNameInput';
const passwordFieldSelector = '#passwordInput';
const signInButtonSelector = '#submitButton';

// Function to fill the username and password fields
function fillData() {
  const usernameField = document.querySelector(usernameFieldSelector);
  const passwordField = document.querySelector(passwordFieldSelector);
  
  if (usernameField) {
    usernameField.value = 'your_username';
  }
  
  if (passwordField) {
    passwordField.value = 'your_username';
  }
}

// Function to submit the form
function submitData() {
  const signInButton = document.querySelector(signInButtonSelector);
  
  if (signInButton) {
    signInButton.click();
  }
}

// Execute fillData and submitData functions
fillData();
submitData();
