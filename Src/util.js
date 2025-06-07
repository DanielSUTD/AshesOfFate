//Retângulo 1 = Representa o Player
//Retângulo 2 = Representa o Limite do Mapa
//Verifica Colisões
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function checkForCharacterCollision({
  characters,
  player,
  characterOffset = { x: 0, y: 0 }
}) {
  player.interactionAsset = null
  //Capturando a Colisão entre o Player e o NPC
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i]

    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...character,
          position: {
            x: character.position.x + characterOffset.x,
            y: character.position.y + characterOffset.y
          }
        }
      })
    ) {
      player.interactionAsset = character
      break
    }
  }
}

function checkForPuzzleCollision({ puzzles, player, puzzleOffset = {x: 0, y: 0} }) {
    let colliding = false;
    
    for (let i = 0; i < puzzles.length; i++) {
        const puzzle = puzzles[i];
        if (
            rectangularCollision({
                rectangle1: getPlayerHitbox(20, 20),
                rectangle2: {
                    ...puzzle,
                    position: {
                        x: puzzle.position.x + puzzleOffset.x,
                        y: puzzle.position.y + puzzleOffset.y
                    }
                }
            })
        ) {
            colliding = true;
            player.nearPuzzle = true;
            player.currentPuzzle = puzzle;
            break;
        }
    }
    
    
    if (!colliding) {
        player.nearPuzzle = false;
        player.currentPuzzle = null;
    }
}

