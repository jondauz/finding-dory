function Dory() {

	var texture_array = [
		PIXI.Texture.fromFrame("dory-1"),
		PIXI.Texture.fromFrame("dory-2"),
		PIXI.Texture.fromFrame("dory-3")
	];

	PIXI.extras.MovieClip.call(this, texture_array);

	this.START_X = 100;
	this.SPEED = 6;
	this.DOWNRATE = 0.3;

	this.width  = 60;
	this.height = 63;

	this.LOST = false;
	this.animationSpeed = 0.1;
	this.position.y = 200;
	this.speedY = this.SPEED;
	this.rate = this.DOWNRATE;
	this.position.x = this.START_X;
	this.play();

}

Dory.constructor = Dory;

Dory.prototype = Object.create(PIXI.extras.MovieClip.prototype);

Dory.prototype.move = function() {
	this.speedY = this.SPEED * 0.875;
};
Dory.prototype.blinkCount = 2;
Dory.fadingIn = false;

Dory.prototype.reinit = function() {

	this.LOST = false;
	this.animationSpeed = 0.1;
	this.position.y = 200;
	this.speedY = this.SPEED;
	this.rate = this.DOWNRATE;
	this.position.x = this.START_X;
	this.rotation = 0;
	this.alpha = 1;
	this.fadingIn = false;
	this.blinkCount = 2;
	this.play();

};

Dory.prototype.lostAnimation = function(parent) {

	if(this.blinkCount>=0) {
		if(this.fadingIn) {
			this.alpha += 0.04;
		} else {
			this.alpha -= 0.04;
		}

		if(this.alpha<=0) {
			this.fadingIn = true;
			this.blinkCount--;
		}

		if(this.alpha>=1) {
			this.fadingIn = false;
		}
	} else {
		parent.showScoreboard();
	}

};