const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576


//Armazena Pontos de Encontro do Jogo
const collisionsMap = []
const battleZonesMap = []
const charactersMap = []
const puzzlesMap = []

//Armazena Objetos do Jogo
const boundaries = []
const battleZones = []
const characters = []
const puzzles = []

//Posição Inicial
const offset = {
    x: -6850,
    y: -2700
}

//NPCS
const drayven = new Image()
drayven.src = '/assets/Character/Drayven.png'

const oldman = new Image()
oldman.src = '/assets/Character/032Game.png'

const npc_1 = new Image()
npc_1.src = '/assets/Character/001Game.png'

const npc_2 = new Image()
npc_2.src = '/assets/Character/003Game.png'

const npc_3 = new Image()
npc_3.src = '/assets/Character/008Game.png'

const npc_4 = new Image()
npc_4.src = '/assets/Character/009Game.png'

const npc_5 = new Image()
npc_5.src = '/assets/Character/010Game.png'

const npc_6 = new Image()
npc_6.src = '/assets/Character/022Game.png'

//Mapa
const image = new Image()
image.src = '/assets/Island/AshesOfFate.png'

//Foreground
const foregroundImage = new Image()
foregroundImage.src = '/assets/Island/Foreground.png'

//Zarien
const playerDown = new Image()
playerDown.src = '/assets/MainCharacter/Walk/WalkDown.png'
const playerUp = new Image()
playerUp.src = '/assets/MainCharacter/Walk/WalkUp.png'
const playerLeft = new Image()
playerLeft.src = '/assets/MainCharacter/Walk/WalkLeft.png'
const playerRight = new Image()
playerRight.src = '/assets/MainCharacter/Walk/WalkRight.png'
const idleDown = new Image()
idleDown.src = '/assets/MainCharacter/Idle/IdleDown.png'
const idleUp = new Image()
idleUp.src = '/assets/MainCharacter/Idle/IdleUp.png'
const idleLeft = new Image()
idleLeft.src = '/assets/MainCharacter/Idle/IdleLeft.png'
const idleRight = new Image()
idleRight.src = '/assets/MainCharacter/Idle/IdleRight.png'

//Configurações da Imagem
const SPRITE_WIDTH = 320
const SPRITE_HEIGHT = 96
const NUM_SPRITE = 4

//Zarien
const player = new Sprite({
    position: {
        x: canvas.width / 2 - SPRITE_WIDTH / NUM_SPRITE / 2,
        y: canvas.height / 2 - SPRITE_HEIGHT / 2
    },
    image: idleLeft,
    frames: {
        max: 4,
        hold: 10
    },

    sprites: {
        down: playerDown,
        up: playerUp,
        left: playerLeft,
        right: playerRight,
        idleDown: idleDown,
        idleUp: idleUp,
        idleLeft: idleLeft,
        idleRight: idleRight
    }
})

//Mapa
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },

    image: image
})

//Foreground
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },

    image: foregroundImage
})

//Teclas do Jogo
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}


//Colisões
for (let i = 0; i < collisions.length; i += 160) {
    collisionsMap.push(collisions.slice(i, 160 + i))
}
//console.log("CollisionsMap:", collisionsMap);

//Batalhas
for (let i = 0; i < battleZonesData.length; i += 160) {
    battleZonesMap.push(battleZonesData.slice(i, 160 + i))
}
//console.log("battleZonesMap:", battleZonesMap);

//NPCS
for (let i = 0; i < charactersMapData.length; i += 160) {
    charactersMap.push(charactersMapData.slice(i, 160 + i))
}
//console.log("charactersMapData:", charactersMapData);

//Puzzles
for (let i = 0; i < puzzlesMapData.length; i += 160) {
    puzzlesMap.push(puzzlesMapData.slice(i, 160 + i))
}
//console.log("charactersMapData:", charactersMapData);


//Responsável por criar os objetos de Colisão do Jogo
// J = COLUNA, I = LINHA
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 21463)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})
//console.log(boundaries);


//Responsável por criar os objetos de Batalha do Jogo
// J = COLUNA, I = LINHA
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 28510 || symbol === 28511) {
            const zoneId = `zona_${i}_${j}`;
            battleZones.push(
                new BattleZone({
                    position: {
                        x: j * BattleZone.width + offset.x,
                        y: i * BattleZone.height + offset.y
                    },
                    id: zoneId
                })
            );
        }
    });
});
//console.log(battleZones);

