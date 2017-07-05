$(document).ready(function (){
    var width = 400;
    var height = 300;
    var localMediaStream = null;
    var video2 = document.getElementById('film')
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

    $('#grabar').click( function(localMediaStream){
        var recordRTC;
        function successCallback(localMediaStream) {
            var options = {
              mimeType: 'video/webm\;codecs=h264',
              audioBitsPerSecond: 128000,
              videoBitsPerSecond: 128000,
              bitsPerSecond: 128000 // if this line is provided, skip above two
            };
            recordRTC = RecordRTC(localMediaStream, options);
            recordRTC.startRecording();
        }

        function errorCallback(error) {
            // maybe another application is using the device
        }

        var mediaConstraints = { video: true, audio: true };

        navigator.mediaDevices.getUserMedia(mediaConstraints).then(successCallback).catch(errorCallback);

        btnStopRecording.onclick = function () {
            recordRTC.stopRecording(function (audioVideoWebMURL) {
                video2.src = audioVideoWebMURL;

                var recordedBlob = recordRTC.getBlob();
                recordRTC.getDataURL(function(dataURL) { });
            });
        };
         
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