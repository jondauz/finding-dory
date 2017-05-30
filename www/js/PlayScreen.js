function PlayScreen(stage) {

	PIXI.Container.call(this);
	this.visible = false;
	this.viewportX = 0;
	this.prevObstacle = null;
	this.obstacleVelocity = GAME_WIDTH/4;

	this.farBackground = new FarBackground();
	this.addChild(this.farBackground);

	this.dory = new Dory();
	this.addChild(this.dory);

	this.obstacles = [];
	this.obstacleIndex = 0;
	this.obstaclesGroup = new PIXI.Container();
	this.addChild(this.obstaclesGroup);

	this.maxObstacles = 5;
	this.obstacleMovement = 4;
	this.addObstacle();

	this.score = 0.00;
	this.scoreText = new PIXI.extras.BitmapText(this.score.toFixed(1), {
		font: '45px font',
		align: 'center'
	});

	this.scoreText.position.x = GAME_WIDTH - this.scoreText.width - 30;
	this.scoreText.position.y = 50;
	this.addChild(this.scoreText);

	this.scoreLabel = new PIXI.Text(gameTextObject.Overall.GameScreen.Meters, {
		font: '300 21px futura-pt',
		fill: 'white',
		align: 'right'
	});

	this.scoreLabel.position.x = GAME_WIDTH - 90;
	this.scoreLabel.position.y = 20;
	this.addChild(this.scoreLabel);

	this.scoreBoard = new ScoreBoard();
	this.scoreBoard.visible = false;
	this.addChild(this.scoreBoard);

	this.scoreBoard.replayBtn.on('mousedown', this.restartGame.bind(this));
	this.scoreBoard.replayBtn.on('touchstart', this.restartGame.bind(this));

	this.scoreBoard.shareFacebook.on('mousedown', this.shareScoreFacebook.bind(this));
	this.scoreBoard.shareFacebook.on('touchstart', this.shareScoreFacebook.bind(this));

	this.scoreBoard.shareTwitter.on('mousedown', this.shareScoreTwitter.bind(this));
	this.scoreBoard.shareTwitter.on('touchstart', this.shareScoreTwitter.bind(this));

	this.wings = new Howl({
        urls: ['../audio/swim.mp3']
    });

	this.hit = new Howl({
        urls: ['../audio/collision.mp3'],
        volume: 0.8
    });

}

PlayScreen.constructor = PlayScreen;
PlayScreen.prototype = Object.create(PIXI.Container.prototype);
PlayScreen.GAME_STARTED = false;
PlayScreen.HitPoint = {
	x: 0,
	y: 0
};

PlayScreen.prototype.startGame = function(scroll_speed) {
	PlayScreen.GAME_STARTED = true;
	if(!this.dory.LOST) {
		this.moveViewportXBy(scroll_speed);
		this.animateDory();
		this.moveObstacles();
	} else {
		//this.dory.rotation+=5;
		//= this.dory.position.y += 10;
		//this.dory.rotation = 5;
		
		// if(this.dory.Rotation > Math.PI/2 && this.dory.position.y >= GAME_HEIGHT) {
		
		// 
		// 	return;
		// }

			// this.dory.anchor.x = 0.5;
			// this.dory.anchor.y =  0.5;

		// this.dory.position.x = PlayScreen.HitPoint.x - this.dory.width/2;
		// this.dory.position.y = PlayScreen.HitPoint.y - this.dory.height/2;
		// if(PlayScreen.HitPoint.y>this.dory.position.y) {
		// 	this.dory.position.y = PlayScreen.HitPoint.y + 20;
		// } else {
		//	this.dory.position.y = PlayScreen.HitPoint.y - 20;
		//}
		this.dory.lostAnimation(this);
		return;

	}
};

