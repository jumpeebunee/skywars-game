class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }
  loadSprites() {
    this.load.spritesheet('ship1', './assets/spritesheets/ship1.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.spritesheet('ship2', './assets/spritesheets/ship2.png', {
      frameWidth: 32,
      frameHeight: 16,
    })
    this.load.spritesheet('ship3', './assets/spritesheets/ship3.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('explosion', './assets/spritesheets/explosion.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.spritesheet('power-up', './assets/spritesheets/power-up.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.spritesheet('player', './assets/spritesheets/player.png', {
      frameWidth: 16,
      frameHeight: 24,
    })
    this.load.spritesheet('beam','./assets/spritesheets/beam.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
    this.load.spritesheet('playGameBtn', './assets/spritesheets/playBtn.png', {
      frameWidth: 54,
      frameHeight: 54,
    })
    this.load.spritesheet('musicGameBtn', './assets/spritesheets/musicBtn.png', {
      frameWidth: 40,
      frameHeight: 40,
    })
    this.load.spritesheet('storeGameBtn', './assets/spritesheets/storeBtn.png', {
      frameWidth: 40,
      frameHeight: 40,
    })
  }
  loadImages() {
    this.load.image('background', './assets/background.png');
  }
  loadSounds() {
    this.load.audio('music', ['./assets/sounds/sci-fi_platformer12.ogg', './assets/sounds/sci-fi_platformer12.mp3']);
    this.load.audio('beam_sound', ['./assets/sounds/beam.ogg', './assets/sounds/beam.mp3']);
    this.load.audio('explosion_sound', ['./assets/sounds/explosion.ogg', './assets/sounds/explosion.mp3']);
    this.load.audio('pickup_sound', ['./assets/sounds/pickup.ogg', './assets/sounds/pickup.mp3']);
  }
  createAnimation() {
    this.anims.create({
      key: 'ship1_anim',
      frames: this.anims.generateFrameNumbers('ship1'),
      frameRate: 20,
      repeat: -1,
    })
    this.anims.create({
      key: 'ship2_anim',
      frames: this.anims.generateFrameNumbers('ship2'),
      frameRate: 20,
      repeat: -1,
    })
    this.anims.create({
      key: 'ship3_anim',
      frames: this.anims.generateFrameNumbers('ship3'),
      frameRate: 20,
      repeat: -1,
    })
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion'),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    })
    this.anims.create({
      key: 'red',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 0,
        end: 1,
      }),
      frameRate: 20,
      repeat: -1,
    })
    this.anims.create({
      key: 'gray',
      frames: this.anims.generateFrameNumbers('power-up', {
        start: 2,
        end: 3,
      }),
      frameRate: 20,
      repeat: -1,
    })
    this.anims.create({
      key: 'thrust',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 20,
      repeat: -1,
    })
    this.anims.create({
      key: 'beam-anim',
      frames: this.anims.generateFrameNumbers('beam'),
      frameRate: 20,
      repeat: -1,
    })
  }
  preload() {
    this.load.bitmapFont('pixelFont', './assets/font/font.png', './assets/font/font.xml');
    this.loadSounds();
    this.loadSprites();
    this.loadImages();
  }
  create() {
    this.createAnimation();
    this.scene.start('playGame');
  }
}