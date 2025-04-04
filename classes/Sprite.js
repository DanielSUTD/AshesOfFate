//Classe responsável por desenhar o sprite do personagem e sua posição no mapa
class Sprite{
    constructor({position, velocity, image, frames = {max: 1}, sprites}){
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }

        //Só quero mover quando tiver um movimento com as teclas wasd
        this.moving = false
        this.sprites = sprites
    }

    draw(){
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )

        if(!this.moving) return

        if(this.frames.max > 1){
            this.frames.elapsed++
        }

        if(this.frames.elapsed % 10 === 0){
            if(this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }
}