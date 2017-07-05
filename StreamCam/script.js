(function (){
    var video = document.getElementById('cam'), 
        vendorURL = window.URL || window.webKitURL;
    navigator.getMedia = navigator.getUserMedia || 
                        navigator.webkitUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.msGetUserMedia;
    
    navigator.getMedia({
        video:true,
        audio: false
    }, function(remoteStream){
        video.src = window.URL.createObjectURL( remoteStream );
        video.play();
        //video.src = vendorURL.createObjectURL(stream);
        //video.play();
    }, function(error){
        //Code error
    });
})();