//Classe responsável por mapear as colisões do mapa
//Só está 48 pq o tamanho do mapa é para 300% agr, ou seja 16 * 3 = 48
class Boundary{
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48  //Como eu exportei o meu mapa de 16 pixels com uma visão 200% maior, multiplico 16 * 2
        this.height = 48 //Como eu exportei o meu mapa de 16 pixels com uma visão 200% maior, multiplico 16 * 2
    }

    draw(){
        //Desenha as colisões
        c.fillStyle = 'rgba(255, 0, 0, 0)' 
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}