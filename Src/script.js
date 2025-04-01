//Obtém o elemento <canvas> do HTML e define seu contexto 2D
const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");


// Largura e Altura da Tela
canvas.width = 1024;
canvas.height = 576;

//Armazena os arrays com as coordenadas de colisão do mapa
const collisionsMap = []

//Construção de colisões
for(let i = 0; i < collisions.length; i += 70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}

//console.log("CollisionsMap:", collisionsMap);


//Armazena os objetos que representam os limites de colisão.
const boundaries = []

//Define a posição inicial do mapa para centralizar no canvas
const offset = {
    x: -570,
    y: -600
}

//Responsável por criar os objetos de colisão do jogo
// J = COLUNA, I = LINHA
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if (symbol === 5538)
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

// c.fillStyle = 'white'
// c.fillRect(0, 0, canvas.width, canvas.height);

//Mapa do Jogo
const image = new Image()
image.src = '/assets/Island/ilha-inicio.png'

//Sprite do personagem em movimentação
const playerDown = new Image()
playerDown.src = '/assets/MainCharacter/Walk/WalkDown.png'

const playerUp = new Image()
playerUp.src = '/assets/MainCharacter/Walk/WalkUp.png'

const playerLeft = new Image()
playerLeft.src = '/assets/MainCharacter/Walk/WalkLeft.png'

const playerRight = new Image()
playerRight.src = '/assets/MainCharacter/Walk/WalkRight.png'

//Sprite do personagem parado
const idleDown = new Image();
idleDown.src = "/assets/MainCharacter/Idle/IdleDown.png";

const idleUp = new Image();
idleUp.src = "/assets/MainCharacter/Idle/IdleUp.png";

const idleLeft = new Image();
idleLeft.src = "/assets/MainCharacter/Idle/IdleLeft.png";

const idleRight = new Image();
idleRight.src = "/assets/MainCharacter/Idle/IdleRight.png";


//Carrega a imagem que tem os objetos foreground, lembrando que o caminho deles é /assets/Foreground/nome-arquivo.png
const foregroundImage = new Image()
foregroundImage.src = ''


//Criando o jogador
const player = new Sprite({
    position: {
        // a Imagem é 160 x 48, logo 160 = width, 48 = height
        x: canvas.width / 2 - 160 / 4 / 2,
        y: canvas.height / 2 - 48 / 2
    },
    image: idleUp,
    frames: {
        max: 4
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

//Criando o mapa
const background = new Sprite({
    position : {
        x: offset.x,
        y: offset.y
    },

    image: image
})

// Objetos que o jogador passa por trás no mapa
const foreground = new Sprite({
    position : {
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

//Todos os itens que quero poder mover em meu mapa
const movables = [background, ...boundaries, foreground]


//Retângulo 1 = Representa o jogador
//Retângulo 2 = Representa os limites do mapa
//Verifica se dois retângulos (jogador e um obstáculo) estão colidindo.
function rectangularCollision({ rectangle1, rectangle2 }){
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

//Responsável por 
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    //Desenhando as colisões do mapa
    boundaries.forEach((boundary) => {
         boundary.draw()
    })    

    //Desenhando o jogador no mapa
    player.draw()
    //Desenhando os objetos foreground
    foreground.draw()



    let moving = true
    player.moving = false
    // Teclas
    if(keys.w.pressed && lastKey === 'w'){
        //Sprite de animação do player
        player.moving = true
        player.image = player.sprites.up

        // Capturando as colisões e após o personagem esbarrar em alguma, não deixa mais ele avançar
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position:{
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }}
                })
            ){
                console.log('COLISÃO')
                moving = false
                break
            }
        }

        if(moving)
        movables.forEach((movable) => {
            movable.position.y += 3
        })
    } 
    else if (keys.a.pressed && lastKey === 'a'){
        //Sprite de animação do player
        player.moving = true
        player.image = player.sprites.left
        // Capturando as colisões e após o personagem esbarrar em alguma, não deixa mais ele avançar
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position:{
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }}
                })
            ){
                console.log('COLISÃO')
                moving = false
                break
            }
        }

        if(moving)
        movables.forEach((movable) => {
            movable.position.x += 3
        }) 
    }
    else if (keys.s.pressed && lastKey === 's'){
        //Sprite de animação do player
        player.moving = true
        player.image = player.sprites.down
        // Capturando as colisões e após o personagem esbarrar em alguma, não deixa mais ele avançar
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position:{
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }}
                })
            ){
                console.log('COLISÃO')
                moving = false
                break
            }
        }

        if(moving)
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
    }
    else if (keys.d.pressed && lastKey === 'd'){
        player.moving = true
        player.image = player.sprites.right
        // Capturando as colisões e após o personagem esbarrar em alguma, não deixa mais ele avançar
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position:{
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }}
                })
            ){
                console.log('COLISÃO')
                moving = false
                break
            }
        }

        if(moving)
        movables.forEach((movable) => {
            movable.position.x -= 3
        })
    }

    // Trocar para animação de idle se o personagem não estiver se movendo
    if (!player.moving) {
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


//Chama a função de animação
animate()


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