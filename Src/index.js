const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576


//Armazena Pontos de Encontro do Jogo
const collisionsMap = []
const battleZonesMap = []
const charactersMap = []
const puzzlesMap = []

//Armazena Objetos do Jogo
const boundaries = []
const battleZones = []
const characters = []
const puzzles = []

//Posição Inicial
const offset = {
    x: -7000,
    y: -2460
}

//NPCS
const drayven = new Image()
drayven.src = '/assets/Character/Drayven.png'

const oldman = new Image()
oldman.src = '/assets/Character/OldMan.png'

//Mapa
const image = new Image()
image.src = '/assets/Island/AshesOfFate.png'

//Foreground
const foregroundImage = new Image()
foregroundImage.src = '/assets/Island/Foreground.png'

//Zarien
const playerDown = new Image()
playerDown.src = '/assets/MainCharacter/Walk/WalkDown.png'
const playerUp = new Image()
playerUp.src = '/assets/MainCharacter/Walk/WalkUp.png'
const playerLeft = new Image()
playerLeft.src = '/assets/MainCharacter/Walk/WalkLeft.png'
const playerRight = new Image()
playerRight.src = '/assets/MainCharacter/Walk/WalkRight.png'
const idleDown = new Image()
idleDown.src = '/assets/MainCharacter/Idle/IdleDown.png'
const idleUp = new Image()
idleUp.src = '/assets/MainCharacter/Idle/IdleUp.png'
const idleLeft = new Image()
idleLeft.src = '/assets/MainCharacter/Idle/IdleLeft.png'
const idleRight = new Image()
idleRight.src = '/assets/MainCharacter/Idle/IdleRight.png'

//Configurações da Imagem
const SPRITE_WIDTH = 320
const SPRITE_HEIGHT = 96
const NUM_SPRITE = 4

//Zarien
const player = new Sprite({
    position: {
        x: canvas.width / 2 - SPRITE_WIDTH / NUM_SPRITE / 2,
        y: canvas.height / 2 - SPRITE_HEIGHT / 2
    },
    image: idleLeft,
    frames: {
        max: 4,
        hold: 10
    },

    sprites: {
        down: playerDown,
        up: playerUp,
        left: playerLeft,
        right: playerRight,
        idleDown: idleDown,
        idleUp: idleUp,
        idleLeft: idleLeft,
        idleRight: idleRight
    }
})

//Mapa
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },

    image: image
})

//Foreground
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },

    image: foregroundImage
})

//Teclas do Jogo
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

//Colisões
for (let i = 0; i < collisions.length; i += 160) {
    collisionsMap.push(collisions.slice(i, 160 + i))
}
//console.log("CollisionsMap:", collisionsMap);

//Batalhas
for (let i = 0; i < battleZonesData.length; i += 160) {
    battleZonesMap.push(battleZonesData.slice(i, 160 + i))
}
//console.log("battleZonesMap:", battleZonesMap);

//NPCS
for (let i = 0; i < charactersMapData.length; i += 160) {
    charactersMap.push(charactersMapData.slice(i, 160 + i))
}
//console.log("charactersMapData:", charactersMapData);

//Puzzles
for (let i = 0; i < puzzlesMapData.length; i += 160) {
    puzzlesMap.push(puzzlesMapData.slice(i, 160 + i))
}
//console.log("charactersMapData:", charactersMapData);


//Responsável por criar os objetos de Colisão do Jogo
// J = COLUNA, I = LINHA
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 21463)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})
//console.log(boundaries);


//Responsável por criar os objetos de Batalha do Jogo
// J = COLUNA, I = LINHA
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 28495)
            battleZones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})
//console.log(battleZones);

//Responsável por criar os objetos(NPCS)
charactersMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        // 28495 === Drayven
        if (symbol === 28493) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: drayven,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 3,
                    animate: true,
                    dialogue: ['As Ilhas de Orlath adoram devorar homens como você.', 'Mas eu posso guiá-lo. Mostrar onde os Artefatos estão... e o preço que realmente exigem.']
                })
            )
        }
        // 28496 === Outro NPC
        else if (symbol === 28494) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: oldman,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 2.5,
                    animate: true,
                    dialogue: ['Essa vila é antiga...']
                })
            )
        }

        if (symbol !== 0) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

//Responsável por criar os puzzles
puzzlesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        //Morse Puzzle
        if (symbol === 28496) {
            puzzles.push(
                new Puzzle({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    modalId: 'morseModal',
                    puzzleType: 'morse'
                })
            )
        }
    })
});

//Move
const movables = [
    background,
    ...boundaries,
    foreground,
    ...battleZones,
    ...characters,
    ...puzzles
]

//Draw
const renderables = [
    background,
    ...boundaries,
    ...battleZones,
    ...characters,
    ...puzzles,
    player,
    foreground
]


let lastKey = ''


const battle = {
    initiated: false
}

//Hitbox
function getPlayerHitbox(offsetX, offsetY) {
    return {
        position: {
            x: player.position.x + offsetX,
            y: player.position.y + offsetY
        },
        width: player.width - offsetX * 2,
        height: player.height - offsetY * 2
    };
}



