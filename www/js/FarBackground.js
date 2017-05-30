function FarBackground() {

	var texture,
	canAutoplay;


	// if(Modernizr.video) {

	// 	Modernizr.on('videoautoplay', function(result) {
	// 		if (result) {
	// 			console.log('dsfasd');
	// 			texture = PIXI.Texture.fromFrame('background');		
	// 		} else {
	// 			console.log('here');
	// 			texture = PIXI.Texture.fromFrame('background-backup');
	// 		}
	// 	}); 

	// } else {
	// 	console.log('asdfs');
	// 	texture = PIXI.Texture.fromFrame('background-backup');
	// }

	texture = PIXI.Texture.fromFrame('background');		


	PIXI.extras.TilingSprite.call(this, texture, GAME_WIDTH, GAME_HEIGHT);

	this.position.x = 0;
	this.position.y = 0;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;
	this.viewportX = 0;

}

FarBackground.constructor = FarBackground;
FarBackground.DELTA_X = 1;

FarBackground.prototype = Object.create(PIXI.extras.TilingSprite.prototype);

FarBackground.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * FarBackground.DELTA_X);
};