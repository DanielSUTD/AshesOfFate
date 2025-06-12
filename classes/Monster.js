class Monster extends Sprite {

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
            opacity: 0
        })
        //Som(Batalha finalizada)
        audio.Battle.stop()
        //Som(Quando é derrotado)
        audio.Map.play()
    }


    //Animação de Ataque
    attack({ attack, recipient, renderedSprites }) {

        document.querySelector('#dialogue-box').style.display = 'block'
        document.querySelector('#dialogue-box').innerHTML = this.name + ' utilizou ' + attack.name

        let healthBar = '.enemy-health .health-bar-fill'
        if (this.isEnemy) healthBar = '.player-health .health-bar-fill'

        let rotation = Math.PI / 8

        recipient.health -= attack.damage

        switch (attack.name) {
            case 'Tackle':
                const tl = gsap.timeline()

                let movementDistance = 20
                if (this.isEnemy) movementDistance = -20

                tl.to(this.position, {
                    x: this.position.x - movementDistance
                })
                    .to(this.position, {
                        x: this.position.x + movementDistance * 2,
                        duration: 0.1,
                        onComplete: () => {
                            //Som do Ataque
                            audio.Tackle.play()
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
                        }
                    })
                    .to(this.position, {
                        x: this.position.x
                    })

                break;
            case 'Fireball':
                //Som do Ataque(Quando é lançado)
                audio.InitFireball.play()
                const fireballImage = new Image()
                fireballImage.src = '/assets/Enemies/Mage/attack.png'
                const fireball = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation
                })
                renderedSprites.splice(1, 0, fireball)

                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                        //Som do Ataque(Quando acerta o inimigo)
                        audio.Fireball.play()
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })

                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08
                        })

                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                        renderedSprites.splice(1, 1)
                    }
                })
                break;
        }
    }
}