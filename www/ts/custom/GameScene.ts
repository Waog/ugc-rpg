module GameBp {

    export class GameScene extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        hitSound: Phaser.Sound;
        player: Phaser.Sprite;
        enemy: Phaser.Sprite;

        preload() {

            this.load.tilemap('map', 'assets/tilemaps/test-ground-50x50.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tileset', 'assets/tilesets/hyptosis.png');

            this.load.image('enemy', 'assets/placeholder/img/headBlack.png');
            this.load.image('friend', 'assets/placeholder/img/headWhite.png');
            this.load.audio('hit', Utils
                .getAudioFileArray('assets/placeholder/fx/hit'));


            //            this.game.gameplayMusic.play();
        }


        create() {
            this.hitSound = this.game.add.audio('hit');

            //            this.music = this.add.audio('music', 1, false);
            //            this.music.play();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            var map: Phaser.Tilemap = this.add.tilemap('map');
            map.addTilesetImage('hyptosis', 'tileset');
            var layer: Phaser.TilemapLayer = map.createLayer('ground');
            layer.resizeWorld();

            var tutorialString = "shoot the black guy,\ndon't shot the white guy.";
            this.game.add.bitmapText(10, 10, 'bmFont', tutorialString, 50);

            this.enemy = this.add.sprite(200, 200, "enemy");
            this.addDefaultBody(this.enemy);
            this.addInputHandler(this.enemy, this.onWin);

            this.player = this.add.sprite(100, 100, "friend");
            this.addInputHandler(this.player, this.onLose);
            this.addDefaultBody(this.player);

            this.camera.follow(this.player);
        }

        update() {
            if (this.input.activePointer.isDown) {
                this.physics.arcade.moveToPointer(this.player, 100);
            }
            else {
                this.player.body.velocity.set(0);
            }

            // object1, object2, collideCallback, processCallback, callbackContext
            this.physics.arcade.collide(this.player, this.enemy, this.onLose, null, this);
        }

        addDefaultBody(sprite: Phaser.Sprite) {
            this.game.physics.arcade.enable(sprite);
            var body: Phaser.Physics.Arcade.Body = sprite.body;
            sprite.anchor.set(0.5);
            body.collideWorldBounds = true;
            body.setSize(sprite.width * 0.6, sprite.height * 0.6);
        }


        addInputHandler(sprite: Phaser.Sprite, callback: Function) {

            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(callback, this);
        }


        onWin() {

            this.hitSound.play();
            this.game.state.start('Win');
        }


        onLose() {

            this.hitSound.play();
            this.game.state.start('Lose');
        }


        shutdown() {
            //            this.game.gameplayMusic.stop();
            this.world.setBounds(0, 0, 640, 480);
        }

        render() {
            this.game.debug.body(this.player);
            this.game.debug.body(this.enemy);
        }
    }
}