document.addEventListener("DOMContentLoaded", function () {
    const countdownDate = new Date("2023-08-26T00:00:00").getTime();
  
    const interval = setInterval(function () {
      const now = new Date().getTime();
      const timeLeft = countdownDate - now;
  
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
      document.getElementById("days").textContent = days + "d";
      document.getElementById("hours").textContent = hours + "h";
      document.getElementById("minutes").textContent = minutes + "m";
      document.getElementById("seconds").textContent = seconds + "s";
  
      if (timeLeft < 0) {
        clearInterval(interval);
        document.getElementById("countdown").innerHTML =
          "Happy Birthday Kanishk!";
      }
    }, 1000);
  
    const quizQuestions = [
      {
        question: "WHAT IS KANISHK'S FAVOURITE HOBBY?",
        options: ["CRICKET", "DRINKING", "MOOTNA", "FOOTBALL"],
        correctAnswer: 2,
      },
      {
        question: "WHAT IS THE NICKNAME OF KANISHK GAUTAM?",
        options: ["KANI", "KHOPA", "FOOTBALLER", "TOPA"],
        correctAnswer: 1,
      },
      {
        question: "WHAT IS KANISHK'S FAVOURITE COLOR?",
        options: ["RED", "BLUE", "BLACK", "KADHI"],
        correctAnswer: 3,
      },
      // Add more questions here
    ];
  
    const quizContainer = document.getElementById("quiz");
  
    function displayQuiz() {
      let quizHTML = "";
      quizQuestions.forEach((question, index) => {
        quizHTML += `
          <div class="question">
            <p>${index + 1}. ${question.question}</p>
            ${question.options
              .map(
                (option, optionIndex) => `
                  <label>
                    <input type="radio" name="question${index}" value="${optionIndex}">
                    ${option}
                  </label>
                `
              )
              .join("")}
          </div>
        `;
      });
  
      quizHTML += `<button id="submit-button">Submit</button>`;
      quizContainer.innerHTML = quizHTML;
  
      const submitButton = document.getElementById("submit-button");
      submitButton.addEventListener("click", calculateScore);
    }
  
    function calculateScore() {
      let score = 0;
      quizQuestions.forEach((question, index) => {
        const selectedOption = document.querySelector(
          `input[name="question${index}"]:checked`
        );
        if (
          selectedOption &&
          parseInt(selectedOption.value) === question.correctAnswer
        ) {
          score++;
        }
      });
  
      const scorePercentage = (score / quizQuestions.length) * 100;
      const resultMessage = `You scored ${score} out of ${quizQuestions.length} (${scorePercentage.toFixed(
        2
      )}%)`;
  
      quizContainer.innerHTML = `<h2>Quiz Result</h2><p>${resultMessage}</p>`;
  
      if (score === quizQuestions.length) {
        // Display a popup message for a perfect score
        const popupMessage = document.createElement("div");
        popupMessage.className = "popup-message";
        popupMessage.innerHTML =
          "Congratulations! You are awarded the 'Khopa of the Year' award!";
        document.body.appendChild(popupMessage);
  
        setTimeout(() => {
          document.body.removeChild(popupMessage);
        }, 5000); // Remove the popup after 5 seconds
      }
    }
  
    displayQuiz();
  });
  