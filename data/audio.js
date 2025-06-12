const audio = {
    //SOM - Exploração
    Map: new Howl({
        src: '/audio/merry-on-the-floor.mp3',
        html5: true,
        volume: 0.1
    }),
     Battle: new Howl({
        src: '/audio/pagan-rituals.mp3',
        html5: true,
        volume: 0.1
    }),
    Story: new Howl({
        src: '/audio/castle-festivities.mp3',
        html5: true,
        volume: 0.1
    }),
    //SOM - Ataques
    Tackle: new Howl({
        src: '/audio/tackleHit.wav',
        html5: true,
        volume: 0.1
    }),
    Fireball: new Howl({
        src: '/audio/fireballHit.wav',
        html5: true,
        volume: 0.1
    }),
    InitFireball: new Howl({
        src: '/audio/initFireball.wav',
        html5: true,
        volume: 0.1
    }),
}