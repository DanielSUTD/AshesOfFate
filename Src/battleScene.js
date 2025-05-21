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
    name: 'Zarien',
    attacks: [attacks['Quick Slash']]
})

//Sprites de Ataque
const renderedSprites = [mage, zarien]


zarien.attacks.forEach((attack) => {
    //Criando Ataques
    const button = document.createElement('button')
    button.innerHTML = attack.name
    document.querySelector('.attack-buttons').append(button)
})


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

        if (mage.health <= 0) {
            queue.push(() => {
                mage.faint()
            })
        }

        //Randomizar Ataque
        const randomAttack = mage.attacks[Math.floor(Math.random() * mage.attacks.length)]

        queue.push(() => {
            mage.attack({
                attack: randomAttack,
                recipient: zarien,
                renderedSprites
            })


            if (zarien.health <= 0) {
                queue.push(() => {
                    zarien.faint()
                })
            }
        })

    })

    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        document.querySelector('#attack-style').innerHTML = selectedAttack.type
        document.querySelector('#attack-style').style.color = selectedAttack.color
    })
})

//Eventos de Diálogo
document.querySelector('#dialogue-box').addEventListener('click', (e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }
})