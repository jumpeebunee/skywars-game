const GAME_SETTINGS = {
  playerSpeed: 100,
}

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

    this.player = this.physics.add.sprite(GAME_CONFIG.width / 2, GAME_CONFIG.height / 2, 'player');

    this.ship1.play('ship1_anim');
    this.ship2.play('ship2_anim');
    this.ship3.play('ship3_anim');

    this.player.play('thrust');
    this.player.setCollideWorldBounds(true);

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);

    this.createPowerUps();
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.beams = this.add.group();
  }
  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.tilePositionY -= 0.5;

    this.playerMove();
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) this.playerAttack();

    for (let i = 0; i < this.beams.getChildren().length; i += 1) {
      let beam = this.beams.getChildren()[i];
      beam.update();
    }
  }
  playerMove() {
    const cursorKey = this.cursorKeys;

    if (!cursorKey.left.isDown) {
      this.player.setVelocityX(0);
    } 
    if (!cursorKey.up.isDown) {
      this.player.setVelocityY(0);
    }

    if (cursorKey.left.isDown) {
      this.player.setVelocityX(-GAME_SETTINGS.playerSpeed);
    } else if (cursorKey.right.isDown) {
      this.player.setVelocityX(GAME_SETTINGS.playerSpeed);
    }

    if (cursorKey.up.isDown) {
      this.player.setVelocityY(-GAME_SETTINGS.playerSpeed);
    } else if (cursorKey.down.isDown) {
      this.player.setVelocityY(GAME_SETTINGS.playerSpeed);
    }
  }
  playerAttack() {
    let beam = new Beam(this);
  }
  createPowerUps() {
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