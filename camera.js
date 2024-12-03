// grab camera icon
let camIcon = document.querySelector('.camera')
let videoSnap
let canvassOverlay
let snapIcon
let snappedImage
let snappedVideo
let recordVideo
let vidNum = 1

// For video recording
let stream
let mediaRecord 
let recordedBits = []

let galleryStore = JSON.parse(localStorage.getItem('gallery-sources')) || []

camIcon.onclick = ()=>{
    
    displayAll.innerHTML = `<div class="the-container d-flex flex-column justify-content-start rounded-3">
    <video id="video" class= "border bg-light" autoplay style="width: 550px; height: 600px; margin-left: -150px;"> </video>
    <canvas id="overlay" class="border border-info" width="550px" height="600px" style="display: none"></canvas>
    
    <!-- Control Buttons -->
    <div id="controls" class="w-100 ps-2 bg-black d-flex flex-row justify-content-evenly align-items-center gap-5 opacity-75" style="height: 15%;">
        <img id="snappedImage" class="border border light" width="45px" height="40px">
        <video id='snappedVideo' class="border border light" width="45px" height="40px" style="display: none;"></video>
        <button id="snap" class="bg-transparent outline-0 border-0" style='margin-right: -40px' onclick='snap()' >
            <img src='cameraSnap-removebg-preview.png' class='' style="height: 50px">
        </button>
        <button id="record" class="bg-transparent outline-0 border-0 h-75" onclick="captureVideo()" style="margin-left: 37px">
            <img src="recordVid-removebg-preview.png" class="h-100">
        </button>
        
    </div>

    <div>`

    displayOtherPages()

    setupCamera()
    snapIcon = document.getElementById('snap')
    snappedImage = document.getElementById('snappedImage')
    snappedVideo = document.getElementById('snappedVideo')
    recordVideo = document.getElementById('record')
}

// Let camera have access to user's camera imediately
    async function setupCamera() {
        // Grab video and 
        videoSnap = document.getElementById('video');
        canvassOverlay = document.getElementById('overlay');

        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
        videoSnap.srcObject = stream;
        videoSnap.muted = true

    }

    // Snap using the snap button
    function snap() {
        // canvassOverlay.style.display = 'block'
        const snapCtx = canvassOverlay.getContext('2d');
        snapCtx.drawImage(videoSnap, 0, 0, canvassOverlay.width, canvassOverlay.height);
        const imageURL = canvassOverlay.toDataURL("image/png");
        snappedImage.src = imageURL;
        
        let imgObj = {imageURL};
        galleryStore.push(imgObj)
        
        localStorage.setItem('gallery-sources', JSON.stringify(galleryStore))
    }

    // Writing functionality to record video and display in display-bar
    async function captureVideo(){
        try{
        videoSnap.muted = false;
        await videoSnap.play()
        // get user media using navigator
        const stopButton = `<img src="stop-vector-icon-png_256694-removebg-preview.png" class="h-100">`
        if (recordVideo.innerHTML === stopButton){
            mediaRecord.stop()
            mediaRecord.onstop = () => {
                vidNum++
                const videoBlob = new Blob(recordedBits, { type: 'video/webm' });
                const videoURL = URL.createObjectURL(videoBlob);
                snappedImage.style.display = 'none';
                snappedVideo.style.display = 'block';
                snappedVideo.src = videoURL;

                let fileName = `video-file${vidNum}.webm`;
                saveAs(videoBlob, fileName);
  
                recordVideo.innerHTML = `<img src="recordVid-removebg-preview.png" class="h-100">`
                snapIcon.disabled = false;
                recordedBits = [];
              };
        }
        mediaRecord = new MediaRecorder(stream);
        mediaRecord.ondataavailable = (event) => {
        recordedBits.push(event.data);     
        };
        mediaRecord.start();
        recordVideo.innerHTML = stopButton
        snapIcon.disabled = true;
    } catch (error){
        alert('error loading video')
    }
}
