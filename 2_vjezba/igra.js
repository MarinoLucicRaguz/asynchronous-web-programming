function showMessage(message) {
  var messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

function showResetButton() {
  var resetButton = document.getElementById("resetgame");
  if (resetButton.style.display === "none") {
    resetButton.style.display = "";
  }
}

function hideResetButton() {
  var resetButton = document.getElementById("resetgame");
  resetButton.style.display = "none";
}

document.getElementById("resetgame").addEventListener("click", function () {
  igra.reset();
});

const igra = {
  gameOver: false,
  currentPlayer: "c",
  board: {},
  init: function () {
    this.board = {};

    render.init((x,y) => this.makeMove(x,y));
  },
  isWinningMove: function (x, y) {
    const winningCount = 4;

    let countHorizontal = 1;
    for (let i = 1; i < winningCount; i++) {
      if (this.board[`${x - i}-${y}`] === this.currentPlayer) {
        countHorizontal++;
      } else {
        break;
      }
    }
    for (let i = 1; i < winningCount; i++) {
      if (this.board[`${x + i}-${y}`] === this.currentPlayer) {
        countHorizontal++;
      } else {
        break;
      }
    }

    let countVertical = 1;
    for (let i = 1; i < winningCount; i++) {
      if (this.board[`${x}-${y - i}`] === this.currentPlayer) {
        countVertical++;
      } else {
        break;
      }
    }
    for (let i = 1; i < winningCount; i++) {
      if (this.board[`${x}-${y + i}`] === this.currentPlayer) {
        countVertical++;
      } else {
        break;
      }
    }

    let countDiagonal1 = 1;
    for (let i = 1; i < winningCount; i++) {
      if (this.board[`${x - i}-${y - i}`] === this.currentPlayer) {
        countDiagonal1++;
      } else {
        break;
      }
    }
    for (let i = 1; i < winningCount; i++) {
      if (this.board[`${x + i}-${y + i}`] === this.currentPlayer) {
        countDiagonal1++;
      } else {
        break;
      }
    }

    let countDiagonal2 = 1;
    for (let i = 1; i < winningCount; i++) {
      if (this.board[`${x + i}-${y - i}`] === this.currentPlayer) {
        countDiagonal2++;
      } else {
        break;
      }
    }
    for (let i = 1; i < winningCount; i++) {
      if (this.board[`${x - i}-${y + i}`] === this.currentPlayer) {
        countDiagonal2++;
      } else {
        break;
      }
    }

    if (
      countHorizontal >= winningCount ||
      countVertical >= winningCount ||
      countDiagonal1 >= winningCount ||
      countDiagonal2 >= winningCount
    ) {
      showMessage(
        `${this.currentPlayer === "p" ? "Plava" : "Crvena"} je pobijedila!`
      );
      return true;
    }

    return false;
  },
  isLegalMove: function (x, y) {
    if (this.board[`${x}-${y}`] != null) {
      showMessage("Polje je vec odabrano.");
      return false;
    }

    if (y > 0 && !this.board[`${x}-${y - 1}`]) {
      showMessage("Odaberite polje koje ne lebdi.");
      return false;
    }

    showMessage("");
    return true;
  },
  makeMove: function (x, y) {
    if (this.gameOver) {
      return;
    }
    if (!this.isLegalMove(x, y)) return;

    if (!this.gameOver) {
      this.board[`${x}-${y}`] = this.currentPlayer;
    }

    if (this.isWinningMove(x, y)) {
      render.draw(this.board);
      this.gameOver = true;
      showResetButton();
      return;
    }

    render.draw(this.board);

    this.currentPlayer = this.currentPlayer !== "c" ? "c" : "p";
  },
  reset: function () {
    render.clear();
    this.gameOver = false;
    this.currentPlayer = this.currentPlayer !== "c" ? "c" : "p";
    showMessage("");
    hideResetButton();
    this.init();
  },
};

igra.init();
