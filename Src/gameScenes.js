/* História
// História do jogo
const story = `
Zarien Thorne, um homem consumido pela dor, parte em busca dos lendários Três Artefatos de Terra Desconhecida(Ilhas de Orlath) para ressuscitar sua esposa, morta por uma doença misteriosa.
`;

//Efeito de digitação letra por letra
function typeWriterEffect(text, element, speed, callback) {
    let i = 0;
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

// Transição entre telas
setTimeout(() => {
    document.getElementById("introScreen").style.animation = "none";
    document.getElementById("introScreen").style.opacity = "1";
    document.getElementById("initButton").style.display = "flex";
}, 4000);


function showStory() {
    document.getElementById("introScreen").style.display = "none";
    document.getElementById("storyScreen").style.display = "flex";

    const storyText = document.getElementById("storyText");
    typeWriterEffect(story, storyText, 50, () => {
        document.getElementById("startButton").style.display = "block";
    });
}

function startGame() {
    document.getElementById("storyScreen").style.display = "none";
    document.getElementById("game-canvas").style.display = "block";


    animate();
}
*/
