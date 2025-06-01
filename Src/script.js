const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576


//Armazena as Colisões
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 160) {
    collisionsMap.push(collisions.slice(i, 160 + i))
}
//console.log("CollisionsMap:", collisionsMap);


//Armazena as Batalhas
const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 160) {
    battleZonesMap.push(battleZonesData.slice(i, 160 + i))
}
//console.log("battleZonesMap:", battleZonesMap);

//Armazena os NPCS
const charactersMap = []
for (let i = 0; i < charactersMapData.length; i += 160) {
    charactersMap.push(charactersMapData.slice(i, 160 + i))
}
//console.log("charactersMapData:", charactersMapData);

//Posição Inicial
const offset = {
    x: -7000,
    y: -2460
}


//Armazena os objetos com os limites de Colisão
const boundaries = []

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


//Armazena os objetos com os limites de Batalha
const battleZones = []

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


//Armazena os objetos com os NPCS
const characters = []

//NPCS
const drayven = new Image()
drayven.src = '/assets/Character/Drayven.png'

const oldman = new Image()
oldman.src = '/assets/Character/OldMan.png'

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

//Mapa
const image = new Image()
image.src = '/assets/Island/AshesOfFate.png'


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

//Foreground
const foregroundImage = new Image()
foregroundImage.src = '/assets/Island/Foreground.png'

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

//Itens que vão mover no meu Mapa
const movables = [
    background,
    ...boundaries,
    foreground,
    ...battleZones,
    ...characters
]

//Itens que vão renderizar no meu Mapa
const renderables = [
    background,
    ...boundaries,
    ...battleZones,
    ...characters,
    player,
    foreground
]

//Última Tecla
let lastKey = ''

//Detecta uma Batalha
const battle = {
    initiated: false
}

//Responsável pelo Jogo
function animate() {
    const animationId = window.requestAnimationFrame(animate)

    renderables.forEach((renderable) => {
        renderable.draw()
    })

    let moving = true
    player.animate = false

    // Desenhar a HITBOX do Player
    /*
    const hitbox = getPlayerHitbox(20, 20);
    c.fillStyle = 'rgba(0, 255, 0, 0.3)';
    c.fillRect(hitbox.position.x, hitbox.position.y, hitbox.width, hitbox.height);
    */

    if (battle.initiated) return

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
        

        // Capturando as colisões(Após dois retângulos colidirem, não deixa o personagem avançar)
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
  if (player.isInteracting) {
    switch (e.key) {
      case ' ':
        player.interactionAsset.dialogueIndex++

        const { dialogueIndex, dialogue } = player.interactionAsset
        if (dialogueIndex <= dialogue.length - 1) {
          document.querySelector('#characterDialogueBox').innerHTML =
            player.interactionAsset.dialogue[dialogueIndex]
          return
        }

        // finish conversation
        player.isInteracting = false
        player.interactionAsset.dialogueIndex = 0
        document.querySelector('#characterDialogueBox').style.display = 'none'

        break
    }
    return
  }

  switch (e.key) {
    case ' ':
      if (!player.interactionAsset) return

      //Começo do diálogo
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

/* Modal do puzzle binário */
const modal = document.getElementById("binaryModal");
  const closeBtn = document.querySelector(".close-btn");
  const submitBtn = document.getElementById("submit-answer");
  const feedback = document.getElementById("feedback");

  function openBinaryPuzzle() {
    modal.style.display = "block";
    document.getElementById("binary-answer").value = "";
    feedback.textContent = "";
  }

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  submitBtn.onclick = function () {
    const answer = document.getElementById("binary-answer").value.trim().toLowerCase();
    if (answer === "hello") {
      feedback.style.color = "darkgreen";
      feedback.textContent = "✔️ Resposta correta!";
      setTimeout(() => modal.style.display = "none", 1500);
    } else {
      feedback.style.color = "darkred";
      feedback.textContent = "❌ Tente novamente.";
    }
  };