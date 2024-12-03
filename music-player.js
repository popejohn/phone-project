let homer = document.querySelector('.home-page')
let displayIndex = 0
let myArray = []
let audio
let video
let volUp = document.getElementById('vol-up')
let volDown = document.getElementById('vol-down')
let volume = 0.5
let players = document.querySelectorAll('.music-logo')
const volumestep = 0.1
// Add event listener to each music logo in players
players.forEach((player)=>{
    player.addEventListener('click', ()=>{
        fetch('http://localhost:3000/mediaDetails').then((res)=> res.json()).then((data) => {
            myArray = data
            playerDisplay()
          }).catch((err)=>{
            alert(err)
          })
    })
})

function playerDisplay(){
      displayAll.innerHTML =  `<div class="w-100 h-100">
        <div class="player d-flex flex-column justify-content-start align-items-center ">
          <div class="top">
            <p class="indicator">PLAYING NOW</p>
          </div>
        <div class= "d-flex flex-column justify-content-center align-items-center center-desc">
            <div class="center" id='video-contain'>
                <img class="album" src="${myArray[displayIndex].posterUrl}">
            </div>
            
            <div class="song_details mt-4">
            <div style="font-size: small;">${myArray[displayIndex].Title}</div>
            <div style="font-size: x-small;">${myArray[displayIndex]["Artist or Producer"]}</div>
            </div>
            
        </div>

          

          <div class="slider">
            
              <input type='range' min='0' max='100' value='0' class="inner_slider_bar" id='innerSlider'></input>
            

          </div>

          <div class="controls position-relative">
            <button class="big me-3" onclick='prev()'>
              <div class="inner_button_big">
                <img style="height: 15px; transform: scale(-1);" src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDQ4IDQ0OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ4IDQ0ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIj48Zz48cGF0aCBkPSJNNDM5Ljg0LDIxMC4wNDJsLTI1Ni0xNDRjLTQuOTI4LTIuNzUyLTExLjAwOC0yLjcyLTE1LjkwNCwwLjEyOFMxNjAsNzQuMjk4LDE2MCw3OS45OTR2NjIuNTkyTDIzLjg0LDY2LjA0MiAgYy00Ljk2LTIuNzg0LTExLjAwOC0yLjcyLTE1LjkzNiwwLjEyOEMzLjAwOCw2OS4wNSwwLDc0LjI5OCwwLDc5Ljk5NHYyODhjMCw1LjY5NiwzLjAwOCwxMC45NDQsNy45MDQsMTMuODI0ICBjMi40OTYsMS40NCw1LjMxMiwyLjE3Niw4LjA5NiwyLjE3NmMyLjY4OCwwLDUuNDA4LTAuNjcyLDcuODQtMi4wNDhMMTYwLDMwNS40MDJ2NjIuNTkyYzAsNS42OTYsMy4wNCwxMC45NDQsNy45MzYsMTMuODI0ICBzMTAuOTc2LDIuOTEyLDE1LjkwNCwwLjEyOGwyNTYtMTQ0YzUuMDI0LTIuODQ4LDguMTYtOC4xNiw4LjE2LTEzLjk1MlM0NDQuODY0LDIxMi44OSw0MzkuODQsMjEwLjA0MnoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6Izg0ODc4QSIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD48L2c+IDwvc3ZnPg==">
              </div>
            </button>
            <button class="big_play_pause" onclick="playPause()">
              <div id="audio-contain">
                <audio id=audioFile draggable ></audio>
              </div>
              <div class="playpause">
                <img id="play-pause" style="height: 15px;" src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMzIwLjAwMSAzMjAuMDAxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMjAuMDAxIDMyMC4wMDE7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGc+PHBhdGggZD0iTTI5NS44NCwxNDYuMDQ5bC0yNTYtMTQ0Yy00Ljk2LTIuNzg0LTExLjAwOC0yLjcyLTE1LjkwNCwwLjEyOEMxOS4wMDgsNS4wNTcsMTYsMTAuMzA1LDE2LDE2LjAwMXYyODggIGMwLDUuNjk2LDMuMDA4LDEwLjk0NCw3LjkzNiwxMy44MjRjMi40OTYsMS40NCw1LjI4LDIuMTc2LDguMDY0LDIuMTc2YzIuNjg4LDAsNS40MDgtMC42NzIsNy44NC0yLjA0OGwyNTYtMTQ0ICBjNS4wMjQtMi44NDgsOC4xNi04LjE2LDguMTYtMTMuOTUyUzMwMC44NjQsMTQ4Ljg5NywyOTUuODQsMTQ2LjA0OXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD48L2c+IDwvc3ZnPg==">
              </div>
            </button>
            <button class="big ms-3" onclick="next()">
              <div class="inner_button_big">
                <img style="height: 15px;" src="data:image/svg+xml;base64,
PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDQ4IDQ0OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ4IDQ0ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIj48Zz48cGF0aCBkPSJNNDM5Ljg0LDIxMC4wNDJsLTI1Ni0xNDRjLTQuOTI4LTIuNzUyLTExLjAwOC0yLjcyLTE1LjkwNCwwLjEyOFMxNjAsNzQuMjk4LDE2MCw3OS45OTR2NjIuNTkyTDIzLjg0LDY2LjA0MiAgYy00Ljk2LTIuNzg0LTExLjAwOC0yLjcyLTE1LjkzNiwwLjEyOEMzLjAwOCw2OS4wNSwwLDc0LjI5OCwwLDc5Ljk5NHYyODhjMCw1LjY5NiwzLjAwOCwxMC45NDQsNy45MDQsMTMuODI0ICBjMi40OTYsMS40NCw1LjMxMiwyLjE3Niw4LjA5NiwyLjE3NmMyLjY4OCwwLDUuNDA4LTAuNjcyLDcuODQtMi4wNDhMMTYwLDMwNS40MDJ2NjIuNTkyYzAsNS42OTYsMy4wNCwxMC45NDQsNy45MzYsMTMuODI0ICBzMTAuOTc2LDIuOTEyLDE1LjkwNCwwLjEyOGwyNTYtMTQ0YzUuMDI0LTIuODQ4LDguMTYtOC4xNiw4LjE2LTEzLjk1MlM0NDQuODY0LDIxMi44OSw0MzkuODQsMjEwLjA0MnoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6Izg0ODc4QSIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD48L2c+IDwvc3ZnPg==">
              </div>
            </button>
            <div class="position-absolute volume-indicator">
          </div>

        </div>
      </div>
      `
      displayOtherPages()

      audio = document.getElementById('audioFile')
      audio.volume = volume
      let volIndic = document.querySelector('.volume-indicator')
      volIndic.style.height = `${volume * 50}px`
      volUp.addEventListener('click', ()=>{
        if (volume > 0.9) {
          return
        }
          volume += volumestep
          volIndic.style.height = `${volume * 50}px`
          audio.volume = volume
          
      })

      volDown.addEventListener('click', ()=>{
        if (volume <= 0.1) {
          return
        }
          volume -= volumestep
          volIndic.style.height = `${volume * 50}px`
          audio.volume = volume
          
        
      })
      if (myArray[displayIndex].mediaTypeValue === 'audio') {
        audio.src = myArray[displayIndex].mediaUrl
        audio.load()
 
        audio.currentTime = 0
        // Load new audio source
        // Reset audio playback position
      }else{
        document.getElementById('video-contain').innerHTML = `<video id='videoFile' style="width: 300px; height: 250px"></video>`
        video = document.getElementById('videoFile')
        video.src = myArray[displayIndex].mediaUrl
        video.load()

        video.currentTime = 0
      }
      
      audio.addEventListener('ended', ()=>{
        next()
      })
}


