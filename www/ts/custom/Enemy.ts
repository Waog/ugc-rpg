module GameBp {

    export class Enemy extends GameObject {

        public static preload(scene: Phaser.State) {

            scene.load.image('enemy', 'assets/placeholder/img/headBlack.png');
        }


        constructor(game: Phaser.Game, private player: Player) {

            super(game, 200, 200, 'enemy', 0);

            this.addDefaultBody();

        }


        update() {
            this.game.physics.arcade.collide(this.player, this, this.player.die, null, this.player);
        }
    }
}