//Responsável por criar os objetos(NPCS)
charactersMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        // 28495 === Drayven
        if (symbol === 28493) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: drayven,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 3,
                    animate: true,
                    dialogue: ['As Ilhas de Orlath adoram devorar homens como você.', 'Mas eu posso guiá-lo, para sobreviver será necessário explorar todo o mapa e encontrar os 5 artefatos.', 'Não perca mais tempo, comece a sua jornada!']
                })
            )
        }
        // 28496 === Outro NPC
        else if (symbol === 28494) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: oldman,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 2.5,
                    animate: true,
                    dialogue: ['Essa vila é antiga... você já deve ter escutado falar sobre. E como as notícias correm rápido, sei o que busca aqui.', 'Ninguém nunca conseguiu liberar todos os artefatos... mas tenho uma dica que pode te ajudar.', 'Lá onde a água dança sem parar, segredos antigos vêm a sussurrar. Procure no centro do espelho a brilhar, pois algo além do reflexo há de encontrar.']
                })
            )
        }

        // 28502 === NPC_1
        else if (symbol === 28502) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: npc_1,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 2.5,
                    animate: true,
                    dialogue: ['Fiquei sabendo que você é novo por aqui e está em busca de desbloquear o antigo baú.', 'Para isso, apenas te digo: cuidado por onde pisa, evite ao máximo as batalhas, elas adoram se esconder... Tenha uma boa sorte, já que os últimos não tiveram.']
                })
            )
        }

        //28503 === NPC_2
        else if (symbol === 28503) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: npc_2,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 2.5,
                    animate: true,
                    dialogue: ['Seja muito bem-vindo à nossa vila. Ela não é a melhor de todas, mas é o melhor que poderíamos ter, pelo menos ainda não está destruida como o outro lado...', 'Depois que a maldição se espalhou por lá, poucos foram os que restaram para contar história...', 'Enfim, espero que goste daqui, e converse com os outros também, eles poderão te ajudar no que precisas.']
                })
            )
        }

        // 28504 === NPC_3
        else if (symbol === 28504) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: npc_3,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 2.5,
                    animate: true,
                    dialogue: ['As asas um dia cortaram o céu, mas hoje descansam em meio ao véu. Entre destroços do que foi viagem, jaz um enigma entre a paisagem.']
                })
            )
        }

        // 28502 === NPC_4
        else if (symbol === 28505) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: npc_4,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 2.5,
                    animate: true,
                    dialogue: ['Então você é o mais novo corajoso que vai em busca dos famosos artefatos? hahahahaha', 'Eu até te daria uma dica, mas sei que não vai adiantar nada. Todos falam tanto sobre essa lenda de completar os artefatos, que eu até me pergunto se é verdade...']
                })
            )
        }

        // 28506 === NPC_5
        else if (symbol === 28506) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: npc_5,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 2.5,
                    animate: true,
                    dialogue: ['Hey, confesso que quando me falaram que tinha um novo alguém em busca de liberar sabe-se o que, jamais imaginei que seria como você.', 'A única pista que tenho foi um papel que encontrei em uma garrafa, e ele dizia: "Rodava gigantemente no mundo num ritmo sem fim, agora parada, silenciosa assim. No alto ou ambaixo, onde já brilhou, um pedaço do mistério ali ficou."', 'Não sei qual a sua motivação para essa missão, espero que seja muito boa e que consiga completá-la (com sucesso).']
                })
            )
        }

        // 28507 === NPC_6
        else if (symbol === 28507) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: npc_6,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 2.5,
                    animate: true,
                    dialogue: ['E aí cara, tudo bem? Tá em busca dos artefatos né? Se liga no que acabei de escutar.', '"De pedra é feito quem tudo observou, sem mover-se, tudo notou. Nas sombras de um guardião esquecido, um segredo repousa escondido.', 'Não sei o que significa, mas pode ser que te ajude em algo.', 'Ahhh, além disso tem outra coisa: evite cortar caminhos... nunca se sabe para o que eles te levarão.']
                })
            )
        }

        //DRAYVEN - 2
        // 28508 === Drayven - 2
        else if (symbol === 28508) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: drayven,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 3,
                    animate: true,
                    dialogue: ['E aí? Já conseguiu quantos artefatos? Já resolveu o que está bem de baixo do seu nariz?', 'Lembre-se: relacione cada dica recebida com lugares presentes na nossa querida ilha. Só assim você não ficará perambulando perdido por aí.']
                })
            )
        }

        // 28509 === Drayven - 3
        else if (symbol === 28509) {
            characters.push(
                new Character({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    image: drayven,
                    frames: {
                        max: 4,
                        hold: 60
                    },
                    scale: 3,
                    animate: true,
                    dialogue: ['Olha só, você de novo por aqui, até que você está indo bem. Mas será que conseguiu resolver todos os desafios?', 'Sei que um deles pode está mais próximo ao final do que pensa. E falando nisso, você lembra qual o destino ou objeto final?', 'Espero que sim, caso contrário terá que voltar no começo de tudo para descobrir...']
                })
            )
        }

        if (symbol !== 0) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
        }
    })
})

