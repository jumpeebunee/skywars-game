class MenuScene extends Phaser.Scene {
  constructor() {
    super('menuGame');
  }
  startGame(pointer, btn) {
    if (btn.texture.key === 'playGameBtn') {
      this.music.stop();
      this.scene.start('playGame');
    } else if (btn.texture.key === 'storeGameBtn') {
      this.music.stop();
      this.scene.start('storeGame');
    } else {
      if (!this.music.mute) {
        this.musicBtn.setTexture('musicGameBtnDisabled')
      } else {
        this.musicBtn.setTexture('musicGameBtn')
      }
      this.music.mute = !this.music.mute;
      MUSIC_CONFIG.mute = !MUSIC_CONFIG.mute;
    }
  }
  create() {
    ysdk.adv.showFullscreenAdv({
      callbacks: {
          onOpen: function() {
            this.music.mute = true;
          },
          onClose: function(wasShown) {
            this.music.mute = false;
          },
          onError: function(error) {
            console.log(error)
          }
      }
  })

    this.background = this.add.tileSprite(0,0, GAME_CONFIG.width, GAME_CONFIG.height, 'background');
    this.background.setOrigin(0,0);

    this.playBtn = this.add.sprite(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2, 'playGameBtn');
    this.musicBtn = this.add.sprite(GAME_CONFIG.width / 2 - 55, GAME_CONFIG.height / 2, 'musicGameBtn');
    this.storeBtn = this.add.sprite(GAME_CONFIG.width / 2 + 55, GAME_CONFIG.height / 2, 'storeGameBtn');

    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.playBtn.setInteractive();
    this.storeBtn.setInteractive();
    this.musicBtn.setInteractive();
    this.input.on('gameobjectdown', this.startGame, this);

    if (GAME_SETTINGS.maxScore >= 800) GAME_SETTINGS.points = 20;
    if (GAME_SETTINGS.maxScore >= 1000) GAME_SETTINGS.lives = 5;
    if (GAME_SETTINGS.maxScore >= 1200) GAME_SETTINGS.playerSpeed = 150;

    if (!this.music) this.music = this.sound.add('mainMusic');
    if (this.music.mute) this.musicBtn.setTexture('musicGameBtnDisabled')
    if (!this.music.isPlaying) this.music.play(MUSIC_CONFIG);
  }
  update() {
    this.background.tilePositionY -= 0.5;
  }
}