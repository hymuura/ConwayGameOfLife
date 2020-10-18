let xMax = 100,
  yMax = 100;
let game = [];
let year = 0;

function bigBang() {
  console.log("creating world...");
  for (let x = 0; x < xMax; x++) {
    game.push(new Array(yMax).fill(0));
  }
  game[25][30] = 1;
  game[25][31] = 1;
  game[25][32] = 1;
  game[26][32] = 1;
  game[27][32] = 1;
  game[27][31] = 1;
  game[27][30] = 1;

  game[50][80] = 1;
  game[50][81] = 1;
  game[50][82] = 1;
  game[50][83] = 1;
  game[50][84] = 1;
  game[50][85] = 1;
  game[50][86] = 1;
  game[50][87] = 1;
  game[50][88] = 1;
  game[50][89] = 1;
  for (let x = 0; x < xMax; x++) {
    let rowDiv = "<div class='flex_row'>";
    for (let y = 0; y < yMax; y++) {
      let classCell = getClassName(game[x][y]);
      let cellDiv =
        "<div id='cell_" + x + "_" + y + "' class='" + classCell + "'></div>";
      rowDiv += cellDiv;
    }
    rowDiv += "</div>";
    document.getElementById("game").innerHTML += rowDiv;
  }
  console.log("finish world...");
  setTimeout(() => afterBigBang(), 2000);
}

function afterBigBang() {
  console.log("start year: " + year);
  for (let x = 0; x < xMax; x++) {
    for (let y = 0; y < yMax; y++) {
      discoverCellStatus(x, y);
    }
  }
  year++;
  drawWorld();
  setTimeout(() => afterBigBang(), 2000);
}

function discoverCellStatus(x, y) {
  let counter = checkEnviroment(x, y);
  let cellActualStatus = game[x][y];
  if (cellActualStatus === 0 && counter === 3) {
    game[x][y] = 1;
  } else if (cellActualStatus === 1 && counter > 3) {
    game[x][y] = 0;
  } else if (cellActualStatus === 1 && counter < 2) {
    game[x][y] = 0;
  }
}

function checkEnviroment(x, y) {
  let counter = 0;
  if (validPosition(x - 1, y - 1)) {
    if (game[x - 1][y - 1] == 1) {
      counter++;
    }
  }
  if (validPosition(x, y - 1)) {
    if (game[x][y - 1] == 1) {
      counter++;
    }
  }
  if (validPosition(x + 1, y - 1)) {
    if (game[x + 1][y - 1] == 1) {
      counter++;
    }
  }
  if (validPosition(x + 1, y)) {
    if (game[x + 1][y] == 1) {
      counter++;
    }
  }
  if (validPosition(x + 1, y + 1)) {
    if (game[x + 1][y + 1] == 1) {
      counter++;
    }
  }
  if (validPosition(x, y + 1)) {
    if (game[x][y + 1] == 1) {
      counter++;
    }
  }
  if (validPosition(x - 1, y + 1)) {
    if (game[x - 1][y + 1] == 1) {
      counter++;
    }
  }
  if (validPosition(x - 1, y)) {
    if (game[x - 1][y] == 1) {
      counter++;
    }
  }
  return counter;
}

function validPosition(x, y) {
  if (x === -1) {
    return false;
  }
  if (y === -1) {
    return false;
  }
  if (x === 100) {
    return false;
  }
  if (y === 100) {
    return false;
  }
  return true;
}

function getClassName(status) {
  return status === 0 ? "cell_dead" : "cell_alive";
}

function drawWorld() {
  for (let x = 0; x < xMax; x++) {
    for (let y = 0; y < yMax; y++) {
      let classCell = getClassName(game[x][y]);
      let element = document.getElementById("cell_" + x + "_" + y);
      element.classList.remove("cell_alive");
      element.classList.remove("cell_dead");
      element.classList.add(classCell);
    }
  }
}
