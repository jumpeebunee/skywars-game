const GAME_CONFIG = {
  width: 256,
  height: 272,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  }
}

const GAME_SETTINGS = {
  playerSpeed: 100,
  defaultX: GAME_CONFIG.width / 2,
  defaultY: GAME_CONFIG.height / 2 + 75,
}

let game = new Phaser.Game(GAME_CONFIG);
