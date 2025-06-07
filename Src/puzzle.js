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

// Variável global para controle de modais
let isModalOpen = false;

/* Modal do puzzle Morse */
const morseModal = document.getElementById("morseModal");
const morseCloseBtn = document.querySelector("#morseModal .close-btn");
const morseSubmitBtn = document.getElementById("submit-answer");
const morseFeedback = document.getElementById("feedback");

function openMorsePuzzle() {
  morseModal.style.display = "block";
  isModalOpen = true;
  document.getElementById("morse-answer").value = "";
  morseFeedback.textContent = "";
  document.getElementById("morse-answer").focus();
}

morseCloseBtn.onclick = function() {
  morseModal.style.display = "none";
  isModalOpen = false;
};

window.addEventListener('click', function(event) {
  if (event.target === morseModal) {
    morseModal.style.display = "none";
    isModalOpen = false;
  }
});

morseSubmitBtn.onclick = function() {
  const answer = document.getElementById("morse-answer").value.trim().toUpperCase();
  if (answer === "DESTINO") {
    morseFeedback.style.color = "darkgreen";
    morseFeedback.textContent = "✔️ Resposta correta!";
    setTimeout(() => {
      morseModal.style.display = "none";
      isModalOpen = false;
    }, 1500);
  } else {
    morseFeedback.style.color = "darkred";
    morseFeedback.textContent = "❌ Tente novamente.";
  }
};

const musicModal = document.getElementById("musicModal");
const playSequenceBtn = document.getElementById("playSequence");
const noteButtonsContainer = document.getElementById("noteButtons");
const userSequenceContainer = document.getElementById("userSequence");
const checkSequenceBtn = document.getElementById("checkSequence");
const musicFeedback = document.getElementById("musicFeedback");

// Sequência correta
const correctSequence = ['Dó', 'Ré', 'Fá', 'Sol', 'Mi', 'Dó', 'Lá', 'Si'];
let userSequence = [];
let isPlaying = false;

const sequenceSound = new Howl({
  src: ['../audio/puzzle-music.mp4'],
  html5: true,
  pool: 1,
  onloaderror: function() {
    console.error('Erro ao carregar o áudio');
    musicFeedback.style.color = "darkred";
    musicFeedback.textContent = "Erro: Áudio não carregado";
  }
});

function initNoteButtons() {
  noteButtonsContainer.innerHTML = '';
  const notes = ['Dó', 'Ré', 'Mi', 'Fá', 'Sol', 'Lá', 'Si'];
  
  notes.forEach(note => {
    const button = document.createElement('button');
    button.textContent = note;
    button.classList.add('note-button');
    button.addEventListener('click', () => addNoteToSequence(note));
    noteButtonsContainer.appendChild(button);
  });
}

function addNoteToSequence(note) {
  if (isModalOpen && !isPlaying && userSequence.length < correctSequence.length) {
    userSequence.push(note);
    updateUserSequenceDisplay();
    checkSequenceBtn.disabled = userSequence.length !== correctSequence.length;
  }
}

function updateUserSequenceDisplay() {
  userSequenceContainer.innerHTML = '';
  userSequence.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.textContent = note;
    noteElement.classList.add('user-note');
    
    if (note !== correctSequence[index]) {
      noteElement.style.backgroundColor = '#ff6b6b';
    }
    
    userSequenceContainer.appendChild(noteElement);
  });
}

function playCorrectSequence() {
  if (isPlaying) return;
  
  isPlaying = true;
  musicFeedback.textContent = "Tocando sequência...";
  sequenceSound.stop();
  
  sequenceSound.once('end', () => {
    isPlaying = false;
    musicFeedback.textContent = "Repita a sequência";
  });
  
  sequenceSound.play();
}

function checkUserSequence() {
  if (userSequence.length !== correctSequence.length) {
    musicFeedback.style.color = "darkred";
    musicFeedback.textContent = "❌ Sequência incompleta. Você precisa adicionar " + correctSequence.length + " notas.";
    return;
  }

  let allCorrect = true;
  userSequence.forEach((note, index) => {
    if (note !== correctSequence[index]) {
      allCorrect = false;
    }
  });

  if (allCorrect) {
    musicFeedback.style.color = "darkgreen";
    musicFeedback.textContent = "✔️ Sequência correta! Parabéns!";
    setTimeout(() => {
      musicModal.style.display = "none";
      isModalOpen = false;
      resetUserSequence();
    }, 1500);
  } else {
    musicFeedback.style.color = "darkred";
    musicFeedback.textContent = "❌ Sequência incorreta. Limpando e tocaremos a sequência novamente...";

    setTimeout(() => {
      resetUserSequence();
    }, 2000);
  }
}

function resetUserSequence() {
  userSequence = [];
  updateUserSequenceDisplay();
  checkSequenceBtn.disabled = true;
}


function resetUserSequence() {
  userSequence = [];
  updateUserSequenceDisplay();
  checkSequenceBtn.disabled = true;
}

playSequenceBtn.addEventListener('click', playCorrectSequence);
checkSequenceBtn.addEventListener('click', checkUserSequence);

document.querySelector('#musicModal .close-btn').addEventListener('click', () => {
  musicModal.style.display = "none";
  isModalOpen = false;
});

window.addEventListener('click', (event) => {
  if (event.target === musicModal) {
    musicModal.style.display = "none";
    isModalOpen = false;
  }
});

function openMusicPuzzle() {
  musicModal.style.display = "block";
  isModalOpen = true;
  resetUserSequence();
  musicFeedback.textContent = "";
  initNoteButtons();
  sequenceSound.load();
}

document.body.insertAdjacentHTML('beforeend', 
  '<button onclick="openMusicPuzzle()" style="position: fixed; bottom: 4rem; right: 1rem; z-index: 101;">Testar Puzzle Musical</button>'
);