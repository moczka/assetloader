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
				shoot: ["assets/sounds/shoot.wav", "assets/sounds/shoot.mp3"],
				soundTrack : ["assets/sounds/soundtrack.wav", "assets/sounds/soundtrack.mp3"],
				perk : ["assets/sounds/perk.mp3", "assets/sounds/perk.wav"],
				victory : ["assets/sounds/victory.wav", "assets/sounds/victory.mp3"]
			}
		},
		onload : updateStatus,
		final : finalCall
	}
	
	ResourceLoader.init(loaderOptions);
	
	loadButton.onclick = function(e){
		ResourceLoader.downloadAll();
	};
	
	function updateStatus(){
		var currentWidth = Math.floor(maxWidth*ResourceLoader.loaded);
		statusBar.setAttribute('style', 'width: '+currentWidth+'px;');
		console.log('1 asset has loaded');
	}
	function finalCall(){
		loadButton.disabled = true;
		loadButton.innerHTML = "Loaded";
		console.log('all assets have loaded');
	}
}