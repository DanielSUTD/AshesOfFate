
const battleBackgroundImage = new Image();
battleBackgroundImage.src = '/assets/Island/BattleBackground.png';

// Fundo da Batalha
const battleBackground = new Sprite({
    position: { x: 0, y: 0 },
    image: battleBackgroundImage
});

// Variáveis de escopo da cena de batalha
let mage;
let zarien;
let renderedSprites;
let queue;
let battleAnimationId;
let canClickDialogue = true;


function setAttackButtonsEnabled(enabled) {
    document.querySelectorAll('.attack-buttons button').forEach(button => {
        button.disabled = !enabled;
        button.style.opacity = enabled ? '1' : '0';
        button.style.cursor = enabled ? 'pointer' : 'default';
        button.style.pointerEvents = enabled ? 'auto' : 'none';
    });
}


function playerAttack(selectedAttack, recipient) {
    setAttackButtonsEnabled(false);


    document.querySelector('#attack-style').innerHTML = selectedAttack.type;
    document.querySelector('#attack-style').style.color = selectedAttack.color;


    zarien.attack({
        attack: selectedAttack,
        recipient: recipient,
        renderedSprites
    });

    if (recipient.health <= 0) {
        battleEnd(true);
    } else {
        queue.push(() => {
            enemyTurn();
        });
    }
}


function enemyTurn() {
    const randomAttack = enemy.attacks[Math.floor(Math.random() * enemy.attacks.length)];

    enemy.attack({
        attack: randomAttack,
        recipient: zarien,
        renderedSprites
    });


    if (zarien.health <= 0) {
        battleEnd(false);
    }
}


function battleEnd(playerWon) {

    queue.push(() => {
        playerWon ? enemy.faint() : zarien.faint();
    });


    if (playerWon && currentBattleZone) {
        currentBattleZone.completed = true;
    }


    queue.push(() => {
        gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
                cancelAnimationFrame(battleAnimationId);
                animate();
                document.querySelector('#user-interface').style.display = 'none';
                gsap.to('#overlappingDiv', { opacity: 0 });
                battle.initiated = false;


                if (!playerWon) {
                    audio.Map.play();
                }
            }
        });
    });
}


function initBattle() {
    // Reseta a Interface de Usuário
    document.querySelector('#user-interface').style.display = 'block';
    document.querySelector('#dialogue-box').style.display = 'none';
    document.querySelector('.enemy-health .health-bar-fill').style.width = '100%';
    document.querySelector('.player-health .health-bar-fill').style.width = '100%';
    document.querySelector('.attack-buttons').replaceChildren();

    // Cria os Personagens da Batalha
    const monsterKeys = Object.keys(monsters);
    const randomMonsterKey = monsterKeys[Math.floor(Math.random() * monsterKeys.length)];
    const monsterData = monsters[randomMonsterKey];


    enemy = new Monster({
        ...monsterData,
        position: { ...monsterData.position }
    });

    zarien = new Player({
        position: { x: 420, y: 420 },
        image: { src: '/assets/BattleImg/ZarienIdleUp.png' },
        frames: { max: 4, hold: 30 },
        animate: true,
        name: 'Zarien',
        attacks: [attacks['Quick Slash']]
    });

    renderedSprites = [enemy, zarien];
    queue = [];

    zarien.attacks.forEach((attack) => {
        const button = document.createElement('button');
        button.innerHTML = attack.name;
        document.querySelector('.attack-buttons').append(button);

        
        button.addEventListener('mouseover', () => {
            document.querySelector('#attack-style').innerHTML = attack.type;
            document.querySelector('#attack-style').style.color = attack.color;
        });

        
        button.addEventListener('mouseout', () => {
            document.querySelector('#attack-style').innerHTML = 'Tipo de Ataque'; 
            document.querySelector('#attack-style').style.color = 'white'; 
        });

        button.addEventListener('click', () => {
            playerAttack(attack, enemy);
        });
    });

    setAttackButtonsEnabled(true);
}


function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle);
    battleBackground.draw();

    renderedSprites.forEach((sprite) => {
        sprite.draw();
    });
}


document.querySelector('#dialogue-box').addEventListener('click', (e) => {
    if (!canClickDialogue || e.currentTarget.style.display === 'none') return;

    canClickDialogue = false;
    setTimeout(() => { canClickDialogue = true; }, 500);

    if (queue.length > 0) {
        queue[0]();
        queue.shift();
    } else {
        e.currentTarget.style.display = 'none';
        setAttackButtonsEnabled(true);
        document.querySelector('#attack-style').innerHTML = 'Tipo de Ataque';
        document.querySelector('#attack-style').style.color = 'white';
    }
});