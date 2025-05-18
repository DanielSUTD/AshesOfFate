const battleBackgroundImage = new Image()
battleBackgroundImage.src = '/assets/Island/BattleBackground.png'

const zarienBattle = new Image()
zarienBattle.src = '/assets/BattleImg/ZarienIdleUp.png'
//Fundo da Batalha
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})

//Inimigo Mage
const mage = new Monster(monsters.mage)

//Zarien
const zarien = new Player({
    position: {
        x: 420,
        y: 420
    },
    image: zarienBattle,
    frames: {
        max: 4,
        hold: 30
    },
    animate: true,
    name: 'Zarien'
})

//Sprites de Ataque
const renderedSprites = [mage, zarien]

//Criando Ataques
const button = document.createElement('button')
button.innerHTML = 'Quick Slash'
document.querySelector('.attack-buttons').append(button)


function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()

    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}
animateBattle()


const queue = []

//Eventos de Ataque
document.querySelectorAll('.attack-buttons button').forEach(button => {
    button.addEventListener('click', (e) => {
        const attackName = e.currentTarget.innerHTML.trim();
        const selectedAttack = attacks[attackName];

        zarien.attack({
            attack: selectedAttack,
            recipient: mage,
            renderedSprites
        })

        queue.push(() => {
            mage.attack({
                attack: attacks['Fireball'],
                recipient: zarien,
                renderedSprites
            })
        })


    })
})

//Eventos de Diálogo
document.querySelector('#dialogue-box').addEventListener('click', (e) => {
    if(queue.length > 0){
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'
})