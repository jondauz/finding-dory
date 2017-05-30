function ScoreBoard() {

	PIXI.Container.call(this);
	this.position.x = 0;
	this.position.y = 0;

	this.leadText = new PIXI.Text(gameTextObject.Overall.ScoreScreen.Title, { 
		font: '700 49px futura-pt', 
		fill: 'white', 
		align: 'center' 
	});  

	this.leadText.position.x = GAME_WIDTH/2 - this.leadText.width/2;
	this.leadText.position.y = 50;
	this.addChild(this.leadText);

	this.doryTexture = PIXI.Texture.fromFrame('dory-3');
	this.dory =  new PIXI.Sprite(this.doryTexture);
	this.dory.position.x = GAME_WIDTH/2 - this.dory.width/2;
	this.dory.position.y = this.leadText.position.y + this.dory.height + 10;
	this.addChild(this.dory);

	this.dotsTexture = PIXI.Texture.fromFrame('dots');
	this.dots =  new PIXI.Sprite(this.dotsTexture);
	this.dots.position.x = GAME_WIDTH/2 - this.dots.width/2;
	this.dots.position.y = this.dory.position.y + this.dots.height + 75;
	this.addChild(this.dots);

	this.scoreDescription = new PIXI.Text(gameTextObject.Overall.ScoreScreen.Description, { 
		font: '300 21px futura-pt', 
		fill: 'white', 
		align: 'center' 
	});  

	this.scoreDescription.position.x = GAME_WIDTH/2 - this.scoreDescription.width/2;
	this.scoreDescription.position.y = this.dots.position.y + this.scoreDescription.height + 10;
	this.addChild(this.scoreDescription)

	this.scoreText = new PIXI.extras.BitmapText('0', { 
		font: '75px font', 
		fill: '#6fc3f3', 
		align: 'center' 
	});  

	this.scoreText.position.x = GAME_WIDTH/2 - this.scoreText.width/2;
	this.scoreText.position.y = this.scoreDescription.position.y + 50
	this.addChild(this.scoreText)

	this.scoreLabel = new PIXI.Text(gameTextObject.Overall.GameScreen.Meters, {
		font: '300 21px futura-pt',
		fill: 'white',
		align: 'center'
	});

	this.scoreLabel.position.x = GAME_WIDTH/2 - this.scoreLabel.width/2;
	this.scoreLabel.position.y = this.scoreText.position.y + this.scoreLabel.height + 50;
	this.addChild(this.scoreLabel);

	this.shareHeader = new PIXI.Text(gameTextObject.Overall.ScoreScreen.ShareHeader, {
		font: '300 21px futura-pt',
		fill: 'white',
		align: 'center'
	});

	this.shareHeader.position.x = GAME_WIDTH/2 - this.shareHeader.width/2;
	this.shareHeader.position.y = this.scoreLabel.position.y + this.shareHeader.height + 25;
	this.addChild(this.shareHeader)

	var facebookTextures = [
		PIXI.Texture.fromFrame("facebook"),
		PIXI.Texture.fromFrame("facebook-hover")
	];

	this.shareFacebook = new PIXI.extras.MovieClip(facebookTextures);
	this.shareFacebook.width = 82;
	this.shareFacebook.height = 82;
	this.shareFacebook.position.x = GAME_WIDTH/2 - this.shareFacebook.width/2 - this.shareFacebook.width/2 - 10;
	this.shareFacebook.position.y = this.shareHeader.position.y + this.shareHeader.height + 25;
	this.shareFacebook.interactive = true;
	this.addChild(this.shareFacebook);

	var twitterTextures = [
		PIXI.Texture.fromFrame("twitter"),
		PIXI.Texture.fromFrame("twitter-hover")
	];

	this.shareTwitter = new PIXI.extras.MovieClip(twitterTextures);
	this.shareTwitter.width = 82;
	this.shareTwitter.height = 82;
	this.shareTwitter.position.x = GAME_WIDTH/2 - this.shareTwitter.width/2 + this.shareTwitter.width/2 + 10;
	this.shareTwitter.position.y = this.shareHeader.position.y + this.shareHeader.height + 25;
	this.shareTwitter.interactive = true;
	this.addChild(this.shareTwitter);

	this.shareTwitter.on('mouseover', function(){
        this.gotoAndStop(1);
    });

    this.shareTwitter.on('mouseout', function(){
        this.gotoAndStop(0);
    });

    this.shareFacebook.on('mouseover', function(){
        this.gotoAndStop(1);
    });

    this.shareFacebook.on('mouseout', function(){
        this.gotoAndStop(0);
    });

	this.replayBtn = new Button(this.stage, gameTextObject.Overall.GameScreen.RestartButton);
	this.replayBtn.position.x = GAME_WIDTH/2 - this.replayBtn.width/2;
	this.replayBtn.position.y = GAME_HEIGHT - this.replayBtn.height - 25;
	this.replayBtn.interactive = true;
	this.addChild(this.replayBtn);

}

ScoreBoard.constructor = ScoreBoard;
ScoreBoard.prototype = Object.create(PIXI.Container.prototype);

ScoreBoard.prototype.show = function(score) {
	this.scoreText.text = score.toFixed(1);
	this.scoreText.position.x = GAME_WIDTH/2 - this.scoreText.width/2;
	this.visible = true;
}

ScoreBoard.prototype.hide = function(score) {
	this.visible = false;
}
