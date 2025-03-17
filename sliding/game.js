class Sliding {
  #solutionBoard;

  constructor(playerName) {
    this.playerName = playerName;
    this.#solutionBoard = ["1", "2", "3", "4", "5", "6", "7", "8", " "];
    this.currentState = this.shuffleBoard();
  }

  shuffleBoard() {
    return this.#solutionBoard.toSorted(() => Math.random() - 0.5);
  }

  isSolved() {
    return this.currentState.toString() === this.#solutionBoard.toString();
  }

  static isExitCommand(command) {
    return command === "e";
  }

  #swapTiles(tile1, tile2) {
    const swapped = [...this.currentState];
    [swapped[tile1], swapped[tile2]] = [swapped[tile2], swapped[tile1]];

    return swapped;
  }

  #getNewTileIndex(empTileIdx, direction) {
    if (direction === "d" && empTileIdx % 3 !== 2) return empTileIdx + 1;
    if (direction === "a" && empTileIdx % 3 !== 0) return empTileIdx - 1;
    if (direction === "s" && empTileIdx < 6) return empTileIdx + 3;
    if (direction === "w" && empTileIdx > 2) return empTileIdx - 3;

    return empTileIdx;
  }

  moveTile(direction) {
    const emptyTileIndex = this.currentState.indexOf(" ");
    const newTileIndex = this.#getNewTileIndex(emptyTileIndex, direction);

    if (emptyTileIndex !== newTileIndex) {
      this.currentState = this.#swapTiles(emptyTileIndex, newTileIndex);
    }

    return this.currentState;
  }
}

const playGame = (gameInstance) => {
  while (!gameInstance.isSolved()) {
    console.log(gameInstance.currentState);

    const playerMove = prompt("Enter direction (w/a/s/d) or 'e' to exit:");
    console.clear();

    if (Sliding.isExitCommand(playerMove)) return false;

    gameInstance.currentState = gameInstance.moveTile(playerMove);
  }

  return true;
};

const startGame = () => {
  const gameInstance = new Sliding("Suman");
  const result = playGame(gameInstance);

  console.log(result ? "Win!" : "Lose!");
};

startGame();
