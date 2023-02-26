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

const MUSIC_CONFIG = {
  mute: false,
  volume: 1,
  rate: 1,
  detune: 1,
  seek: 0,
  loop: true,
  delay: 0,
}

let game = new Phaser.Game(GAME_CONFIG);
