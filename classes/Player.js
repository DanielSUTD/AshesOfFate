class Player extends Sprite {
    constructor({ position, velocity, image, frames = { max: 1, hold: 10 }, sprites, animate = false, rotation = 0, isEnemy = false, name, attacks }) {
        super({
            position,
            velocity,
            image,
            frames,
            sprites,
            animate,
            rotation
        })
        this.health = 100
        this.isEnemy = isEnemy
        this.name = name
        this.attacks = attacks
    }

    faint() {
        document.querySelector('#dialogue-box').innerHTML = this.name + ' foi derrotado! '
        gsap.to(this.position, {
            y: this.position.y + 20
        })
        gsap.to(this, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        })

        //Som(Batalha finalizada)
        //audio.battle.stop()
        //Som(Quando é derrotado)
        //audio.death.play()
    }

    //Animação de Ataque
    attack({ attack, recipient, renderedSprites }) {

        document.querySelector('#dialogue-box').style.display = 'block'
        document.querySelector('#dialogue-box').innerHTML = this.name + ' utilizou ' + attack.name


        let healthBar = '.enemy-health .health-bar-fill'
        if (this.isEnemy) healthBar = '.player-health .health-bar-fill'

        //let rotation = Math.PI / 8

        recipient.health -= attack.damage

        switch (attack.name) {
            case 'Quick Slash':
                //Som do Ataque(Quando é lançado)
                //audio.initQuickSlash.play()
                const attackImage = new Image()
                attackImage.src = '/assets/BattleImg/ZarienAttackUp.png'
                const quickSlash = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: attackImage,
                    frames: {
                        max: 6,
                        hold: 10
                    },
                    animate: true,
                    //rotation: rotation
                })

                renderedSprites.splice(1, 0, quickSlash)

                const originalPosition = { x: this.position.x, y: this.position.y }

                gsap.to(quickSlash.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,

                    onStart: () => {
                        this.opacity = 0
                    },

                    onComplete: () => {
                        //Som do Ataque(Quando acerta o inimigo)
                        //audio.quickSlashHit.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })

                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })

                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)

                        gsap.to(this.position, {
                            x: originalPosition.x,
                            y: originalPosition.y,
                            duration: 0.4,
                            onStart: () => {
                                this.opacity = 0
                            },
                            onComplete: () => {
                                gsap.to(this, {
                                    opacity: 1,
                                    duration: 0.2
                                })
                            }
                        })
                    }
                })

                break
        }
    }
}