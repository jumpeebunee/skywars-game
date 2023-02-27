const GAME_CONFIG = {
  width: 256,
  height: 272,
  scene: [Scene1, MenuScene, Scene2],
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
  lives: 3,
  maxScore: 0,
}

const MUSIC_CONFIG = {
  mute: false,
  volume: 0.1,
  rate: 1,
  detune: 1,
  seek: 0,
  loop: true,
  delay: 0,
}

document.addEventListener("DOMContentLoaded", function(event) {
  let game = new Phaser.Game(GAME_CONFIG);
  let a = document.getElementsByTagName('canvas');
  a[0].classList.add('game')
})