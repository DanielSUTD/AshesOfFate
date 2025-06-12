
const story = `
Zarien Thorne, um homem consumido pela dor, parte em busca dos lendários Cinco Artefatos de Terra Desconhecida (Ilhas de Orlath) para ressuscitar sua esposa, morta por uma doença misteriosa.
`;


function typeWriterEffect(text, element, speed, callback) {
    let i = 0;
    element.innerHTML = '';
    let interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}


function showStory() {
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("storyScreen").style.display = "flex";

    const storyText = document.getElementById("storyText");
    audio.Story.play()
    
    typeWriterEffect(story, storyText, 50, () => {
        document.getElementById("continueButton").style.display = "inline-block";
    });
}


function showControls() {
    document.getElementById("storyScreen").style.display = "none";
    document.getElementById("controlsOverlay").style.display = "flex";
}


function startGame() {
    document.getElementById("controlsOverlay").style.display = "none";
    document.getElementById("game-canvas").style.display = "block";
    audio.Story.stop();
    audio.Map.play();
    animate();
}
