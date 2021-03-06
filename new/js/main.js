//TTTTTT          TTTTTT           TTTTTT
//  TT   ii         TT               TT
//  TT       ccc    TT    aa  ccc    TT   ooo eee
//  TT   ii c       TT   a a c       TT   o o e e
//  TT   ii  ccc    TT   aaa  ccc    TT   ooo ee

// INIT GAME
let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let moves = 0
// TOGGLE
let player = 1;

function checkWinner() {
  let won;
  for (var i = 0; i < 3; i++) {
    if (Math.abs(board[i][0]+board[i][1]+board[i][2]) === 3) {
      won = true;
      break;
    } else if (Math.abs(board[0][i]+board[1][i]+board[2][i]) === 3) {
      won = true;
      break;
    } else if (Math.abs(board[i][0]+board[1][1]+board[2-i][2]) === 3) {
      won = true;
      break;
    }
  }
  moves++;
  won ? endGame(player) : (moves === 9 ? endGame(0) : switchPlayer());
}

function switchPlayer() {
  player === 1 ? player = -1 : player = 1;
}

function illegalMove($node) {
  let originalColor = $node.css('background-color');
  $node.animate({backgroundColor: "rgba(204, 30, 30)"}, 500);
  $node.animate({backgroundColor: originalColor}, 750);
}

// Winner keeps board
function endGame(result) {
  $("section").fadeOut("slow");
  result === 1 ? xWins() : (result === 0 ? tie() : oWins());
  $("section").fadeIn("slow");
  setTimeout(revertState, 600);
}

// Tie - gives board to next player
function tie(){
  $("body").animate({backgroundColor: "rgb(20,37,203)"}, 1200);
  switchPlayer();
}

function xWins () {
  $("body").animate({backgroundColor: "rgb(237, 237, 9)"}, 1200);
}

function oWins () {
  $("body").animate({backgroundColor: "rgb(204, 119, 34)"}, 1200);;
}

function revertState() {
  $('div').removeAttr('style')
          .removeClass('O X played')
          .addClass('not-played')
  board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], moves = 0;
}

$(function() {
  // EVT LISTENER
  $('#game').on('click', '.cell', () => {
    $(event.target).removeClass('not-played');
    let c = $(event.target).attr('id').substring(1).split(',');
    if (board[c[0]][c[1]] === 0) {
      board[c[0]][c[1]] = player;
      player === 1 ? $(event.target).addClass('X played')
                   : $(event.target).addClass('O played');
      checkWinner();
    } else {
      illegalMove($(event.target));
    }
  });
});

