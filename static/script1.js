document.addEventListener("DOMContentLoaded", function() {
  const loginContainer = document.getElementById("login-container");
  const chatContainer = document.getElementById("chat-container");
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const chatLog = document.getElementById("chat-log");
  const userInput = document.getElementById("user-input");
  const recommendationList = document.getElementById("recommendation-list");

  // Function to add a new message to the chat log
  function addMessage(message, sender) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    messageContainer.classList.add(sender);

    const messageText = document.createElement("p");
    messageText.textContent = message;

    messageContainer.appendChild(messageText);
    chatLog.appendChild(messageContainer);
  }

  // Function to handle user login
  function handleLogin(event) {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === "admin" && password === "password") {
      loginContainer.style.display = "none";
      chatContainer.style.display = "block";
    } else {
      alert("Invalid username or password. Please try again.");
    }

    usernameInput.value = "";
    passwordInput.value = "";
  }

  // Function to handle user input
  async function handleUserInput() {
    const message = userInput.value;
  
    if (message.trim() !== "") {
      addMessage(message, "user");
      try {
        const response = await getResponse(message);
        addMessage(response, "bot");
      } catch (error) {
        console.error(error);
        addMessage("Failed to get response from the bot.", "bot");
      }
  
      userInput.value = "";
    }
  }
  

  // Function to handle recommended message click
  function handleRecommendationClick(event) {
    const recommendedMessage = event.target.textContent;
    userInput.value = recommendedMessage;
    userInput.focus();
  }

  // Example function to generate a response
  async function getResponse(message) {
  const response = await fetch('python.exe -m pip install --upgrade pip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.response;
  } else {
    throw new Error('Failed to get response from the bot.');
  }
}


  // Event listener for login form submission
  loginForm.addEventListener("submit", handleLogin);

  // Event listener for user input
  userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      handleUserInput();
    }
  });

  // Event listener for recommended message click
  recommendationList.addEventListener("click", handleRecommendationClick);
});