//Responsável por criar os puzzles
puzzlesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        //Morse Puzzle
        if (symbol === 28496) {
            puzzles.push(
                new Puzzle({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    modalId: 'morseModal',
                    puzzleType: 'morse'
                })
            )
        }
        //Map Puzzle
        if (symbol === 28497) {
            puzzles.push(
                new Puzzle({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    modalId: 'islandModal',
                    puzzleType: 'map'
                })
            )
        }
        //Music Puzzle
        if (symbol === 28498) {
            puzzles.push(
                new Puzzle({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    modalId: 'musicModal',
                    puzzleType: 'music'
                })
            )
        }
        //Binary Puzzle
        if (symbol === 28499) {
            puzzles.push(
                new Puzzle({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    modalId: 'binaryModal',
                    puzzleType: 'binary'
                })
            )
        }
        //Moon Puzzle
        if (symbol === 28500) {
            puzzles.push(
                new Puzzle({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    modalId: 'moonModal',
                    puzzleType: 'moon'
                })
            )
        }
        //Final Chest
        if (symbol === 28501) {
            puzzles.push(
                new Puzzle({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    modalId: 'chestModal',
                    puzzleType: 'chest',
                    isFinalChest: true
                })
            )
        }

    })
});

//Move
const movables = [
    background,
    ...boundaries,
    foreground,
    ...battleZones,
    ...characters,
    ...puzzles
]

//Draw
const renderables = [
    background,
    ...boundaries,
    ...battleZones,
    ...characters,
    ...puzzles,
    player,
    foreground
]


let lastKey = ''

let animationId

//Variável existe antes de declarada, OBS: Não é uma boa implementação!
window.isModalOpen = false;

const battle = {
    initiated: false
}

//Hitbox
function getPlayerHitbox(offsetX, offsetY) {
    return {
        position: {
            x: player.position.x + offsetX,
            y: player.position.y + offsetY
        },
        width: player.width - offsetX * 2,
        height: player.height - offsetY * 2
    };
}

//Lógica de animação do player
function movementPlayer() {
    player.animate = false;

    const isMoving = keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed;

    if (isMoving) {
        battleZoneCollisions();

        if (keys.w.pressed && lastKey === 'w') {
            upMovement();
        } else if (keys.a.pressed && lastKey === 'a') {
            leftMovement();
        } else if (keys.s.pressed && lastKey === 's') {
            downMovement();
        } else if (keys.d.pressed && lastKey === 'd') {
            rightMovement();
        }
    }

    idleAnimation();
}

//Up Movement
function upMovement() {
    player.animate = true;
    player.image = player.sprites.up;

    checkForCharacterCollision({
        characters,
        player,
        characterOffset: { x: 0, y: 3 }
    });

    checkForPuzzleCollision({
        puzzles,
        player,
        puzzleOffset: { x: 0, y: 3 }
    });

    if (checkBoundaryCollision({ offsetX: 0, offsetY: 3 })) {
        moveMovables({ x: 0, y: 3 });
    }
}

//Down Movement
function downMovement() {
    player.animate = true;
    player.image = player.sprites.down;

    checkForCharacterCollision({
        characters,
        player,
        characterOffset: { x: 0, y: -3 }
    });

    checkForPuzzleCollision({
        puzzles,
        player,
        puzzleOffset: { x: 0, y: -3 }
    });

    if (checkBoundaryCollision({ offsetX: 0, offsetY: -3 })) {
        moveMovables({ x: 0, y: -3 });
    }
}

//Left Movement
function leftMovement() {
    player.animate = true;
    player.image = player.sprites.left;

    checkForCharacterCollision({
        characters,
        player,
        characterOffset: { x: 3, y: 0 }
    });

    checkForPuzzleCollision({
        puzzles,
        player,
        puzzleOffset: { x: 3, y: 0 }
    });

    if (checkBoundaryCollision({ offsetX: 3, offsetY: 0 })) {
        moveMovables({ x: 3, y: 0 });
    }
}

