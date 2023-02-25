const GAME_CONFIG = {
  width: 256,
  height: 256,
  scene: [Scene1, Scene2],
}

window.onload = () => {
  new Phaser.Game(GAME_CONFIG);
}