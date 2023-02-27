class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }
  create() {
    this.score = 0;
    this.ammo = 10;
    this.spipSpeed1 = 1;
    this.spipSpeed2 = 2;
    this.spipSpeed3 = 3;
    this.lives = GAME_SETTINGS.lives;

    this.background = this.add.tileSprite(0,0, GAME_CONFIG.width, GAME_CONFIG.height, 'background');
    this.background.setOrigin(0, 0);

    if (GAME_SETTINGS.blackSkin) {
      this.player = this.physics.add.sprite(GAME_SETTINGS.defaultX, GAME_SETTINGS.defaultY, 'player2');
      this.player.play('thrust2');
    } else {
      this.player = this.physics.add.sprite(GAME_SETTINGS.defaultX, GAME_SETTINGS.defaultY, 'player');
      this.player.play('thrust');
    }

    this.player.setCollideWorldBounds(true);

    this.beamSound = this.sound.add('beam_sound');
    this.explosionSound = this.sound.add('explosion_sound');
    this.pickupSound = this.sound.add('pickup_sound');

    if (!this.music) this.music = this.sound.add('gameMusic');
    if (!this.music.isPlaying) this.music.play(MUSIC_CONFIG);
    
    this.createScorePoint();

    this.mql = window.matchMedia('(max-width: 1280px)');

    setTimeout(() => {
      this.ship1 = this.add.sprite(this.getRandomPosition(GAME_CONFIG.width), 0, 'ship1');
      this.ship2 = this.add.sprite(this.getRandomPosition(GAME_CONFIG.width), 0, 'ship2');
      this.ship3 = this.add.sprite(this.getRandomPosition(GAME_CONFIG.width), 0, 'ship3');
    
      this.ship1.play('ship1_anim');
      this.ship2.play('ship2_anim');
      this.ship3.play('ship3_anim');

      this.ship1.setInteractive();
      this.ship2.setInteractive();
      this.ship3.setInteractive();

      this.cursorKeys = this.input.keyboard.createCursorKeys();
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      this.powerUps = this.physics.add.group();
      this.beams = this.add.group();
      this.ships = this.add.group();
      this.enemies = this.physics.add.group();

      this.enemies.add(this.ship1);
      this.enemies.add(this.ship2);
      this.enemies.add(this.ship3);

      this.physics.add.collider(this.beams, this.powerUps, this.powerUpHit)
      this.physics.add.overlap(this.player, this.powerUps, this.takePowerUp, null, this);
      this.physics.add.overlap(this.player, this.enemies, this.destroyPlayer, null, this);
      this.physics.add.overlap(this.beams, this.enemies, this.destroyEnemy, null, this);

      this.createPowerUps();

      this.isStarted = true;

      this.isMove = '';
      if (this.mql.matches) {
        this.mLeft = this.add.sprite(GAME_CONFIG.width / 2 - 30, GAME_CONFIG.height - 20, 'mLeft');
        this.mRight = this.add.sprite(GAME_CONFIG.width / 2 + 30 , GAME_CONFIG.height - 20, 'mRight');
        this.mUp = this.add.sprite(GAME_CONFIG.width / 2, GAME_CONFIG.height -  50, 'mUp');
        this.mDown = this.add.sprite(GAME_CONFIG.width / 2, GAME_CONFIG.height - 20, 'mDown');
        this.mShoot = this.add.sprite(GAME_CONFIG.width / 2 + 60 , GAME_CONFIG.height - 20, 'mShoot');
    
        this.input.on('gameobjectdown', this.moveMent, this);
    
        this.mLeft.setInteractive();
        this.mRight.setInteractive();
        this.mUp.setInteractive();
        this.mDown.setInteractive();
        this.mShoot.setInteractive();
      }
    }, 1000);
  }
  update() {
    if (this.isStarted) {
      this.moveShip(this.ship1, this.spipSpeed1);
      this.moveShip(this.ship2, this.spipSpeed2);
      this.moveShip(this.ship3, this.spipSpeed3);

      if (this.beams.children) {
        if (this.beams.getChildren().length) {
          for (let i = 0; i < this.beams.getChildren().length; i += 1) {
            let beam = this.beams.getChildren()[i];
            beam.update();
          }
        }
      }
      this.playerMove();
      if (Phaser.Input.Keyboard.JustDown(this.spacebar)) this.playerAttack();
    }

    this.background.tilePositionY -= 0.5;
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
      this.isMove = null;
    } else if (cursorKey.right.isDown) {
      this.player.setVelocityX(GAME_SETTINGS.playerSpeed);
      this.isMove = null;
    }

    if (cursorKey.up.isDown) {
      this.player.setVelocityY(-GAME_SETTINGS.playerSpeed);
      this.isMove = null;
    } else if (cursorKey.down.isDown) {
      this.player.setVelocityY(GAME_SETTINGS.playerSpeed);
      this.isMove = null;
    }

    if (this.isMove === 'left') {
      this.player.setVelocityX(-GAME_SETTINGS.playerSpeed);
    } else if (this.isMove === 'right') {
      this.player.setVelocityX(GAME_SETTINGS.playerSpeed);
    } else if (this.isMove === 'up') {
      this.player.setVelocityY(-GAME_SETTINGS.playerSpeed);
    } else if (this.isMove === 'down') {
      this.player.setVelocityY(GAME_SETTINGS.playerSpeed);
    }
  }
  moveMent(click, btn) {
    if (btn.texture.key === 'mShoot') this.playerAttack();
    if (btn.texture.key === 'mLeft') {
      this.isMove = 'left';
    } else if (btn.texture.key === 'mRight') {
      this.isMove = 'right';
    } else if (btn.texture.key === 'mUp') {
      this.isMove = 'up';
    } else if (btn.texture.key === 'mDown') {
      this.isMove = 'down';
    }
  }
  playerAttack() {
    if (this.ammo === 0) return;
    let beam = new Beam(this);
    this.beamSound.play();
    this.ammo -= 1;
    this.updateAmmo();
  }
  createPowerUps() {
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
  destroyPlayer(player, enemy) {
    this.resetShip(enemy);
    this.explosionSound.play();
    if (this.player.alpha >= 1) {
      if (this.lives === 0) {
        if (this.score > GAME_SETTINGS.maxScore) {
          GAME_SETTINGS.maxScore = this.score;
        }
        this.music.stop();
        this.scene.stop();
        this.scene.start('menuGame');
      }
      let explosion = new Explosion(this, player.x, player.y);
      player.disableBody(true, true);
      player.active = false;
      this.updateLives();
      this.time.addEvent({
        delay: 1000,
        callback: this.resetPlayer,
        callbackScope: this,
        loop: false
      });
    }
  }
  resetPlayer() {
    let x = GAME_CONFIG.width / 2;
    let y = GAME_CONFIG.height + 50;
    this.player.enableBody(true, x, y, true, true);
    this.player.alpha = 0.5;
    let tween = this.tweens.add({
      targets: this.player, 
      y: GAME_CONFIG.height - 50, 
      ease: 'Power1',
      duration: 1500,
      repeat: 0,
      onComplete() {
        this.player.active = true;
        this.player.alpha = 1;
      },
      callbackScope: this,
    })
  }
  destroyEnemy(beam, enemy) {
    let explosion = new Explosion(this, enemy.x, enemy.y);
    beam.destroy();
    this.resetShip(enemy);
    this.updateScore();
    this.explosionSound.play();
  }
  powerUpHit(beam) {
    beam.destroy();
  }
  takePowerUp(player, powerUp) {
    if (powerUp.anims.currentAnim.key === 'gray') {
      this.ammo += 3;
      this.updateAmmo();
    } else if (powerUp.anims.currentAnim.key === 'red') {
      this.updateScore();
    }
    this.pickupSound.play();
    powerUp.disableBody(true, true);
    this.activatePowerUp(powerUp);
  }
  activatePowerUp(powerUp) {
    setTimeout(() => {
      powerUp.enableBody(true, 0,0, true, true);
      powerUp.setRandomPosition(0,0, GAME_CONFIG.width, GAME_CONFIG.height);
      powerUp.setVelocity(100, 100);

      if (Math.random() > 0.5) {
        powerUp.play('red')
      } else {
        powerUp.play('gray');
      }
    }, 3000);
  }
  updateAmmo() {
    this.ammoText.text = `Ammo: ${this.ammo}`
  }
  updateScore() {
    if (this.score % 500 === 0 && this.score !== 0) {
      this.spipSpeed1 += 1;
      this.spipSpeed2 += 1;
      this.spipSpeed3 += 1;
      this.background.tilePositionY -= 0.5;
    } 
    this.score += GAME_SETTINGS.points;
    this.scoreText.text = `Score: ${this.getValidScore()}`
  }
  updateLives() {
    this.lives -= 1;
    this.livesText.text = `${this.lives}`
  }
  getRandomPosition(max) {
    return Math.floor(Math.random() * (max - 0) + 0);
  }
  getValidScore() {
    return this.score.toString().padStart(6, '0');
  }
  createScorePoint() {
    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1); 
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(GAME_CONFIG.width, 0);
    graphics.lineTo(GAME_CONFIG.width, 20);
    graphics.lineTo(0, 20)
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();
    this.scoreText = this.add.bitmapText(10, 5, 'pixelFont', `Score: ${this.getValidScore()}`, 16);
    this.ammoText = this.add.bitmapText(195, 5, 'pixelFont', `Ammo: ${this.ammo}`, 16);

    this.heartLives = this.add.sprite(165, 10, 'heart');
    this.livesText = this.add.bitmapText(175, 5, 'pixelFont', `${this.lives}`, 16);
  }
}