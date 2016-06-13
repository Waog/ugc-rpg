module GameBp {

    export class GameScene extends Phaser.State {

        music: Phaser.Sound;
        hitSound: Phaser.Sound;
        player: Player;
        enemyGroup: Phaser.Group;

        preload() {

            Player.preload(this);
            Enemy.preload(this);

            this.load.tilemap('map', 'assets/tilemaps/test-ground-50x50.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tileset', 'assets/tilesets/hyptosis.png');
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

            this.enemyGroup = this.add.group();
            this.enemyGroup.enableBody = true;
            this.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

            this.player = new Player(this.game, this.enemyGroup, this.onWin, this, this.onLose, this);

            this.enemyGroup.add(new Enemy(this.game, this.player, 200, 200));
            this.enemyGroup.add(new Enemy(this.game, this.player, 300, 200));

            this.camera.follow(this.player);
        }

        update() {
            if (this.enemyGroup.length == 0) {
                this.onWin();
            }
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
            this.game.debug.body(this.player.weapon);
            this.game.debug.body(this.enemyGroup.getTop());
            this.game.debug.body(this.enemyGroup.getBottom());
        }
    }
}