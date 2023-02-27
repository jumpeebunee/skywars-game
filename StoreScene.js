class StoreScene extends Phaser.Scene {
  constructor() {
    super('storeGame')
  }
  storeEvents(click, btn) {
    if (btn._text === 'Назад') {
      this.scene.start('menuGame');
    }
  }
  create() {
    this.background = this.add.tileSprite(0,0, GAME_CONFIG.width, GAME_CONFIG.height, 'background');
    this.background.setOrigin(0,0);

    this.add.text(GAME_CONFIG.width / 2 - 40, 20, 'Магазин', {
      font: '12px font1'
    })
    this.add.text(GAME_CONFIG.width / 2 - 45, 35, `Рекорд: ${GAME_SETTINGS.maxScore}p`, {
      font: '7px font1'
    })
    this.add.text(30, 65, 'ОчкиX2:', {
      font: '12px font1'
    })
    this.add.text(30, 85, 'Жизни:', {
      font: '12px font1'
    })
    this.add.text(30, 105, 'Скорость:', {
      font: '12px font1'
    })
    this.add.text(30, 125, 'Корабль:', {
      font: '12px font1'
    })

    this.scores = this.add.text(120, 65, '800p', {
      font: '12px font1',
      stroke: 'white'
    })

    this.lives = this.add.text(110, 85, '1000p', {
      font: '12px font1',
      stroke: 'white'
    })

    this.speed = this.add.text(140, 105, '1200p', {
      font: '12px font1',
      stroke: 'white'
    })
    
    if (GAME_SETTINGS.maxScore >= 800) this.scores.text = 'получено';
    if (GAME_SETTINGS.maxScore >= 1000) this.lives.text = 'получено';
    if (GAME_SETTINGS.maxScore >= 1200) this.speed.text = 'получено';
   
    this.ship = this.add.text(130, 125, 'забрать', {
      font: '12px font1',
      stroke: 'white'
    })
    this.back = this.add.text(GAME_CONFIG.width / 2 - 40, GAME_CONFIG.height - 40, 'Назад', {
      font: '12px font1'
    })

    this.back.setInteractive();
    this.input.on('gameobjectdown', this.storeEvents, this);
  }
  update() {
    this.background.tilePositionY -= 0.5;
  }
}