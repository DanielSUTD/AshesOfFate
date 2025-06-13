//Inimigos do Jogo
const monsters = {
    mage: {
        position: {
            x: 600,
            y: 250
        },
        image: {
            src: '/assets/BattleImg/MageBattle.png'
        },
        frames: {
            max: 14,
            hold: 10
        },
        animate: true,
        isEnemy: true,
        name: 'Mage',
        attacks: [attacks['Tackle'], attacks['Fireball']]
    },
    necromancer: {
        position: {
            x: 450,
            y: 120
        },
        image: {
            src: '/assets/BattleImg/NecromancerBattle.png'
        },
        frames: {
            max: 8,
            hold: 10
        },
        animate: true,
        isEnemy: true,
        name: 'Necromancer',
        attacks: [attacks['Tackle'], attacks['Fireball']]
    }
}