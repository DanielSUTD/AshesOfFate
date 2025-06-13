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

function checkForPuzzleCollision({ puzzles, player, puzzleOffset = { x: 0, y: 0 } }) {
  let colliding = false;

  for (let i = 0; i < puzzles.length; i++) {
    const puzzle = puzzles[i];
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...puzzle,
          position: {
            x: puzzle.position.x + puzzleOffset.x,
            y: puzzle.position.y + puzzleOffset.y
          }
        }
      })
    ) {

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

function checkInteractionProximity() {
    
    player.interactionAsset = null;

    for (let i = 0; i < characters.length; i++) {
        const character = characters[i];

        
        const interactionBox = {
            position: {
                x: character.position.x - 16, 
                y: character.position.y - 16 
            },
            width: character.width + 32,  
            height: character.height + 32 
        };

        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: interactionBox 
            })
        ) {
            
            player.interactionAsset = character;
          
            break; 
        }
    }
}

