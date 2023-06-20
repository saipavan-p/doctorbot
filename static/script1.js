// Function to handle user login
function handleLogin(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Perform login validation and redirect if successful
  // ...

  // Clear the input fields
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

// Function to add a new message to the chat log
function addMessage(role, content) {
  var chatLog = document.getElementById("chat-log");
  var message = document.createElement("div");
  message.className = role;
  message.innerText = content;
  chatLog.appendChild(message);
}

// Function to handle recommended message click
function handleRecommendationClick(event) {
  var userInput = document.getElementById("user-input");
  var recommendedMessage = event.target.innerText;
  userInput.value = recommendedMessage;
}

// Event listener for login form submission
var loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", handleLogin);

// Event listener for user input
var userInput = document.getElementById("user-input");
userInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    var message = userInput.value;
    addMessage("user", message);
    userInput.value = "";

    // Call the function to handle user input and get the response from the bot
    handleUserInput(message);
  }
});

// Event listener for recommended message click
var recommendationList = document.getElementById("recommendation-list");
recommendationList.addEventListener("click", handleRecommendationClick);

// Event listener for Enter button click
var enterButton = document.getElementById("enter-button");
enterButton.addEventListener("click", function(event) {
  var message = userInput.value;
  addMessage("user", message);
  userInput.value = "";

  // Call the function to handle user input and get the response from the bot
  handleUserInput(message);
});

// Function to handle user input
function handleUserInput(input) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open("POST", "/chatbot", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  // Set up the callback function for when the request completes
  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText).response;
      addMessage("assistant", response);
    } else {
      console.log("Error:", xhr.status);
    }
  };

  // Create the request body as JSON
  var requestBody = JSON.stringify({ input: input });

  // Send the request
  xhr.send(requestBody);
}


