module GameBp {

    export class Player extends GameObject {

        weapon: Phaser.Sprite;
        weaponAngle: number = 0;

        public static preload(scene: Phaser.State) {

            scene.load.image('weapon', 'assets/placeholder/img/starRed.png');
            scene.load.image('friend', 'assets/placeholder/img/headWhite.png');
        }


        constructor(game: Phaser.Game, private enemyGroup: Phaser.Group,
            private onWin: Function, private onWinContext: any,
            private onLose: Function, private onLoseContext: any) {

            super(game, 100, 100, 'friend', 0);

            this.addDefaultBody();

            this.weapon = this.game.add.sprite(100, 100, "weapon");
            GameObject.addBody(this.weapon);
            this.weapon.scale.x = 0.5;
            this.weapon.scale.y = 0.5;
        }


        update() {
            if (this.game.input.activePointer.isDown) {
                this.game.physics.arcade.moveToPointer(this, 100);
            }
            else {
                this.body.velocity.set(0);
            }

            this.weaponAngle += this.game.time.elapsed / 500;

            var radius: number = 1.3;
            this.weapon.body.x = this.x - this.weapon.body.width / 2
            + radius * this.weapon.width * Math.sin(this.weaponAngle);
            this.weapon.body.y = this.y - this.weapon.body.height / 2
            + radius * this.weapon.height * Math.cos(this.weaponAngle);

            this.game.physics.arcade.collide(this.weapon, this.enemyGroup, Enemy.handleWeaponCollision);
        }

        die() {
            this.onLose.call(this.onLoseContext);
        }
    }
}