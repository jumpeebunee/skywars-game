class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    const x = scene.player.x;
    const y = scene.player.y;

    super(scene, x, y, 'beam');

    scene.physics.world.enableBody(this);
    scene.add.existing(this);
    scene.beams.add(this);

    this.play('beam-anim');
    this.body.velocity.y = -150;
  }
  update() {
    if (this.y < 20) this.destroy();
  }
}