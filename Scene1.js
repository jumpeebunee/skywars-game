class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }
  preload() {
    this.load.image('background', './assets/background.png');

    this.load.spritesheet('ship1', './assets/ship1.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.spritesheet('ship2', './assets/ship2.png', {
      frameWidth: 32,
      frameHeight: 16,
    })
    this.load.spritesheet('ship3', './assets/ship3.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
  }
  create() {
    this.scene.start('playGame');
  }
}