//Responsável pelo Jogo
function animate() {
    animationId = window.requestAnimationFrame(animate)

    renderables.forEach((renderable) => {
        renderable.draw()
    })

    let moving = true
    player.animate = false

    
    if (battle.initiated) return

    checkForPuzzleCollision({
        puzzles,
        player,
        puzzleOffset: { x: 0, y: 0 }
    });

    //Ativar uma Batalha
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        //Capturando as Batalhas
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            const overlappingArea =
                (Math.min(
                    player.position.x + player.width,
                    battleZone.position.x + battleZone.width
                ) -
                    Math.max(player.position.x, battleZone.position.x)) *
                (Math.min(
                    player.position.y + player.height,
                    battleZone.position.y + battleZone.height
                ) -
                    Math.max(player.position.y, battleZone.position.y))
            if (
                rectangularCollision({
                    rectangle1: getPlayerHitbox(20, 20),
                    rectangle2: battleZone
                }) &&
                overlappingArea > (player.width * player.height) / 4
                && Math.random() < 0.01
            ) {
                //console.log('ÁREA DE BATALHA!')

                //Desativar looping atual de animação
                window.cancelAnimationFrame(animationId)

                //Som do Mapa(Exploração)
                audio.Map.stop()
                //Som do Início da Batalha
                //audio.initBattle.play()
                //Som da Batalha
                //audio.battle.play()

                battle.initiated = true
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                //Animação da batalha
                                initBattle()
                                animateBattle()
                                gsap.to('#overlappingDiv', {
                                    opacity: 0,
                                    duration: 0.4
                                })
                            }
                        })
                    }
                })
                break
            }
        }
    }

    // Teclas
    if (keys.w.pressed && lastKey === 'w') {
        //Sprite de animação do Player
        player.animate = true
        player.image = player.sprites.up


        checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: 0, y: 3 }
        })

        checkForPuzzleCollision({
            puzzles,
            player,
            puzzleOffset: { x: 0, y: 3 }
        })


        // Capturando as colisões(Após dois retângulos colidirem, não deixa o personagem avançar)
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: getPlayerHitbox(20, 20),
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ) {
                //console.log('COLISÃO')
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y += 3
            })
    }
    else if (keys.a.pressed && lastKey === 'a') {
        //Sprite de animação do player
        player.animate = true
        player.image = player.sprites.left


        checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: 3, y: 0 }
        })

        checkForPuzzleCollision({
            puzzles,
            player,
            puzzleOffset: { x: 3, y: 0 }
        })


        //Capturando as colisões(Após dois retângulos colidirem, não deixa o personagem avançar)
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: getPlayerHitbox(20, 20),
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                //console.log('COLISÃO')
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x += 3
            })
    }
    else if (keys.s.pressed && lastKey === 's') {
        //Sprite de animação do player
        player.animate = true
        player.image = player.sprites.down


        checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: 0, y: -3 }
        })

        checkForPuzzleCollision({
            puzzles,
            player,
            puzzleOffset: { x: 0, y: -3 }
        })


        // Capturando as colisões(Após dois retângulos colidirem, não deixa o personagem avançar)
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: getPlayerHitbox(20, 20),
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })
            ) {
                //console.log('COLISÃO')
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y -= 3
            })
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true
        player.image = player.sprites.right


        checkForCharacterCollision({
            characters,
            player,
            characterOffset: { x: -3, y: 0 }
        })

        checkForPuzzleCollision({
            puzzles,
            player,
            puzzleOffset: { x: -3, y: 0 }
        })


        // Capturando as colisões(Após dois retângulos colidirem, não deixa o personagem avançar)
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: getPlayerHitbox(20, 20),
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                //console.log('COLISÃO')
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
    }

    //Player IDLE
    if (!player.animate) {
        switch (lastKey) {
            case 'w':
                player.image = player.sprites.idleUp;
                break;
            case 'a':
                player.image = player.sprites.idleLeft;
                break;
            case 's':
                player.image = player.sprites.idleDown;
                break;
            case 'd':
                player.image = player.sprites.idleRight;
                break;
        }
    }
}

window.addEventListener('keydown', (e) => {
    // Se o jogador está interagindo com um NPC
    if (player.isInteracting) {
        switch (e.key) {
            case ' ':
                // Avança o diálogo
                player.interactionAsset.dialogueIndex++

                const { dialogueIndex, dialogue } = player.interactionAsset

                if (dialogueIndex <= dialogue.length - 1) {
                    document.querySelector('#characterDialogueBox').innerHTML =
                        dialogue[dialogueIndex]
                    return
                }

                // Finaliza o diálogo
                player.isInteracting = false
                player.interactionAsset.dialogueIndex = 0
                document.querySelector('#characterDialogueBox').style.display = 'none'
                break
        }
        return
    }

    if (e.key === 'e') {
        //Distância do puzzle
        if (player.currentPuzzle && player.nearPuzzle) {
            const distance = Math.sqrt(
                Math.pow(player.position.x - player.currentPuzzle.position.x, 2) +
                Math.pow(player.position.y - player.currentPuzzle.position.y, 2)
            );
            
            
            if (distance < 100) { 
                console.log("Abrindo puzzle:", player.currentPuzzle.modalId);
                openPuzzle(player.currentPuzzle.modalId);
            } else {
                player.nearPuzzle = false;
                player.currentPuzzle = null;
            }
        }
    }

    switch (e.key) {
        case 'e':
            console.log('TECLA E APERTADA')
            if (player.nearPuzzle && player.currentPuzzle && !player.isInteracting) {
                console.log("Abrindo puzzle:", player.currentPuzzle.modalId);
                openPuzzle(player.currentPuzzle.modalId);
            }
            break;

        case ' ':
            // Começar o diálogo com NPC
            if (!player.interactionAsset) return

            const firstMessage = player.interactionAsset.dialogue[0]
            document.querySelector('#characterDialogueBox').innerHTML = firstMessage
            document.querySelector('#characterDialogueBox').style.display = 'flex'
            player.isInteracting = true
            break

        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break

        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break

        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break

        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})

let clicked = false
addEventListener('click', () => {
    if (!clicked) {
        //Som do Mapa(Exploração)
        audio.Map.play()
        clicked = true
    }
})


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