function mediaPlayer(){
  
    playerDisplay();
    
    lastVisited = 'media'
    localStorage.setItem('last-visited', JSON.stringify(lastVisited))

    
}



function next() {
  displayIndex = (displayIndex + 1) % myArray.length
    playerDisplay()
    slide()
    if (myArray[displayIndex].mediaTypeValue === 'video') {
      video.play()
      document.getElementById('play-pause').src = 'pause-removebg-preview.png'
      return
    }
    audio.play()
    document.getElementById('play-pause').src = 'pause-removebg-preview.png'

}

function prev() {
  displayIndex = displayIndex = (displayIndex - 1 + myArray.length) % myArray.length;

    playerDisplay()

    slide()

    if (myArray[displayIndex].mediaTypeValue === 'video') {
      video.play()
      document.getElementById('play-pause').src = 'pause-removebg-preview.png'
      return
    }
    audio.play()
    document.getElementById('play-pause').src = 'pause-removebg-preview.png'

}

function slide() {
  let innerSlider = document.getElementById('innerSlider')
  
  if (audio) {
    innerSlider.addEventListener('input', () => {
      audio.currentTime = innerSlider.value * audio.duration / 100;
      });
      
      // Update seek slider on audio progress
      audio.addEventListener('timeupdate', () => {innerSlider.value = (audio.currentTime /
      audio.duration) * 100; })
  }else{
    innerSlider.addEventListener('input', () => {
      video.currentTime = innerSlider.value * video.duration / 100;
      });
      
      // Update seek slider on video progress
      video.addEventListener('timeupdate', () => {innerSlider.value = (video.currentTime /
      video.duration) * 100; })
  
  }
}


