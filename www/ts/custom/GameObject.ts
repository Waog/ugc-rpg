module GameBp {

    export class GameObject extends Phaser.Sprite {


        constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any) {

            super(game, x, y, key, frame);
            game.add.existing(this);
        }

        public addDefaultBody() {
            this.game.physics.arcade.enable(this);
            var body: Phaser.Physics.Arcade.Body = this.body;
            this.anchor.set(0.5);
            body.collideWorldBounds = true;
            body.setSize(this.width * 0.6, this.height * 0.6);
        }
    }
}