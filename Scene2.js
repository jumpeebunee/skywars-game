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
    ship.x = this.getRandomPosition();
    ship.y = 0;
  }
  getRandomPosition() {
    return Math.floor(Math.random() * (GAME_CONFIG.width - 0) + 0);
  }
}