function playPause() {
  slide()
    
  if (audio && audio.paused === true ) {
    audio.play()
    document.getElementById('play-pause').src = 'pause-removebg-preview.png'
  }else if (audio && audio.paused === false){
    audio.pause()
    document.getElementById('play-pause').src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMzIwLjAwMSAzMjAuMDAxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMjAuMDAxIDMyMC4wMDE7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGc+PHBhdGggZD0iTTI5NS44NCwxNDYuMDQ5bC0yNTYtMTQ0Yy00Ljk2LTIuNzg0LTExLjAwOC0yLjcyLTE1LjkwNCwwLjEyOEMxOS4wMDgsNS4wNTcsMTYsMTAuMzA1LDE2LDE2LjAwMXYyODggIGMwLDUuNjk2LDMuMDA4LDEwLjk0NCw3LjkzNiwxMy44MjRjMi40OTYsMS40NCw1LjI4LDIuMTc2LDguMDY0LDIuMTc2YzIuNjg4LDAsNS40MDgtMC42NzIsNy44NC0yLjA0OGwyNTYtMTQ0ICBjNS4wMjQtMi44NDgsOC4xNi04LjE2LDguMTYtMTMuOTUyUzMwMC44NjQsMTQ4Ljg5NywyOTUuODQsMTQ2LjA0OXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD48L2c+IDwvc3ZnPg=='
  }else if(video && video.paused){
    video.play()
    document.getElementById('play-pause').src = 'pause-removebg-preview.png'
  }else{
    video.pause()
    document.getElementById('play-pause').src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMzIwLjAwMSAzMjAuMDAxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMjAuMDAxIDMyMC4wMDE7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGc+PHBhdGggZD0iTTI5NS44NCwxNDYuMDQ5bC0yNTYtMTQ0Yy00Ljk2LTIuNzg0LTExLjAwOC0yLjcyLTE1LjkwNCwwLjEyOEMxOS4wMDgsNS4wNTcsMTYsMTAuMzA1LDE2LDE2LjAwMXYyODggIGMwLDUuNjk2LDMuMDA4LDEwLjk0NCw3LjkzNiwxMy44MjRjMi40OTYsMS40NCw1LjI4LDIuMTc2LDguMDY0LDIuMTc2YzIuNjg4LDAsNS40MDgtMC42NzIsNy44NC0yLjA0OGwyNTYtMTQ0ICBjNS4wMjQtMi44NDgsOC4xNi04LjE2LDguMTYtMTMuOTUyUzMwMC44NjQsMTQ4Ljg5NywyOTUuODQsMTQ2LjA0OXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6I0ZGRkZGRiIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD48L2c+IDwvc3ZnPg=='
  }
  
}


