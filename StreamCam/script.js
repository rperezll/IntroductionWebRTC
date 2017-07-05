$(document).ready(function (){
    
    var width = 400;
    var height = 300;
    var localMediaStream = null;
    var video = document.getElementById('cam'), 
        vendorURL = window.URL || window.webKitURL;
    navigator.getMedia = navigator.getUserMedia || 
                        navigator.webkitUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    $('#snapshot').click( function(){
        //console.log("funciona");
		if (localMediaStream!=null) {
            canvas.getContext('2d').drawImage(video, 0, 0, width, height);
            document.querySelector('img').src = canvas.toDataURL('image/png');
        }
	});

    $('#grabar').click( function(stream){
        
        
	});

    navigator.getMedia({
        video:true,
        audio: false
    }, function(remoteStream){
        video.src = window.URL.createObjectURL( remoteStream );
        localMediaStream = remoteStream;
        video.play();
    }, function(error){
        //Code error
    });

});