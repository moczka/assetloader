window.onload = function(){
	initApp();
}
function initApp(){
	var statusBar = document.getElementById('statusBar'),
		loadButton = document.getElementById('loadAssets'),
		maxWidth = 300;

	var loaderOptions = {
		assets : {
			imgs : {
				bg : "assets/sprites/background.png",
				enemy_ships : "assets/sprites/enemyShips.png",
				meteorSprite : "assets/sprites/meteorSprite.png",
				mothershipSprite : "assets/sprites/motherships.png"
			},
			sounds : {
				shoot: {src: ["assets/sounds/shoot.wav", "assets/sounds/shoot.mp3"]},
				soundTrack : { src: ["assets/sounds/soundtrack.wav", "assets/sounds/soundtrack.mp3"]},
				perk : {src: ["assets/sounds/perk.mp3", "assets/sounds/perk.wav"]},
				victory : {src: ["assets/sounds/victory.mp3", "assets/sounds/victory.wav"]}
			}
		},
        useHowl: true,
		onload : updateStatus,
		final : finalCall
	}
    
    window.hello = new Howl({src : ["assets/sounds/shoot.wav", "assets/sounds/shoot.mp3"]});
    console.log(hello);
    
    hello.play();
	
	ResourceLoader.init(loaderOptions);
	
	loadButton.onclick = function(e){
        loadButton.innerHTML = "Loading";
		ResourceLoader.downloadAll();
	};
	
	function updateStatus(e){
		var currentWidth = Math.floor(maxWidth*ResourceLoader.loaded);
		statusBar.setAttribute('style', 'width: '+currentWidth+'px;');
		console.log('1 asset has loaded');
        console.log(e.src);
        console.log(e);
	}
	function finalCall(){
		loadButton.disabled = true;
		loadButton.innerHTML = "Loaded";
		console.log('all assets have loaded');
	}
}