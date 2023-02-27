class MenuScene extends Phaser.Scene {
  constructor() {
    super('menuGame');
  }
  startGame() {
    this.scene.start('playGame');
  }
  create() {
    this.background = this.add.tileSprite(0,0, GAME_CONFIG.width, GAME_CONFIG.height, 'background');
    this.background.setOrigin(0,0);

    this.playBtn = this.add.sprite(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2, 'playGameBtn');
    this.musicBtn = this.add.sprite(GAME_CONFIG.width / 2 - 55, GAME_CONFIG.height / 2, 'musicGameBtn');
    this.storeBtn = this.add.sprite(GAME_CONFIG.width / 2 + 55, GAME_CONFIG.height / 2, 'storeGameBtn');


    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.playBtn.setInteractive();
    this.input.on('gameobjectdown', this.startGame, this);
  }
  update() {
    this.background.tilePositionY -= 0.5;
  }
}