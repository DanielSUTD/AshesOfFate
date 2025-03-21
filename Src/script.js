
const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

// Ajusta o tamanho do Canvas(Provavelmente será mudada no futuro essas medidas)
canvas.width = 1024;
canvas.height = 576;

//Looping FOR
const collisionMap = []
for(let i = 0; i < collision.length; i += 160){
    collisionMap.push(collision.slice(i, 160 + i))
}

class Boundary{
    constructor({position}){
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

collisionsMap.forEach(row => {
    row.forEach(symbol => {
        console.log(symbol)
    })
})

// c.fillStyle = 'white'
// c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image()
image.src = '/img/mapa-inicio.png'
console.log(image);

const playerImage = new Image()
playerImage.src = '/img/WalkDownMaior.png'

class Sprite{
    constructor({position, velocity, image}){
        this.position = position
        this.image = image
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position : {
        x: -700,
        y: -400
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

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width /4,
        playerImage.height,
        canvas.width / 2 - (playerImage.width / 4) / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    )

    if(keys.w.pressed) background.position.y = background.position.y + 3
    else if (keys.a.pressed) background.position.x = background.position.x + 3
    else if (keys.s.pressed) background.position.y = background.position.y - 3
    else if (keys.d.pressed) background.position.x = background.position.x - 3
}

animate()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
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

