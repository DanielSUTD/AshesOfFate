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
let canClickDialogue = true

function setAttackButtonsEnabled(enabled) {
    document.querySelectorAll('.attack-buttons button').forEach(button => {
        button.disabled = !enabled
        button.style.opacity = enabled ? '1' : '0'
        button.style.cursor = enabled ? 'pointer' : 'default'
        button.style.pointerEvents = enabled ? 'auto' : 'none'
    })
}

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
    setAttackButtonsEnabled(true)

    zarien.attacks.forEach((attack, index) => {
        const button = document.querySelectorAll('.attack-buttons button')[index];

        // Mostrar tipo de ataque ao passar o mouse
        button.addEventListener('mouseover', () => {
            document.querySelector('#attack-style').innerHTML = attack.type;
            document.querySelector('#attack-style').style.color = attack.color;
        });

        // Resetar ao tirar o mouse
        button.addEventListener('mouseout', () => {
            if (canClickDialogue) { // Só reseta se não estiver em um diálogo
                document.querySelector('#attack-style').innerHTML = 'Tipo de Ataque';
                document.querySelector('#attack-style').style.color = 'white';
            }
        });
    });

    //Eventos de Ataque
    document.querySelectorAll('.attack-buttons button').forEach(button => {
        button.addEventListener('click', (e) => {
            setAttackButtonsEnabled(false)

            const attackName = e.currentTarget.innerHTML.trim();
            const selectedAttack = attacks[attackName];

            if (selectedAttack) {
                document.querySelector('#attack-style').innerHTML = selectedAttack.type
                document.querySelector('#attack-style').style.color = selectedAttack.color
            }

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
                            //Som do Jogo
                            audio.Map.play()
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
                                //Som do Jogo
                                //audio.Map.play()
                            }
                        })
                    })
                }
            })

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

//animate()
//initBattle()
//animateBattle()

//Diálogo
document.querySelector('#dialogue-box').addEventListener('click', (e) => {
    if (!canClickDialogue || e.currentTarget.style.display === 'none') return;

    canClickDialogue = false;
    setTimeout(() => {
        canClickDialogue = true;
    }, 500);

    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else {
        e.currentTarget.style.display = 'none'
        setAttackButtonsEnabled(true)
        // Só reseta se não houver mais ações
        document.querySelector('#attack-style').innerHTML = 'Tipo de Ataque'
        document.querySelector('#attack-style').style.color = 'white'
    }
})