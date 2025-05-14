class Sprite {
    constructor({ position, image, frames = { max: 1, hold: 10 }, sprites, animate = false, isEnemy = false, rotation = 0 }) {
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0 }

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }

        
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        this.health = 100
        this.isEnemy = isEnemy
        this.rotation = rotation
    }

    draw() {
        c.save()
        c.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        )
        c.rotate(this.rotation)
        c.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
        )
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        c.restore()

        if (!this.animate) return

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }
    }

    //Animação de Ataque
    attack({ attack, recipient, renderedSprites }) {
        let healthBar = '.enemy-health .health-bar-fill'
        if (this.isEnemy) healthBar = '.player-health .health-bar-fill'

        let rotation = Math.PI / 8

        this.health -= attack.damage

        switch (attack.name) {
            case 'Lightning Blade':
                const attackImage = new Image()
                attackImage.src = '/assets/MainCharacter/Attack/AttackUp.png'
                const lightningBlade = new Sprite({
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
                    rotation: rotation
                })

                renderedSprites.splice(1, 0, lightningBlade)

                const originalPosition = { x: this.position.x, y: this.position.y }

                gsap.to(lightningBlade.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,

                    onStart: () => {
                        this.opacity = 0
                    },

                    onComplete: () => {
                        
                        gsap.to(healthBar, {
                            width: this.health + '%'
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
            case 'Quick Slash':
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

                            gsap.to(healthBar, {
                                width: this.health + '%'
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
        }
    }
}