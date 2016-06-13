module GameBp {

    export class Player extends GameObject {

        public weapon: Phaser.Sprite;

        public static preload(scene: Phaser.State) {

            scene.load.image('weapon', 'assets/placeholder/img/starRed.png');
            scene.load.image('friend', 'assets/placeholder/img/headWhite.png');
        }


        constructor(game: Phaser.Game, private enemyGroup: Phaser.Group,
            private onWin: Function, private onWinContext: any,
            private onLose: Function, private onLoseContext: any) {

            super(game, 100, 100, 'friend', 0);

            this.addDefaultBody();

            this.weapon = this.game.add.sprite(320, 200, "weapon");
            GameObject.addBody(this.weapon);
            this.weapon.scale.x = 0.5;
            this.weapon.scale.y = 0.5;
            this.weapon.parent.removeChild(this.weapon);
            this.addChild(this.weapon);
        }


        update() {
            if (this.game.input.activePointer.isDown) {
                this.game.physics.arcade.moveToPointer(this, 100);
            }
            else {
                this.body.velocity.set(0);
            }

            this.game.physics.arcade.collide(this.weapon, this.enemyGroup, Enemy.handleWeaponCollision);
        }

        attack(target: Enemy) {
//            console.log('Attack!!');
//
//            // only attack if weapon not already active
//            if (this.weapon.parent) {
//                return;
//            }
//
//            this.addChild(this.weapon);
//            this.rotation = this.game.physics.arcade.angleBetween(this, target);
//
//            var tween: Phaser.Tween = this.game.add.tween(this.weapon.body);
//            tween.to({ x: '+60' }, 200);
//            tween.yoyo(true);
//            tween.onComplete.add(this.onWeaponBack, this);
//            tween.start();
        }

        onWeaponBack() {
            this.weapon.parent.removeChild(this.weapon);
        }

        die() {
            this.onLose.call(this.onLoseContext);
        }
    }
}