// popup.js

// Function to execute scripts in the active tab
function executeScriptInActiveTab(scriptText) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    chrome.tabs.executeScript(currentTab.id, { code: scriptText });
  });
}

// Function to update the time log
function updateTimeLog(workOption = 'Home', startTime = '09:00', endTime = '17:30', addComment = 'Work Log', dateInput = "1") {
  var activeDates = document.querySelectorAll('.e-day')
  console.log("dateInput:", dateInput);
  activeDates.forEach(eachOption =>{
      if (eachOption.title.includes(" " + dateInput + "," )){
              eachOption.click();
      }
  })
  var setButton = document.querySelectorAll('owl-date-time-container div div button span')[1]
  var fromTimeBox = document.querySelector('[data-placeholder="From Time (HH:MM)"]')
  var fromToBox = document.querySelector('[data-placeholder="To Time (HH:MM)"]')
  var limitCount = [];
  //if (fromTimeBox){
    //fromTimeBox.click()
  //}
  //if (fromToBox){
    //fromToBox.click()
  //}

  console.log(document.querySelectorAll('button[tabindex="0"]'))
  var fromTime = document.querySelector("input[formControlName='fromTime']");
  var toTime = document.querySelector("input[formControlName='toTime']");

  if (fromTime) {
    fromTime.value = startTime;
  }

  if (toTime) {
    toTime.value = endTime;
  }

  var matSelect = document.querySelector('[placeholder="Work Location"]');

  if (matSelect) {
    matSelect.click(); // Open the dropdown
    var matOption = document.querySelectorAll('mat-option .mat-option-text');
    matOption.forEach( eachOption =>{
        if (eachOption.textContent == workOption){
          eachOption.click();
        }
    });
  }

  document.querySelector('[data-placeholder="Employee Comment"]').value = addComment;
}

// Fill data function
var fillData = function(workOption, startTime, endTime, addComment, dateInput) {
  var fillScript = `
    (${updateTimeLog.toString()})('${workOption}', '${startTime}', '${endTime}', '${addComment}', '${dateInput}');
  `;
  executeScriptInActiveTab(fillScript);
};

// Submit data function
var submitData = function() {
  var submitScript = `
    var submitButton = document.querySelector('.mat-button-wrapper');
    if (submitButton) {
      submitButton.click();
    }
  `;
  executeScriptInActiveTab(submitScript);
};

function getDivIdFromTab(tabId, callback) {
  chrome.tabs.executeScript(tabId, { code: `
    var targetDiv = document.querySelector('div.info-div div span'); // Replace 'yourDivId' with the actual id
    var currentDateValue = targetDiv ? targetDiv.innerHTML : null;
    var userNameValue = 'Prajinkya';
    var targetDiv = document.querySelector('div.info-div div u');
    var loggedHoursValue = targetDiv ? targetDiv.innerHTML : null;
    var result = { currentDate: currentDateValue, userName: userNameValue, loggedHours : loggedHoursValue};
    result;
  ` }, function(result) {
    var values = result[0];
    callback(values);
  });
}

// Listen for button clicks and execute corresponding scripts in the active tab
document.addEventListener('DOMContentLoaded', function() {
  var dateInputTag = document.getElementById('dateInput');
  var locationRadios = document.getElementsByName('location');
  var fillButton = document.getElementById('fillButton');
  fillButton.addEventListener('click', function() {
    var selectedLocation;
    var dateInput = "0";
    for (var i = 0; i < locationRadios.length; i++) {
      if (locationRadios[i].checked) {
        selectedLocation = locationRadios[i].value;
        break;
      }
    }
    if(dateInputTag){
        dateInput = dateInputTag.value
    }
    // Get user input or set default values
    var workOption = selectedLocation; // Default value
    var startTime = '09:00'; // Default value
    var endTime = '17:30';   // Default value
    var addComment = 'Work Log'; // Default value

    // Call the fillData function with the user input or defaults
    fillData(workOption, startTime, endTime, addComment, dateInput);
  });

  var submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', submitData);

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var currentTab = tabs[0];
    var domain = new URL(currentTab.url).hostname;
    document.querySelector('.domain').textContent = 'Domain: ' + domain;
    getDivIdFromTab(currentTab.id, function(values) {
        if (values) {
          console.log("Div ID:", values);
          document.querySelector('.username-display').textContent = 'User: ' + values.userName;
          document.querySelector('.current-date').textContent = 'Date: ' + values.currentDate;
          document.querySelector('.filled-time').textContent = 'Logged Hours: ' + values.loggedHours;
        } else {
          console.log("Div with ID not found.",values);
        }
    });
  });
});
