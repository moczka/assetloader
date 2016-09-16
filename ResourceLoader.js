var ResourceLoader = (function(){
	
	var totalAssets = 0,
		loadedAssets = 0,
		UserOptions,
		percentageLoaded,
		audioSupport,
		assets = {};
	
		//default options if no option argument is passed by user.
		var defaultOptions = {
					  onload: function(){ 
						console.log('No callback was passed in..');
						},
					  final : function(){
						  console.log('No final function to call was passed in..');
					  },
					 assets : []
					 };
	
	/* Example of options:
	
	{
		assets : {
		
			imgs : {
				//img names with URLs
				bg_black : "assets/img/background.png,
				meteorSprite : "assets/img/meteor.png,
				enemiesSprite : "assets/img/enemies.png,
				enemyShipSprites: "assets/img/enemyShips.png
			},
			sounds : {
				//sounds name with URLs
				soundtrack : ["assets/sounds/player.mp3", "assets/sounds/player.wav"],
				endSound : ["assets/sounds/gameover.mp3", "assets/sounds/gameover.wav"]
			}
		}
			//function that is called on every item loaded
		onload : updateLoaderDisplayer,
			//function that is called once all have loaded
		final : finalFunctionToCall
	}

	*/
		
	function init(options){
		UserOptions = options || defaultOptions;
	}
	
	function download(){
		//return if all assets have already loaded and indexed.
		if(percentageLoaded === 1) return;
		//creates the sound and image elements for each asset in the options argument.
		for(var item in UserOptions.assets.imgs){
			assets[item] = new Image();
			assets[item].src = UserOptions.assets.imgs[item];
			assets[item].addEventListener('load', onLoad, false);
			totalAssets++;
		}
		//arrays are passed for each sound asset containing the source to the sound.
		for(var item in UserOptions.assets.sounds){
			for(var i=0, j=UserOptions.assets.sounds[item].length; i<j; i++){
			var currentSound = UserOptions.assets.sounds[item][i],
				//analyzes the extension and picks the first one that is supported by the browser.
			currentSoundExtension = currentSound.slice(currentSound.length-3, currentSound.length);
				if(isAudioSupport(currentSoundExtension)){
					assets[item] = new Audio();
					assets[item].src = UserOptions.assets.sounds[item][i];
					assets[item].addEventListener('canplaythrough', onLoad, false);
					totalAssets++;
					break;
				}
			}

		}
		
	}
	
	function onLoad(item){
		//increments load count and remove listeners.
		loadedAssets++;
		if(item.target.tagName === "AUDIO"){
			item.target.removeEventListener('canplaythrough', onLoad, false);
		}else{
			item.target.removeEventListener('load', onLoad, false);
		}
		
		var itemLoaded = item.target;
		percentageLoaded = Math.floor((loadedAssets / totalAssets)*100)/100;
				
		if(UserOptions.onload){
			UserOptions.onload(itemLoaded);
		}
		if(loadedAssets >= totalAssets && UserOptions.final){
			UserOptions.final(itemLoaded);
		}
		
	}
	
	function isAudioSupport(extension){
		
		var audio = new Audio();
		var supportValue = audio.canPlayType("audio/"+extension);
		if( supportValue === "maybe" || supportValue === "probably" ){
			return true;
		}else{
			return false;
		}
	}
	
	return {
		init : init,
		assets : assets,
		get loaded(){
			return percentageLoaded;
		},
    	downloadAll : download
	}
	
})();