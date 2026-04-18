const cellSize = 20, cellX = 15, cellY = 30;

let player = { x: 5, y: cellY - 2, len: 5 };
let ball = { x: 5, y: 10, xDir: 1, yDir: 1 };
let level = [];
let btn;

// golden palette (blocks only)
const palette = [
  [232, 222, 175],
  [218, 207, 155],
  [212, 214, 120],
  [210, 227, 121],
  [220, 230, 158]
];

function setup() {
  createCanvas(cellSize * cellX, cellSize * cellY);
  frameRate(25);

  textAlign(CENTER, CENTER);
  textFont('VT323'); // will work ONLY if loaded in HTML

  for (let x = 0; x < cellX; x++) {
    for (let y = 0; y < 15; y++) {
      if (random(5) < 1) {
        level.push({
          x: x,
          y: y,
          color: palette[floor(random(palette.length))]
        });
      }
    }
  }
}

function pix(color, x, y) {
  if (Array.isArray(color)) {
    fill(color[0], color[1], color[2]);
  } else {
    fill(color);
  }

  square(x * cellSize, y * cellSize, cellSize * 0.9);
}

function draw() {
  noStroke();
  background('#4D662F');

  // bricks
  for (let i = 0; i < level.length; i++) {
    let cell = level[i];

    if (level[i] != 0) {
      if (cell.x == ball.x && cell.y == ball.y) {
        ball.yDir *= -1;
        level[i] = 0;
      } else {
        pix(cell.color, cell.x, cell.y);
      }
    }
  }

  // ball movement
  ball.x += ball.xDir;
  ball.y += ball.yDir;

  if (ball.x >= cellX - 1) ball.xDir = -1;
  if (ball.y >= cellY - 1) ball.yDir = -1;
  if (ball.x <= 0) ball.xDir = 1;
  if (ball.y <= 0) ball.yDir = 1;

  // paddle collision
  if (
    ball.x >= player.x &&
    ball.x <= player.x + player.len &&
    ball.y >= player.y - 1
  ) {
    ball.yDir = -1;
  }

  // GAME OVER
  if (ball.y + 1 >= cellY) {
    noLoop();

    if (!btn) {
      btn = createButton("Try Again?");
      btn.size(width / 2, 50);
      btn.position(width / 2 - (width / 4), height / 2 + 90);

      btn.style('background-color', '#E8E092');
      btn.style('color', '#4D662F');
      btn.style('border', 'none');
      btn.style('font-size', '22px');
      btn.style('font-family', 'VT323');
      btn.style('cursor', 'pointer');
      btn.style('transition', '0.2s');

      btn.mouseOver(() => btn.style('transform', 'scale(1.05)'));
      btn.mouseOut(() => btn.style('transform', 'scale(1)'));

      btn.mousePressed(() => window.location.reload());
    }

    fill('#E8E092');
    textSize(48);
    textFont('VT323');

    text("Game Over", width / 2, (height / 2 + 120) - 55);
  }

  // ball
  pix('#E8E092', ball.x, ball.y);

  // controls
  if (keyIsDown(LEFT_ARROW) && player.x > 0) player.x--;
  if (keyIsDown(RIGHT_ARROW) && player.x + player.len < cellX) player.x++;

  // paddle
  for (let i = 0; i < player.len; i++) {
    pix('#E8E092', player.x + i, player.y);
  }
}
