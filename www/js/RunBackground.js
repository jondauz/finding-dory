function RunBackground() {

	var texture = PIXI.Texture.fromFrame('run_background');
	PIXI.extras.TilingSprite.call(this, texture, GAME_WIDTH, RunBackground.HEIGHT);

	this.position.x = 0;
	this.position.y = GAME_HEIGHT - this.height;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	this.viewportX = 0;
}

RunBackground.constructor = RunBackground;
RunBackground.DELTA_X = 0.5;
RunBackground.HEIGHT = 75;

RunBackground.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

RunBackground.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * RunBackground.DELTA_X);
};