//Classe responsável por mapear as colisões do mapa
class Boundary{
    static width = 32
    static height = 32
    constructor({position}){
        this.position = position
        this.width = 32  //Como eu exportei o meu mapa de 16 pixels com uma visão 200% maior, multiplico 16 * 2
        this.height = 32 //Como eu exportei o meu mapa de 16 pixels com uma visão 200% maior, multiplico 16 * 2
    }

    draw(){
        //Desenha as colisões
        c.fillStyle = 'rgba(255, 0, 0, 0)' 
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}