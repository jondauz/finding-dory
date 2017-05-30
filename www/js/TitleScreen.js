function TitleScreen(stage) {

	this.titleScreen = new PIXI.Container();
	stage.addChild(this.titleScreen);

	var backgroundTexture = PIXI.Texture.fromFrame('background');
	var tilingBackground = new PIXI.extras.TilingSprite(backgroundTexture, GAME_WIDTH, GAME_HEIGHT);
	this.titleScreen.tilingBackground = tilingBackground;
	this.titleScreen.addChild(tilingBackground);

	this.startBtn = new Button(stage, gameTextObject.Overall.GameScreen.StartButton);
	this.startBtn.position.x = GAME_WIDTH/2 - this.startBtn.width/2;
	this.startBtn.position.y = GAME_HEIGHT - this.startBtn.height - 50;
	this.startBtn.interactive = true;
	this.titleScreen.addChild(this.startBtn);

	startDoryTexture = PIXI.Texture.fromFrame('dory-3');
	var startDory = new PIXI.Sprite(startDoryTexture);
	startDory.width = 59;
	startDory.height = 63;
	this.titleScreen.addChild(startDory);
	startDory.position.x = GAME_WIDTH/2 - startDory.width/2;
	startDory.position.y = GAME_WIDTH/2 - startDory.height/2;

	
}

TitleScreen.prototype.moveBackground = function() {
	this.titleScreen.tilingBackground.tilePosition.x -= SCROLL_SPEED;
};

TitleScreen.prototype.showHowToPlay = function() {
	this.parent.howToPlayScreen.visible = true;
};

TitleScreen.prototype.hideHowToPlay = function() {
	this.parent.howToPlayScreen.visible = false;
};

