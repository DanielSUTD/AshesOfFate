// Variável global para controle de modais
let isModalOpen = false;

// Funções gerais
function openPuzzle(modalId) {
  document.getElementById(modalId).style.display = 'block';
  isModalOpen = true;
  cancelAnimationFrame(animationId);

  if (modalId === 'musicModal') {
    initNoteButtons();
    userSequence = [];
    document.getElementById('checkSequence').disabled = true;
    document.getElementById('musicFeedback').textContent = "";
  }
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  isModalOpen = false;
  if (!battle.initiated) {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    animate();
  }

  // Foca no canvas para capturar eventos de teclado
  canvas.focus();
}

function showFeedback(element, message, color = "#000", duration = 3000) {
  element.style.color = color;
  element.textContent = message;
  setTimeout(() => {
    element.textContent = "";
  }, duration);
}
// Puzzle Binário
function verifyBinary() {
  const answer = document.getElementById("binaryAnswer").value.trim().toLowerCase();
  const feedback = document.getElementById("binaryFeedback");

  if (answer === "vida") {
    showFeedback(feedback, "Resposta correta!", "#265c28");
    setTimeout(() => closeModal('binaryModal'), 1500);
  } else {
    showFeedback(feedback, "Tente novamente.", "#891616");
  }
}

// Puzzle Morse
function verifyMorse() {
  const answer = document.getElementById("morseAnswer").value.trim().toUpperCase();
  const feedback = document.getElementById("morseFeedback");

  if (answer === "DESTINO") {
    showFeedback(feedback, "Resposta correta!", "#265c28");
    setTimeout(() => closeModal('morseModal'), 1500);
  } else {
    showFeedback(feedback, "Tente novamente.", "#891616");
  }
}

// Puzzle Musical
const sequenceSound = new Howl({
  src: ['../audio/puzzle-music.mp3'],
  html5: true,
  pool: 1
});

const correctSequence = ['Dó', 'Ré', 'Fá', 'Sol', 'Mi', 'Dó', 'Lá', 'Si'];
let userSequence = [];
let isPlaying = false;

document.getElementById('playSequence').addEventListener('click', playCorrectSequence);
document.getElementById('checkSequence').addEventListener('click', checkUserSequence);

function initNoteButtons() {
  const notes = ['Dó', 'Ré', 'Mi', 'Fá', 'Sol', 'Lá', 'Si'];
  const container = document.getElementById('noteButtons');
  container.innerHTML = '';

  notes.forEach(note => {
    const button = document.createElement('button');
    button.textContent = note;
    button.classList.add('note-button');
    button.addEventListener('click', () => addNoteToSequence(note));
    container.appendChild(button);
  });
}

function addNoteToSequence(note) {
  if (userSequence.length < correctSequence.length) {
    userSequence.push(note);
    updateUserSequenceDisplay();
    document.getElementById('checkSequence').disabled = userSequence.length !== correctSequence.length;
  }
}

function updateUserSequenceDisplay() {
  const container = document.getElementById('userSequence');
  container.innerHTML = '';

  userSequence.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.textContent = note;
    noteElement.classList.add('user-note');
    if (note !== correctSequence[index]) {
      noteElement.style.backgroundColor = '#891616';
    }
    container.appendChild(noteElement);
  });
}

function playCorrectSequence() {
  if (isPlaying) return;

  isPlaying = true;
  const feedback = document.getElementById('musicFeedback');
  feedback.textContent = "Tocando sequência...";

  sequenceSound.once('end', () => {
    isPlaying = false;
    feedback.textContent = "Repita a sequência";
  });

  sequenceSound.play();
}

function checkUserSequence() {
  const feedback = document.getElementById('musicFeedback');

  if (userSequence.length !== correctSequence.length) {
    const remaining = correctSequence.length - userSequence.length;
    showFeedback(feedback, `Sequência incompleta. Faltam ${remaining} nota(s).`, "#891616");
    return;
  }

  const isCorrect = userSequence.every((note, i) => note === correctSequence[i]);

  if (isCorrect) {
    showFeedback(feedback, "Sequência correta!", "#265c28");
    setTimeout(() => closeModal('musicModal'), 1500);
  } else {
    showFeedback(feedback, "Sequência incorreta. Tente novamente.", "#891616");
    setTimeout(() => {
      userSequence = [];
      updateUserSequenceDisplay();
      document.getElementById('checkSequence').disabled = true;
    }, 2000);
  }
}

// Puzzle das Ilhas
document.getElementById('submitIsland').addEventListener('click', verifyIsland);

function verifyIsland() {
  const answer = document.getElementById("islandAnswer").value.trim().toLowerCase();
  const feedback = document.getElementById("islandFeedback");

  if (answer === "ilha" || answer === "ilhas") {
    showFeedback(feedback, "Correto! Todos são países-ilhas!", "#265c28");
    setTimeout(() => closeModal('islandModal'), 1500);
  } else {
    showFeedback(feedback, "Tente novamente. Pense em geografia...", "#891616");
  }
}

// Inicialização
document.querySelectorAll('.modal .close-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    closeModal(this.closest('.modal').id);
  });
});

window.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    closeModal(event.target.id);
  }
});

// Inicializa o puzzle musical quando o modal abre
document.getElementById('musicModal').addEventListener('shown', () => {
  initNoteButtons();
  userSequence = [];
  document.getElementById('checkSequence').disabled = true;
  document.getElementById('musicFeedback').textContent = "";
});