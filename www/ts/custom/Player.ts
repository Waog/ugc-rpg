module GameBp {

    export class Player extends GameObject {


        public static preload(scene: Phaser.State) {

            scene.load.image('weapon', 'assets/placeholder/img/starRed.png');
            scene.load.image('friend', 'assets/placeholder/img/headWhite.png');
        }


        constructor(game: Phaser.Game) {

            super(game, 100, 100, 'friend', 0);

            this.addDefaultBody();
        }


        update() {
            if (this.game.input.activePointer.isDown) {
                this.game.physics.arcade.moveToPointer(this, 100);
            }
            else {
                this.body.velocity.set(0);
            }
        }
    }
}