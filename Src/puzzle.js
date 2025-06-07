/* Modal do puzzle binário */
// const modal = document.getElementById("binaryModal");
//   const closeBtn = document.querySelector(".close-btn");
//   const submitBtn = document.getElementById("submit-answer");
//   const feedback = document.getElementById("feedback");

//   function openBinaryPuzzle() {
//     modal.style.display = "block";
//     document.getElementById("binary-answer").value = "";
//     feedback.textContent = "";
//   }

//   closeBtn.onclick = function () {
//     modal.style.display = "none";
//   };

//   window.onclick = function (event) {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };

//   submitBtn.onclick = function () {
//     const answer = document.getElementById("binary-answer").value.trim().toLowerCase();
//     if (answer === "hello") {
//       feedback.style.color = "darkgreen";
//       feedback.textContent = "✔️ Resposta correta!";
//       setTimeout(() => modal.style.display = "none", 1500);
//     } else {
//       feedback.style.color = "darkred";
//       feedback.textContent = "❌ Tente novamente.";
//     }
//   };

/* Modal do puzzle Morse */
const morseModal = document.getElementById("morseModal");
const closeBtn = document.querySelector(".close-btn");
const submitBtn = document.getElementById("submit-answer");
const feedback = document.getElementById("feedback");

function openMorsePuzzle() {
  morseModal.style.display = "block";
  document.getElementById("morse-answer").value = "";
  feedback.textContent = "";
}

closeBtn.onclick = function () {
  morseModal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === morseModal) {
    morseModal.style.display = "none";
  }
};

submitBtn.onclick = function () {
  const answer = document.getElementById("morse-answer").value.trim().toUpperCase();
  if (answer === "DESTINO") {
    feedback.style.color = "darkgreen";
    feedback.textContent = "✔️ Resposta correta!";
    setTimeout(() => morseModal.style.display = "none", 1500);
  } else {
    feedback.style.color = "darkred";
    feedback.textContent = "❌ Tente novamente.";
  }
};