PlayScreen.prototype.restartGame = function() {
	this.score = 0.00;
	this.scoreText.text = 0;
	this.dory.reinit();
	this.obstacles = [];
	this.obstacleIndex = 0;
	this.obstacleMovementFreq = 1;
	this.obstacleFrequency = 0;
	this.obstacleMovement = 4;
	this.obstacleVelocity = GAME_WIDTH/4;
	this.obstaclesGroup.removeChildren();
	this.addObstacle();
	this.hideScoreboard();
};

PlayScreen.prototype.setViewportX = function(viewportX) {
	this.viewportX = viewportX;
	this.score = this.score + 0.01;
	this.scoreText.text = this.score.toFixed(1);
	this.scoreText.position.x = GAME_WIDTH - this.scoreText.width - 30;
	if(this.viewportX%1000 === 0) {
		if(this.obstacleMovement<=15) {
			this.obstacleMovement += 0.5;
			this.obstacleVelocity += 25;
		}
	}
	this.farBackground.setViewportX(viewportX);
};

PlayScreen.prototype.getViewportX = function() {
	return this.viewportX;
};

PlayScreen.prototype.moveViewportXBy = function(units) {
	var newViewportX = this.viewportX + units;
	this.setViewportX(newViewportX);
};

PlayScreen.prototype.animateDory = function() {
	this.dory.position.y -= this.dory.speedY;
	this.dory.speedY -= this.dory.rate;
};

PlayScreen.prototype.moveDory = function() {
	if(PlayScreen.GAME_STARTED) {
		if(soundOn) {
			this.wings.play();
		}
		this.dory.move();
	}
};

PlayScreen.prototype.addObstacle = function() {
	var unique = false,
		obstacle;

	while(!unique) {
		obstacle = new Obstacle();
		unique = isUniqueObstacle(obstacle,this.obstacles);
	}

	this.obstaclesGroup.addChild(obstacle);
	this.obstacles.push(obstacle);

	this.obstacleIndex++;
	if(this.obstacleIndex > this.maxObstacles){
		this.obstacles.shift();
		this.obstaclesGroup.removeChildAt(0);
	}

};

function isUniqueObstacle(obstacle, list) {
	for(i=0;i<list.length;i++) {
		if (list[i].type==obstacle.type) {
			return false;
	    } 
	}
	return true;
}

PlayScreen.prototype.moveObstacles = function() {

	for(var i = 0; i < this.obstacles.length; i++){

		var currentObstacle = this.obstacles[i];
		currentObstacle.position.x -= this.obstacleMovement;
		
		if(i == this.obstacles.length - 1 && currentObstacle.position.x + currentObstacle.width < this.obstacleVelocity){
			this.addObstacle();
		}

		//Hit Bottom
		if(this.dory.position.y >= GAME_HEIGHT - this.dory.height + 30) {
			this.dory.LOST = true;
			if(soundOn) {
				this.hit.play();
			}
		}
		// Hit Top
		if(this.dory.position.y <= 0 - this.dory.height/2) {
			this.dory.LOST = true;
			if(soundOn) {
				this.hit.play();
			}
		}

		if (this.dory.x < currentObstacle.x + currentObstacle.width &&
			this.dory.x + this.dory.width > currentObstacle.x &&
			this.dory.y < currentObstacle.y + currentObstacle.height &&
			this.dory.height + this.dory.y > currentObstacle.y) {
    	 	
    	 	this.dory.LOST = this.checkPixelPerfect(this.dory, currentObstacle);
	    	if(soundOn&&this.dory.LOST) {
				this.hit.play();
			}

		}
	}
};

