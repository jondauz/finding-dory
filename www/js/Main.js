GAME_WIDTH = 600;
GAME_HEIGHT = 700;
GAME_MODES =  {
    TITLE : 0,
    PLAY: 1
};

GAME_SIZES = {
    SMALL: {
        WIDTH: 300,
        HEIGHT: 350
    },
    LARGE: {
        WIDTH: 600,
        HEIGHT: 700
    }
};

SCROLL_SPEED = 5;

function Main() {

    var rendererOptions = {
        antialiasing: false,
        transparent: true,
        resolution: window.devicePixelRatio,
        autoResize: true,
    };

    this.container = document.createElement('canvas');
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(GAME_WIDTH, GAME_HEIGHT, rendererOptions);
    this.currentScreen = GAME_MODES.TITLE;

    document.getElementById('game-container').appendChild(this.renderer.view);

    window.addEventListener("resize", this.resize.bind(this));

    var assetsToLoader = ['texture-0.json', 'texture-1.json', '../fonts/font.fnt'];
    loader = PIXI.loader;
    loader.add(assetsToLoader);
    loader.on("progress", this.loadProgress.bind(this));
    loader.once('complete', this.setup.bind(this));
    loader.load();

}

Main.prototype.resize = function() {

    var ratio,
        newWidth,
        newHeight;
    
        ratio = document.getElementById('game-container').offsetWidth/GAME_SIZES.LARGE.WIDTH;
        newWidth = Math.ceil(GAME_SIZES.LARGE.WIDTH * ratio);
        newHeight = Math.ceil(GAME_SIZES.LARGE.HEIGHT * ratio);
   
    this.stage.scale.x = this.stage.scale.y = ratio;
    this.renderer.resize(newWidth, newHeight);

    $('#bkgd-video video').width(newWidth - 1);
    $('#bkgd-video video').height(newHeight - 1);

};

Main.prototype.loadProgress = function(loader, resource) {


    $('.loading .completed').text(Math.round(loader.progress) + "%");
    //Display the file `url` currently being loaded  
    console.log("loading: " + resource.url);
    //Display the precentage of files currently loaded  
    console.log("progress: " + loader.progress + "%");
    //If you gave your files names with the `add` method, you can access  
    console.log("loading: " + resource.name);

};


Main.prototype.update = function() {
    if(this.currentScreen == GAME_MODES.TITLE) {
        this.titleScreen.moveBackground();
    }
    else if(this.currentScreen == GAME_MODES.PLAY) {
        this.playScreen.startGame(SCROLL_SPEED);
    }
  
    requestAnimationFrame(this.update.bind(this));
    this.renderer.render(this.stage);


};

Main.prototype.setup = function() {

    $('.loading .completed').text("100%");
    setTimeout(function(){
        $('.loading').hide();
        $('#game-container, #bkgd-video').css('opacity','1');
        $('html').addClass('game-intialized');
    }, 1000);

    this.resize();

    this.titleScreen = new TitleScreen(this.stage);
    this.playScreen = new PlayScreen(this.stage);

    this.stage.addChild(this.playScreen);

    this.titleScreen.startBtn.on('mousedown', this.start.bind(this));
    this.titleScreen.startBtn.on('touchstart', this.start.bind(this));
    
    requestAnimationFrame(this.update.bind(this));

    this.stage.interactive = true;
    this.stage.on('mousedown', this.userclick.bind(this));
    this.stage.on('touchstart', this.userclick.bind(this));


};

Main.prototype.start = function() {
    this.titleScreen.titleScreen.visible = false;
    this.playScreen.visible = true;
    this.currentScreen = GAME_MODES.PLAY;
};


Main.prototype.userclick = function() {
    this.playScreen.moveDory();
};