//Right Movement
function rightMovement() {
    player.animate = true;
    player.image = player.sprites.right;

    checkForCharacterCollision({
        characters,
        player,
        characterOffset: { x: -3, y: 0 }
    });

    checkForPuzzleCollision({
        puzzles,
        player,
        puzzleOffset: { x: -3, y: 0 }
    });

    if (checkBoundaryCollision({ offsetX: -3, offsetY: 0 })) {
        moveMovables({ x: -3, y: 0 });
    }
}

function checkBoundaryCollision({ offsetX, offsetY }) {
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i];
        if (rectangularCollision({
            rectangle1: getPlayerHitbox(25, 25),
            rectangle2: {
                ...boundary,
                position: {
                    x: boundary.position.x + offsetX,
                    y: boundary.position.y + offsetY
                }
            }
        })) {
            return false;
        }
    }
    return true;
}

function moveMovables({ x, y }) {
    movables.forEach(movable => {
        movable.position.x += x;
        movable.position.y += y;
    });
}


function idleAnimation() {
    if (!player.animate) {
        switch (lastKey) {
            case 'w': player.image = player.sprites.idleUp; break;
            case 'a': player.image = player.sprites.idleLeft; break;
            case 's': player.image = player.sprites.idleDown; break;
            case 'd': player.image = player.sprites.idleRight; break;
        }
    }
}

function battleZoneCollisions() {
    for (let i = 0; i < battleZones.length; i++) {
        const battleZone = battleZones[i];


        if (!battleZone) {
            console.error(`[VERIFICAÇÃO] O item no índice ${i} do array 'battleZones' é undefined! Pulando.`);
            continue; 
        }
        

        const overlappingArea = calculateOverlapArea(battleZone);
        if (shouldInitiateBattle(battleZone, overlappingArea)) {
            initiateBattle();
            break;
        }
    }
}


function calculateOverlapArea(battleZone) {
    return (Math.min(
        player.position.x + player.width,
        battleZone.position.x + battleZone.width
    ) - Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
            player.position.y + player.height,
            battleZone.position.y + battleZone.height
        ) - Math.max(player.position.y, battleZone.position.y));
}

//Zona de Batalha Atual
let currentBattleZone = null;

function shouldInitiateBattle(battleZone, overlappingArea) {
    const collision = rectangularCollision({
        rectangle1: getPlayerHitbox(20, 20),
        rectangle2: battleZone
    });

    //Debug
    //if (collision) {
        //console.log(`Área de sobreposição: ${overlappingArea}. Valor mínimo necessário: ${(player.width * player.height) / 4}`);
    //}

    
    if (collision && !battleZone.completed && overlappingArea > (player.width * player.height) / 4) {
        //Debug
        //console.log('CONDIÇÃO ATENDIDA! Iniciando batalha...');
        currentBattleZone = battleZone;
        return true;
    }

    return false;
}

//Batalhas
function initiateBattle() {
    window.cancelAnimationFrame(animationId);
    audio.Map.stop();
    audio.Battle.play();
    battle.initiated = true;
    gsap.to('#overlappingDiv', {
        opacity: 1,
        repeat: 3,
        yoyo: true,
        duration: 0.4,
        onComplete() {
            gsap.to('#overlappingDiv', {
                opacity: 1,
                duration: 0.4,
                onComplete() {
                    initBattle();
                    animateBattle();
                    gsap.to('#overlappingDiv', {
                        opacity: 0,
                        duration: 0.4
                    });
                }
            });
        }
    });
}

function checkForBattleZoneWarning() {
    player.inBattleZone = false;

    for (let i = 0; i < battleZones.length; i++) {
        const zone = battleZones[i];

        
        if (!zone) {
            continue;
        }

        if (
            rectangularCollision({
                rectangle1: getPlayerHitbox(20, 20),
                rectangle2: zone,
            })
        ) {
            player.inBattleZone = true;
            break;
        }
    }
}

