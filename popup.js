chrome.storage.sync.get(['savedUsername'], function(result) {
  var savedUsername = result.savedUsername || 'No username saved';
  document.getElementById('usernameDisplay').textContent = savedUsername;
});

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  var currentTab = tabs[0];
  var domain = new URL(currentTab.url).hostname;
  document.querySelector('.domain').textContent = 'Domain: ' + domain;

  var fillButton = document.getElementById('fillButton');
  fillButton.addEventListener('click', function() {
    chrome.tabs.executeScript(currentTab.id, { code: '(' + fillData.toString() + ')();' });
  });

  var submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', function() {
    chrome.tabs.executeScript(currentTab.id, { code: '(' + submitData.toString() + ')();' });
  });
});

var fillData = function() {
  var username = 'your_username';
  var password = 'your_password';

  var usernameField = document.getElementById('userNameInput');
  var passwordField = document.getElementById('passwordInput');

  if (usernameField) {
    usernameField.value = username;
    document.getElementById('usernameDisplay').textContent = username;
  }

  if (passwordField) {
    passwordField.value = password;
  }
};

var submitData = function() {
  var submitButton = document.getElementById('submitButton');

  if (submitButton) {
    submitButton.click();
  }
};
