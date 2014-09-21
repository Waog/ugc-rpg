module GameBp {

    export class Enemy extends GameObject {

        public static preload(scene: Phaser.State) {

            scene.load.image('enemy', 'assets/placeholder/img/headBlack.png');
        }


        constructor(game: Phaser.Game, private player: Player, x: number = 200, y: number = 200) {

            super(game, x, y, 'enemy', 0);

            this.addDefaultBody();

        }


        update() {
        
            this.game.physics.arcade.collide(this.player, this, this.player.die, null, this.player);
        }

        static handleWeaponCollision(weapon: Phaser.Sprite, enemy: Enemy) {
        
            enemy.die();
        }

        die() {
            this.parent.removeChild(this);
        }
    }
}