const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");


// Ajusta o tamanho do Canvas(Provavelmente será mudada no futuro essas medidas)
canvas.width = 1024;
canvas.height = 576;

//Armazena os arrays com as coordenadas de colisão do mapa
const collisionsMap = []
//Construção de colisões
for(let i = 0; i < collisions.length; i += 70){
    collisionsMap.push(collisions.slice(i, 70 + i))
}

//Verificando o collisionsMap
console.log("CollisionsMap:", collisionsMap);

class Boundary{
    static width = 32
    static height = 32
    constructor({position}){
        this.position = position
        this.width = 32  //Como eu exportei o meu mapa de 16 pixels com uma visão 200% maior, multiplico 16 * 2
        this.height = 32
    }

    draw(){
        //Desenha as colisões
        c.fillStyle = 'rgba(255, 0, 0, 0)' 
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//Armazena os limites que serão usados
const boundaries = []

const offset = {
    x: -580,
    y: -600
}

//Responsável por capturar as colisões corretamente
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

const image = new Image()
image.src = '/assets/Island/ilha-inicio.png'

const playerImage = new Image()
playerImage.src = '/assets/MainCharacter/Idle/IdleDown.png'

class Sprite{
    constructor({position, velocity, image, frames = {max: 1}}){
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    draw(){
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}

//Criando o jogador
const player = new Sprite({
    position: {
        // a Imagem é 160 x 48, logo 160 = width, 48 = height
        x: canvas.width / 2 - 160 / 4 / 2,
        y: canvas.height / 2 - 48 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position : {
        x: offset.x,
        y: offset.y
    },

    image: image
})

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
const movables = [background, ...boundaries]

//Retorna verdadeiro ou falso com base na condição
//Retângulo 1 = representa o jogador
//Retângulo 2 = representa os limites do mapa
function rectangularCollision({ rectangle1, rectangle2 }){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    //Desenhando as colisões do mapa
    boundaries.forEach((boundary) => {
         boundary.draw()
    })    
    player.draw()



    let moving = true
    // Teclas
    if(keys.w.pressed && lastKey === 'w'){
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
}

// O lastKey possibilita várias teclas pressionadas ao mesmo tempo

animate()

let lastKey = ''
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