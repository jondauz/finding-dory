function Button(stage, text) {

	var texture_array = [
		PIXI.Texture.fromFrame("button"),
		PIXI.Texture.fromFrame("button-hover")
	];

	PIXI.extras.MovieClip.call(this, texture_array);
	
	this.interactive = true;
	this.position.x = 0;
	this.position.y = 0;

	var buttonText = new PIXI.Text(text, { 
		font: '700 21px futura-pt', 
		fill: '#6fc3f3', 
		align: 'center'
	});  

	buttonText.position.x = this.width/2 - buttonText.width/2;
	buttonText.position.y = (this.height/2 - buttonText.height/2);
	this.addChild(buttonText);

	var leftCircle = new PIXI.Graphics();
	leftCircle.beginFill(0x047eb0);
 	leftCircle.drawCircle((this.width/2 - buttonText.width/2) - 10, this.height/2 - 1.5, 3);
 	leftCircle.visible = false;
	this.addChild(leftCircle);

	var rightCircle = new PIXI.Graphics();
	rightCircle.beginFill(0x047eb0);
 	rightCircle.drawCircle((this.width/2 + buttonText.width/2) + 10, this.height/2 - 1.5, 3);
 	rightCircle.visible = false;
	this.addChild(rightCircle);

	this.on('mouseover', function(){
        this.gotoAndStop(1);
        buttonText.style = {
        	font: '700 21px futura-pt', 
			fill:'#047eb0',
			align: 'center'
    	};
    	leftCircle.visible = true;
    	rightCircle.visible = true;
    });

    this.on('mouseout', function(){
        this.gotoAndStop(0);
        buttonText.style = {
        	font: '700 21px futura-pt', 
			fill:'#6fc3f3',
			align: 'center'
    	};
    	leftCircle.visible = false;
    	rightCircle.visible = false;
    });

}

Button.constructor = Button;
Button.prototype = Object.create(PIXI.extras.MovieClip.prototype);