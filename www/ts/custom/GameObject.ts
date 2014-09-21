module GameBp {

    export class GameObject extends Phaser.Sprite {


        constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any) {

            super(game, x, y, key, frame);
            game.add.existing(this);
        }

        public addDefaultBody() {
            GameObject.addBody(this);
            this.body.collideWorldBounds = true;
        }

        public static addBody(sprite: Phaser.Sprite) {
            sprite.game.physics.arcade.enable(sprite);
            var body: Phaser.Physics.Arcade.Body = sprite.body;
            sprite.anchor.set(0.5);
            body.setSize(sprite.width * 0.6, sprite.height * 0.6);
        }
    }
}