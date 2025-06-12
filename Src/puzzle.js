// Variável global para controle de modais
let isModalOpen = false;

const completedPuzzles = {
  binary: false,
  morse: false,
  music: false,
  island: false,
  moon: false
};

function checkAllPuzzlesCompleted() {
  return Object.values(completedPuzzles).every(status => status === true);
}

// Funções gerais
function openPuzzle(modalId) {

  document.getElementById(modalId).style.display = 'block';
  isModalOpen = true;
  audio.Map.stop();

  // Cancela a animação atual
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

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
  //Cancela animação existente
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  if (!audio.Map.playing()) {
    audio.Map.play();
  }
  
  animate();

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
    completedPuzzles.binary = true;
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
    completedPuzzles.morse = true;
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
    //document.getElementById('checkSequence').disabled = userSequence.length !== correctSequence.length;
    document.getElementById('checkSequence').disabled = false;
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
    setTimeout(() => {
      userSequence = [];
      updateUserSequenceDisplay();
      document.getElementById('checkSequence').disabled = true;
    }, 3000);
    return;
  }

  const isCorrect = userSequence.every((note, i) => note === correctSequence[i]);

  if (isCorrect) {
    showFeedback(feedback, "Sequência correta!", "#265c28");
    completedPuzzles.music = true;
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
    completedPuzzles.island = true;
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

// Puzzle Lunar
const moonPhases = [
  { phase: "Nova", emoji: "🌑", date: "2025-01-20" },
  { phase: "Crescente Inicial", emoji: "🌒", date: "2025-02-10" },
  { phase: "Quarto Crescente", emoji: "🌓", date: "2025-03-23" },
  { phase: "Cheia", emoji: "🌕", date: "2025-04-30" },
  { phase: "Quarto Minguante", emoji: "🌗", date: "2025-06-07" }
];

let selectedMoons = [];
let moonOptions = [];

function initMoonPuzzle() {
  const moonOptionsContainer = document.getElementById('moonOptions');
  const moonSlotsContainer = document.getElementById('moonSlots');

  moonOptionsContainer.innerHTML = '';
  moonSlotsContainer.innerHTML = '';
  selectedMoons = Array(moonPhases.length).fill(null);

  moonOptions = [...moonPhases].sort(() => Math.random() - 0.5);

  moonOptions.forEach((moon, index) => {
    const button = document.createElement('button');
    button.innerHTML = moon.emoji;
    button.title = moon.phase;
    button.dataset.index = index;
    button.addEventListener('click', () => selectMoonPhase(moon));
    moonOptionsContainer.appendChild(button);
  });

  for (let i = 0; i < moonPhases.length; i++) {
    const slot = document.createElement('div');
    slot.dataset.index = i;
    slot.innerHTML = '?'; // <-- Aqui
    slot.addEventListener('click', () => removeMoonFromSlot(i));
    moonSlotsContainer.appendChild(slot);
  }

  document.getElementById('verifyMoonSequence').addEventListener('click', verifyMoonSequence);
  document.getElementById('moonFeedback').textContent = "";
}

function selectMoonPhase(moon) {
  const slots = document.querySelectorAll('#moonSlots div');
  for (let i = 0; i < slots.length; i++) {
    if (slots[i].textContent === '?') {
      slots[i].innerHTML = moon.emoji;
      slots[i].title = moon.phase;
      selectedMoons[i] = moon;
      break;
    }
  }
}

function removeMoonFromSlot(index) {
  const slot = document.querySelector(`#moonSlots div[data-index="${index}"]`);
  if (slot.textContent !== '?') {
    selectedMoons[index] = null;
    slot.innerHTML = '?';
    slot.title = '';
  }
}

function verifyMoonSequence() {
  const feedback = document.getElementById('moonFeedback');

  if (selectedMoons.length !== moonPhases.length || selectedMoons.some(m => !m)) {
    showFeedback(feedback, "Preencha todos os slots com as fases da lua!", "#891616");
    return;
  }

  const isCorrect = selectedMoons.every((moon, index) => {
    return moon.date === moonPhases[index].date;
  });

  if (isCorrect) {
    showFeedback(feedback, "Sequência correta! Você ordeneou corretamente!", "#265c28");
    completedPuzzles.moon = true;
    setTimeout(() => closeModal('moonModal'), 1500);

    const slots = document.querySelectorAll('#moonSlots div');
    slots.forEach(slot => {
      slot.style.backgroundColor = "#4caf50";
      slot.style.border = "2px solid #2e7d32";
    });
  } else {
    showFeedback(feedback, "Sequência incorreta. Tente novamente!", "#891616");

    const slots = document.querySelectorAll('#moonSlots div');
    selectedMoons.forEach((moon, index) => {
      if (moon.date !== moonPhases[index].date) {
        slots[index].style.backgroundColor = "#ffebee";
        slots[index].style.border = "2px solid #c62828";
      }
    });

    setTimeout(() => {
      slots.forEach((slot, index) => {
        slot.innerHTML = '?';
        slot.title = '';
        slot.style.backgroundColor = '';
        slot.style.border = "2px dashed #555";
      });
      selectedMoons = Array(moonPhases.length).fill(null);
    }, 2000);
  }
}

function openPuzzle(modalId) {
  document.getElementById(modalId).style.display = 'block';
  isModalOpen = true;
  audio.Map.stop();

  // Cancela a animação atual
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  if (modalId === 'musicModal') {
    initNoteButtons();
    userSequence = [];
    document.getElementById('checkSequence').disabled = true;
    document.getElementById('musicFeedback').textContent = "";
  } else if (modalId === 'moonModal') {
    initMoonPuzzle();
    document.getElementById('moonFeedback').textContent = "";
  }
}

function tryOpenFinalModal(modalId) {
  if (!checkAllPuzzlesCompleted()) {
    alert("Você precisa completar todos os enigmas antes de continuar!");
    return;
  }

  openPuzzle(modalId);
}