function animate() {
    //Puzzle
    if (isModalOpen) return;

    animationId = window.requestAnimationFrame(animate);

    // Renderização
    renderables.forEach(renderable => renderable.draw());

    //Batalha
    if (battle.initiated) return;

    checkForBattleZoneWarning();

    // Verificação de colisão com puzzles
    checkForPuzzleCollision({
        puzzles,
        player,
        puzzleOffset: { x: 0, y: 0 }
    });

    // Lógica de movimento
    movementPlayer();

    checkInteractionProximity();

    if (player.interactionAsset && !player.isInteracting) {
        c.fillStyle = 'rgba(0, 0, 0, 0.8)';
        c.beginPath();
        c.roundRect(canvas.width / 2 - 160, canvas.height - 80, 320, 40, 10);
        c.fill();

        c.fillStyle = '#ffffff';
        c.fillRect(canvas.width / 2 - 140, canvas.height - 70, 80, 20);
        c.fillStyle = '#000000';
        c.font = '10px "Press Start 2P"';
        c.textAlign = 'center';
        c.fillText('ESPAÇO', canvas.width / 2 - 100, canvas.height - 55);

        c.fillStyle = '#ffffff';
        c.font = '14px "Press Start 2P"';
        c.textAlign = 'left';
        c.fillText('PARA CONVERSAR', canvas.width / 2 - 50, canvas.height - 55);
    }


    if (player.inBattleZone) {
        c.fillStyle = 'rgba(200, 0, 0, 0.7)';
        c.fillRect(0, 0, canvas.width, 50);

        // Escreve o texto de aviso
        c.font = '20px "Press Start 2P"';
        c.fillStyle = 'white';
        c.textAlign = 'center';
        c.shadowColor = 'black';
        c.shadowBlur = 5;
        c.fillText('CUIDADO! ZONA DE BATALHA!', canvas.width / 2, 32);
        c.shadowBlur = 0;
    }


    if (player.currentPuzzle && player.currentPuzzle.puzzleType === 'chest') {
        c.fillStyle = 'rgba(0, 0, 0, 0.8)';
        c.beginPath();
        c.roundRect(canvas.width / 2 - 160, canvas.height - 80, 320, 40, 10);
        c.fill();


        c.fillStyle = '#ffffff';
        c.fillRect(canvas.width / 2 - 140, canvas.height - 70, 80, 20);
        c.fillStyle = '#000000';
        c.font = '10px "Press Start 2P"';
        c.textAlign = 'center';
        c.fillText('E', canvas.width / 2 - 100, canvas.height - 55);


        c.fillStyle = '#ffffff';
        c.font = '14px "Press Start 2P"';
        c.textAlign = 'left';
        c.fillText('PARA INTERAGIR', canvas.width / 2 - 50, canvas.height - 55);
    }

}

function dialogueInteraction() {
    player.interactionAsset.dialogueIndex++;
    const { dialogueIndex, dialogue } = player.interactionAsset;

    if (dialogueIndex <= dialogue.length - 1) {
        document.querySelector('#characterDialogueBox').innerHTML = dialogue[dialogueIndex];
        return;
    }


    endDialogue();
}

function endDialogue() {
    player.isInteracting = false;
    player.interactionAsset.dialogueIndex = 0;
    document.querySelector('#characterDialogueBox').style.display = 'none';
}

function startDialogue() {
    if (!player.interactionAsset) return;

    const firstMessage = player.interactionAsset.dialogue[0];
    document.querySelector('#characterDialogueBox').innerHTML = firstMessage;
    document.querySelector('#characterDialogueBox').style.display = 'flex';
    player.isInteracting = true;
}

function canOpenChest() {
    return window.checkAllPuzzlesCompleted()
}

function puzzleInteraction() {
    if (!player.currentPuzzle || !player.nearPuzzle) return;

    const dx = player.position.x - player.currentPuzzle.position.x;
    const dy = player.position.y - player.currentPuzzle.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance >= 100) {
        player.nearPuzzle = false;
        player.currentPuzzle = null;
        return;
    }

    const { puzzleType, modalId } = player.currentPuzzle;

    if (puzzleType === 'chest') {
        if (canOpenChest()) {
            console.log("Abrindo baú final: chestModal");
            openPuzzle('chestModal');
        } else {
            alert("Você precisa completar todos os enigmas antes de abrir este baú!");
        }
    } else {
        console.log("Abrindo puzzle:", modalId);
        openPuzzle(modalId);
    }
}

function movementKeyDown(key) {
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
}

function movementKeyUp(key) {
    switch (key) {
        case 'w': keys.w.pressed = false; break;
        case 'a': keys.a.pressed = false; break;
        case 's': keys.s.pressed = false; break;
        case 'd': keys.d.pressed = false; break;
    }


    if (keys.w.pressed) lastKey = 'w';
    else if (keys.a.pressed) lastKey = 'a';
    else if (keys.s.pressed) lastKey = 's';
    else if (keys.d.pressed) lastKey = 'd';
}


window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (player.isInteracting) {
        if (key === ' ') {
            dialogueInteraction();
        }
        return;
    }

    switch (key) {
        case 'e':
            puzzleInteraction();
            break;
        case ' ':
            startDialogue();
            break;
        case 'w':
        case 'a':
        case 's':
        case 'd':
            movementKeyDown(key);
            break;
    }
});


window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();

    if (['w', 'a', 's', 'd'].includes(key)) {
        movementKeyUp(key);
    }
});