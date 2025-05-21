//Imagem ORC
const mageImage = new Image()
mageImage.src = '/assets/BattleImg/MageBattle.png'

//Inimigos do Jogo
const monsters = {
    mage: {
        position: {
            x: 600,
            y: 350
        },
        image: mageImage,
        frames: {
            max: 14,
            hold: 30
        },
        animate: true,
        isEnemy: true,
        name: 'Mage',
        attacks: [attacks['Tackle'], attacks['Fireball']]
    }
}