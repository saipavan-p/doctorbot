document.addEventListener("DOMContentLoaded", function() {
  const loginContainer = document.getElementById("login-container");
  const chatContainer = document.getElementById("chat-container");
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const chatLog = document.getElementById("chat-log");
  const userInput = document.getElementById("user-input");
  const recommendationList = document.getElementById("recommendation-list");
  const enterButton = document.getElementById("enter-button");

  // Function to add a new message to the chat log
  function addMessage(message, sender) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    messageContainer.classList.add(sender);

    const messageCard = document.createElement("div");
    messageCard.classList.add("message-card");
    messageCard.textContent = message;

    messageContainer.appendChild(messageCard);
    chatLog.appendChild(messageContainer);
    chatLog.scrollTop = chatLog.scrollHeight;
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
    const message = userInput.value.trim();

    if (message !== "") {
      addMessage(message, "user");

      try {
        const response = await getBotResponse(message);
        addMessage(response, "bot");
      } catch (error) {
        console.error(error);
        addMessage("Hello patient. I'm doctor John. Can you specify what is your problem.", "bot");
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

  // Function to get response from the bot.py backend
  async function getBotResponse(message) {
    const response = await fetch('/bot', {
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
      throw new Error("Hello patient. I'm doctor John. Can you specify what is your problem.");
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

  // Event listener for Enter button click
  enterButton.addEventListener("click", handleUserInput);
});