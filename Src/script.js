const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576


//Armazena as colisões
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 160) {
    collisionsMap.push(collisions.slice(i, 160 + i))
}
//console.log("CollisionsMap:", collisionsMap);


//Armazena as batalhas
const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 160) {
    battleZonesMap.push(battleZonesData.slice(i, 160 + i))
}
//console.log("battleZonesMap:", battleZonesMap);




//Define a posição inicial do mapa para centralizar no canvas
const offset = {
    x: -4450,
    y: -1550
}


//Armazena os objetos que representam os limites de colisão.
const boundaries = []
//Responsável por criar os objetos de colisão do Jogo
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


//Armazena os objetos que representam os limites de batalha.
const battleZones = []
//Responsável por criar os objetos de batalha do Jogo
// J = COLUNA, I = LINHA
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 21464)
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


//Mapa do Jogo
const image = new Image()
image.src = '/assets/Island/AshesOfFate.png'


//Sprite do Personagem em Movimento
const playerDown = new Image()
playerDown.src = '/assets/MainCharacter/Walk/WalkDown.png'

const playerUp = new Image()
playerUp.src = '/assets/MainCharacter/Walk/WalkUp.png'

const playerLeft = new Image()
playerLeft.src = '/assets/MainCharacter/Walk/WalkLeft.png'

const playerRight = new Image()
playerRight.src = '/assets/MainCharacter/Walk/WalkRight.png'

//Sprites do Personagem Parado
const idleDown = new Image()
idleDown.src = '/assets/MainCharacter/Idle/IdleDown.png'

const idleUp = new Image()
idleUp.src = '/assets/MainCharacter/Idle/IdleUp.png'

const idleLeft = new Image()
idleLeft.src = '/assets/MainCharacter/Idle/IdleLeft.png'

const idleRight = new Image()
idleRight.src = '/assets/MainCharacter/Idle/IdleRight.png'


//Foreground do Mapa
const foregroundImage = new Image()
foregroundImage.src = '/assets/Island/Foreground.png'


// a Imagem é 320 x 96, logo 320 = width, 96 = height
const SPRITE_WIDTH = 320
const SPRITE_HEIGHT = 96

//Quantidade de sprites na imagem
const NUM_SPRITE = 4

//Criando o Jogador
const player = new Sprite({
    position: {
        x: canvas.width / 2 - SPRITE_WIDTH / NUM_SPRITE / 2,
        y: canvas.height / 2 - SPRITE_HEIGHT / 2
    },
    image: idleUp,
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

//Criando o Mapa
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },

    image: image
})

//Criando o Foreground
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },

    image: foregroundImage
})

//Teclas do jogo
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

//Itens que vão mover no meu mapa
const movables = [background, ...boundaries, foreground, ...battleZones]

//Retângulo 1 = Representa o jogador
//Retângulo 2 = Representa os limites do mapa
//Verifica se dois retângulos estão entrando em colisão
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

// O lastKey possibilita várias teclas pressionadas ao mesmo tempo
//Responsável por capturar a última tecla digitado pelo jogador
let lastKey = ''

//Detecta uma batalha
const battle = {
    initiated: false
}


function animate() {
    const animationId = window.requestAnimationFrame(animate)

    //Mapa
    background.draw()

    //Colisões
    boundaries.forEach((boundary) => {
        boundary.draw()
    })

    //Batalhas
    battleZones.forEach((battleZone) => {
        battleZone.draw()
    })

    //Jogador
    player.draw()
    //Foreground
    foreground.draw()

    let moving = true
    player.animate = false

    // Desenhar a HITBOX do jogador
    const hitbox = getPlayerHitbox(20, 20);
    c.fillStyle = 'rgba(0, 255, 0, 0.3)';
    c.fillRect(hitbox.position.x, hitbox.position.y, hitbox.width, hitbox.height);

    if (battle.initiated) return

    //Ativar uma batalha
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        // Capturando as batalhas e após o personagem esbarrar em alguma inicia uma batalha
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
                overlappingArea > (player.width * player.height) / 4 //Esse 4 define quanto da área do jogador precisa estar sobreposta com a zona de batalha para a batalha ser disparada.
                && Math.random() < 0.01
            ) {
                console.log('ÁREA DE BATALHA!')
                //Desativar looping atual de animação
                window.cancelAnimationFrame(animationId)
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
        //Sprite de animação do player
        player.animate = true
        player.image = player.sprites.up

        // Capturando as colisões e após o personagem esbarrar em alguma, não deixa mais ele avançar
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
                console.log('COLISÃO')
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
        // Capturando as colisões e após o personagem esbarrar em alguma, não deixa mais ele avançar
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
                console.log('COLISÃO')
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
        // Capturando as colisões e após o personagem esbarrar em alguma, não deixa mais ele avançar
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
                console.log('COLISÃO')
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
        // Capturando as colisões e após o personagem esbarrar em alguma, não deixa mais ele avançar
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
                console.log('COLISÃO')
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
    }

    // Trocar para animação de idle se o personagem não estiver se movendo
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


//Movimentação com 
window.addEventListener('keydown', (e) => {
    switch (e.key) {
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