PlayScreen.prototype.checkPixelPerfect = function(rect, poly) {
	
	var points = poly.points.slice(0),
		pixelPerfectHit = false;
		
	while(points.length>0) {
		
		var x = points.shift() + poly.x,
			y = points.shift() + poly.y;

	    if(hitTestPoint({x: x+20, y: y}, this.dory)) {
	    	pixelPerfectHit = true;
	    	PlayScreen.HitPoint.x = x+20;
	    	PlayScreen.HitPoint.y = y;
	    	break;
	    }
	}	

	function hitTestPoint(point, sprite) {

		//xAnchorOffset
		if (sprite.xAnchorOffset === undefined) {
			Object.defineProperty(sprite, "xAnchorOffset", {
				get() {
					if (sprite.anchor !== undefined) {
						return sprite.height * sprite.anchor.x;
					} else {
						return 0;
					}
				},
				enumerable: true, configurable: true
			});
		}

		//yAnchorOffset
		if (sprite.yAnchorOffset === undefined) {
			Object.defineProperty(sprite, "yAnchorOffset", {
			  get(){
			    if (sprite.anchor !== undefined) {
			      return sprite.width * sprite.anchor.y;
			    } else {
			      return 0;
			    }
			  },
			  enumerable: true, configurable: true
			});
		}

		//Get the position of the sprite's edges
		var left = sprite.x - sprite.xAnchorOffset,
			right = sprite.x + sprite.width - sprite.xAnchorOffset,
			top = sprite.y - sprite.yAnchorOffset,
			bottom = sprite.y + sprite.height - sprite.yAnchorOffset;

		//Find out if the point is intersecting the rectangle
		hit = point.x > left && point.x < right && point.y > top && point.y < bottom;

	    //`hit` will be either `true` or `false`
	    return hit;
	}
	
	return pixelPerfectHit;

};

PlayScreen.prototype.showScoreboard = function() {
	this.scoreText.visible = false;
	this.scoreLabel.visible = false;
	this.scoreBoard.show(this.score);
};

PlayScreen.prototype.hideScoreboard = function() {
	this.scoreText.visible = true;
	this.scoreLabel.visible = true;
	this.scoreBoard.hide();
};

PlayScreen.prototype.shareScoreFacebook = function() {	
	var width = 550,
		height = 420,
		winHeight = screen.height,
		winWidth = screen.width,
		left = Math.round((winWidth / 2) - (width / 2)),
		top = Math.round((winHeight / 2) - (height / 2)),
		shareImg = window.location.protocol + '//' + window.location.host + '/images/game/share-image.jpg',
		url = 'https://www.facebook.com/dialog/feed?app_id=1548928435401945&link=http%3A%2F%2Fdorykeepsswimming.com&name=Disney%2FPixar%27s%20Dory%20Keeps%20Swimming&caption=Click%20to%20play%20now&description='+gameTextObject.Overall.ScoreScreen.ShareText+' '+this.score.toFixed(1)+' '+String(gameTextObject.Overall.ScoreScreen.Meters).toLowerCase()+' '+gameTextObject.Overall.ScoreScreen.AfterText+' '+gameTextObject.Overall.ScoreScreen.SharingURL+' '+'&redirect_uri=http://www.facebook.com&picture='+shareImg;
	
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
  	if (!iOS) {
		window.open(url, 'share', 'scrollbars=yes,resizable=yes,toolbar=no,location=yes, width='+width+', height='+height+',left=' + left + ',top=' + top);
  	} else {
		window.location = url;
	}
};

PlayScreen.prototype.shareScoreTwitter = function() {
	var width = 550,
      height = 420,
      winHeight = screen.height,
      winWidth = screen.width,
      left = Math.round((winWidth / 2) - (width / 2)),
      top = Math.round((winHeight / 2) - (height / 2)),
      url = 'https://twitter.com/intent/tweet?text='+gameTextObject.Overall.ScoreScreen.ShareText+' '+this.score.toFixed(1)+' '+String(gameTextObject.Overall.ScoreScreen.Meters).toLowerCase()+''+String(gameTextObject.Overall.ScoreScreen.AfterText).toLowerCase()+''+gameTextObject.Overall.ScoreScreen.SharingURL+'';

    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
  	if (!iOS) {
		window.open(url, 'intent', 'scrollbars=yes,resizable=yes,toolbar=no,location=yes, width='+width+', height='+height+',left=' + left + ',top=' + top);
	} else {
		window.location = url;
	}
};