videojs.registerPlugin('autoLanguage', function() {
    var trPlayer = this;

    trPlayer.on("loadedmetadata", function () {
      
        // +++ Get the browser language +++
        var browser_language = navigator.language || navigator.userLanguage; // IE <= 10;
        browser_language = browser_language.substr(0, 2);
        
		//window.alert (browser_language);
        
		// +++ Get the captions and audio Tracks +++
        var track_language;
        var tracks = trPlayer.textTracks();
		var audioTracks = trPlayer.audioTracks();
		
        // +++ Loop through captions +++
        for (var i = 0; i < (tracks.length); i++) {
            track_language = tracks[i].language.substr(0, 2);
        	  
		// +++ Set the default caption/audio language +++
            // When the caption language equals the browser language, then set it as default
            if (track_language) {
                if (track_language === browser_language) {
                    tracks[i].mode = "showing";
                } else {
                    tracks[i].mode = "disabled";
                }
            }
        }
		// +++ Loop through audio tracks +++
		for (var i = 0; i < (audioTracks.length); i++) {
		  track_language = audioTracks[i].language.substr(0, 2);

		  // +++ Set the enabled audio track language +++
		  if (track_language) {
			// When the track language matches the browser language, then enable that audio track
			if (track_language === browser_language) {
			  // When one audio track is enabled, others are automatically disabled
			  audioTracks[i].enabled = true;
			}
		  }
		}		
    });
});