class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }
  create() {
    this.background = this.add.tileSprite(0,0,GAME_CONFIG.width, GAME_CONFIG.height, 'background');
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.sprite(GAME_CONFIG.width / 2 - 50, GAME_CONFIG.height / 2, 'ship1');
    this.ship2 = this.add.sprite(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2, 'ship2');
    this.ship3 = this.add.sprite(GAME_CONFIG.width / 2 + 50, GAME_CONFIG.height / 2, 'ship3');

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

    this.ship1.play('ship1_anim');
    this.ship2.play('ship2_anim');
    this.ship3.play('ship3_anim');

    this.ship1.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);

    // power-ups

    this.powerUps = this.physics.add.group();
    for (let i = 0; i <= 4; i += 1) {
      let powerUp = this.physics.add.sprite(16,16, 'power-up');
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0,0, GAME_CONFIG.width, GAME_CONFIG.height);

      if (Math.random() > 0.5) {
        powerUp.play('red')
      } else {
        powerUp.play('gray');
      }

      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }
  }
  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.tilePositionY -= 0.5;
  }
  moveShip(ship, speed) {
    if (ship.y > GAME_CONFIG.height) {
      this.resetShip(ship);
    } else {
      ship.y += speed;
    }
  }
  resetShip(ship) {
    ship.x = this.getRandomPosition(GAME_CONFIG.width);
    ship.y = 0;
  }
  destroyShip(pointer, gameObject) {
    gameObject.setTexture('explosion');
    gameObject.play('explode');
  }
  getRandomPosition(max) {
    return Math.floor(Math.random() * (max - 0) + 0);
  }
}