const battleBackgroundImage = new Image()
battleBackgroundImage.src = '/assets/Island/BattleBackground.png'

//Fundo da Batalha
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})


let mage
let zarien
let renderedSprites
let queue

let battleAnimationId

function initBattle() {

    document.querySelector('#user-interface').style.display = 'block'
    document.querySelector('#dialogue-box').style.display = 'none'
    document.querySelector('.enemy-health .health-bar-fill').style.width = '100%'
    document.querySelector('.player-health .health-bar-fill').style.width = '100%'
    document.querySelector('.attack-buttons').replaceChildren()

    mage = new Monster(monsters.mage)
    zarien = new Player({
        position: {
            x: 420,
            y: 420
        },
        image: { src: '/assets/BattleImg/ZarienIdleUp.png' },
        frames: {
            max: 4,
            hold: 30
        },
        animate: true,
        name: 'Zarien',
        attacks: [attacks['Quick Slash']]
    })

    renderedSprites = [mage, zarien]
    queue = []

    zarien.attacks.forEach((attack) => {
        //Criando Ataques
        const button = document.createElement('button')
        button.innerHTML = attack.name
        document.querySelector('.attack-buttons').append(button)
    })

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

                queue.push(() => {
                    gsap.to('#overlappingDiv', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector('#user-interface').style.display = 'none'
                            gsap.to('#overlappingDiv', {
                                opacity: 0
                            })

                            battle.initiated = false
                        }
                    })
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

                    queue.push(() => {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            onComplete: () => {
                                cancelAnimationFrame(battleAnimationId)
                                animate()
                                document.querySelector('#user-interface').style.display = 'none'
                                gsap.to('#overlappingDiv', {
                                    opacity: 0
                                })

                                battle.initiated = false
                            }
                        })
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

}

function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()

    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
}

initBattle()
animateBattle()

//Diálogo
document.querySelector('#dialogue-box').addEventListener('click', (e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
    }
})