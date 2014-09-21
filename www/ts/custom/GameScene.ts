module GameBp {

    export class GameScene extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        hitSound: Phaser.Sound;
        player: Phaser.Sprite;

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

            var enemy = this.add.sprite(100, 100, "enemy");
            this.addPhysicsMovmentAndColision(enemy);
            this.addInputHandler(enemy, this.onWin);

            this.player = this.add.sprite(100, 100, "friend");
            this.addInputHandler(this.player, this.onLose);
            this.physics.arcade.enable(this.player);
            this.player.body.collideWorldBounds = true;

            this.camera.follow(this.player);
        }

        update() {
            if (this.input.activePointer.isDown) {
                this.physics.arcade.moveToPointer(this.player, 300);
            }
            else {
                this.player.body.velocity.set(0);
            }
        }

        addPhysicsMovmentAndColision(sprite: Phaser.Sprite) {

            this.game.physics.arcade.enable(sprite);
            sprite.body.velocity.x = 50 + Math.random() * 50;
            sprite.body.velocity.y = 50 + Math.random() * 50;
            sprite.body.bounce.x = 1;
            sprite.body.bounce.y = 1;
            sprite.body.collideWorldBounds = true;
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
    }
} 