# assetloader
Created this little module that will allow you to load graphic and sound assets for your game or application.


Go to https://rawgit.com/moczka/assetloader/master/index.html for a DEMO:

Sample of loader options:


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


Set Up Options Object

In order to start using this module to load all your audio and graphic assets for your projects, you will first need to create an object literal containing all the necessary information such as callback function, asset names and sources and final callback function. Check the code above for an example of this options object. IMPORTANT!: for audio files, you will need to declare your source files in an array given the fact that not all audio file format are supported by all browsers, the module will pick the first supported file format from this array, so make sure to organize them in order of preference.

			
.../
assets : {
		../
		sounds : {
			shoot: ["assets/sounds/shoot.mp3", "assets/sounds/shoot.wav"],
			soundTrack : ["assets/sounds/soundtrack.mp3", "assets/sounds/soundtrack.wav"],
		}
			
		
For graphic files, you can specify the source directly onto the property name of the asset. Make sure to declare your image assets under the imgs : {} object and for the audio under sounds : {} object.

If you want a function to be called everytime an asset is loaded, set the onload : callbackFunction property to your callback function, an argument will be passed with the element that was loaded.

For the final call, once all your assets have loaded, you can set the final callback function to the final : finalCallback property in your options object. Once your options folder is ready is time to initialize the module.

How To Initialize Module

Initializing the module is very simple, all you do is call the ResourceLoader.init(options) method in your module and pass in your options object literal. IMPORTANT!: You should only initialize your module once!

Initialize Download/Load of Assets

Once you have initialized your module with the desired options, it is time to tell your module to initialize downloading and loading all the assets, call the ResourceLoader.downloadAll() method to perform this operation. This will start calling your callbacks everytime an asset is loaded and call your final callback function once it is done loading all the files.

How To Access Assets:

You can access assets by using the name of the module as the namespace followed by the dot operator (.assets) and then the name of your asset. Of course, if your asset is an audio file, you can use the built in method of .play() to playback the audio file.

For example, you can access the background image named "bg" in the module like so:
ResourceLoader.assets.bg you can also assets and play an audio file like so ResourceLoader.assets.shoot(); try this in your console, the ResourceLoader is a property of the window object and you should be able to play that audio file.

As you can see by the loading bar above, you can have a callback function be called everytime an element is loaded. Once all assets have loaded, your final callback function will be called. You can access the percentage of loaded assets by reading the ResourceLoader.loaded property which returns a decil representing the ammount of assets loaded (0.5 half of all assets). This property is useful for creating loading bars like the one above, this property is a getter so it is always updated.