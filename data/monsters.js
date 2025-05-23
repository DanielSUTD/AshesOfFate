//Inimigos do Jogo
const monsters = {
    mage: {
        position: {
            x: 600,
            y: 350
        },
        image: {
            src: '/assets/BattleImg/MageBattle.png'},
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