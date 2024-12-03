let gameIcon = document.getElementById('game-icon')
let sound = false
let bubbleDiv
let bubbleChildren
let scoreBoard = 0
let audioBeep
let stopGame = false
let bubbleCount 
let consecutiveElements = []
let consecutiveCount = 0

// Write a function that displays loading
function loading(){
    displayAll.innerHTML = `
    <div class="d-flex flex-column justify-content-center align-items-center gap-3 w-100 h-100">
    <div class="spinner-border text-info" role="status" aria-hidden="true"></div>
    <div class='text-warning'>Loading...</div>
    </div>`
}

function backButtonWar() {
    displayAll.innerHTML = `<div class='w-100 h-100 p-2'>
                                    <div class="games border-bottom border-warning text-info px-2 py-2 mt-5" onclick='displayWarday()'> Blobby </div>
                                    <div class="games border-bottom border-warning text-info px-2 py-2 mt-1" onclick='displayBlobby()'> War Head </div>
                                </div>`
}
gameIcon.onclick = ()=>{
    displayOtherPages()
    displayAll.style.backgroundColor = 'black'
    loading()
    setTimeout(() => {
        backButtonWar();
    }, 2000);
}

// The shapes of the balls are randomly selected
let bubbleShape = ['circle', 'square', 'oval']
let bubbleColor = ['blue', 'red', 'yellow', 'green']

let bubbleCollection = []

// Create an array of objects
function createBubbles(){
    for (let i= 1; i<=35; i++){
       let randomShape = bubbleShape[Math.floor(Math.random()* (bubbleShape.length))]
       let randmColor = bubbleColor[Math.floor(Math.random()* (bubbleColor.length))];
        let bubbleObj  = {
            color: randmColor,
            shape: randomShape
        }
        bubbleCollection.push(bubbleObj)
        
    }
    bubbleCollection.forEach((bub, i)=>{
        let bubble = document.createElement('div')
        bubble.classList.add('bubble', `${bub.color}`, `${bub.shape}`)
        bubbleDiv.appendChild(bubble)
        bubbleCount = bubbleCollection.length
    })
}

// Function that makes each shape disappear after click and makes a blip sound

function burstBubble (){    
    for (const child of bubbleDiv.children){
        child.onclick = ()=>{
                if (!sound) {
                    audioBeep.loop = false
                    audioBeep.play()
                }
            
            setTimeout(() => {
                bubbleCount --
                bubbleDiv.removeChild(child)
                scoreBoard += 2;
            document.getElementById('score').innerText = scoreBoard;
            }, 200);
            
            
        }
    }
}

let displayWar = `<div class='w-100 h-100'>
                                    <div class="games-header w-100 mt-1 px-2 d-flex flex-row justify-content-between align-items-center" style="height: 7%; background-color:  rgba(111, 250, 238, 0.685);">
                                        <div onclick="backBeep()"><i class="fa-solid fa-caret-left text-dark"></i></div>
                                        <div class="h-75" style="">
                                            <button class="bg-transparent play"> <i class="fa-solid fa-circle-pause"></i> </button>
                                            <button class="bg-transparent volume" onclick="noSound()"> <i class="fa-solid fa-volume-xmark"></i> </button>
                                            <span id="scoreDiv">score: <span id="score"> 0 </span></span>
                                        </div>
                                    </div>
                                    <div class="game-container w-100 overflow-hidden" style="height: 81%">
                                        <div class="w-100 h-100 bubble-container pb-2">

                                        </div>
                                    </div>
                                    <div class="w-100" style="height: 12%;  background-color: rgba(111, 250, 238, 0.685);"></div>
                                    <audio id="audio-play" loop></audio>
                                    <audio id="explode" src = 'explosion-42132.mp3'></audio>
                                    <audio id="beep" src ='blip-131856.mp3'></audio>
                                </div>`

function displayWarday() {
    loading();
    setTimeout(() => {
        stopGame = false
        displayAll.innerHTML = displayWar

                                bubbleDiv = document.querySelector('.bubble-container')
                                audioPlay = document.getElementById('audio-play')
                                audioBeep = document.getElementById('beep')
                                let explode = document.getElementById('explode')
                                playSound('video-game-boss-fiight-259885.mp3')
                                createBubbles()
                                setInterval(() => {
                                    burstBubble()
                                    new Bubble(`${bubbleShape[Math.floor(Math.random()* (bubbleShape.length))]}`, `${bubbleColor[Math.floor(Math.random()* (bubbleColor.length))]}`).addBubble()
                                }, 1000);
                                
                                setInterval(() => {
                                    blowBubble('red', 'square')
                                    blowBubble('green', 'square')
                                    blowBubble('yellow', 'square')
                                    blowBubble('blue', 'square')
                                    blowBubble('red', 'circle')
                                    blowBubble('green', 'circle')
                                    blowBubble('yellow', 'circle')
                                    blowBubble('blue', 'circle')
                                    blowBubble('red', 'oval')
                                    blowBubble('green', 'oval')
                                    blowBubble('yellow', 'oval')
                                    blowBubble('blue', 'oval')
                               }, 3500); 

                                setInterval(() => {
                                    if (bubbleCount > 131 && stopGame){
                                            displayAll.style.display = 'flex'
                                            displayAll.style.flexDirection = 'column'
                                            displayAll.style.justifyContent = 'center'
                                            displayAll.style.alignItems = 'center'
                                            displayAll.innerHTML = `<div style="color: white; font-size: large;">
                                                                Game Over
                                            </div>
                                            <div style="color: white; font-size: small">Your score is ${scoreBoard}</div>
                                            <div class="mt-4"><button onclick='replay()'> Replay </button>
                                            <button onclick='backHome()'> Home </button>
                                            </div>
                                            `

                                            stopGame = false
                                            
                                            return
                                        }
                                   }, 3000);
                                
                               
    }, 2000);
    
}

function playSound(soundSrc, vol= 0.9) {
    audioPlay.src= soundSrc;
    audioPlay.load();
    audioPlay.play();
    setTimeout(() => {
        audioPlay.pause();
    }, 10000);
    audioPlay.volume = vol;
}

function beep() {
    playSound('beep-125033.mp3');
    audioPlay.loop = false;
}

function backBeep() {
    beep()
    setTimeout(() => {
        backButtonWar()
    }, 1000);
}

function noSound() {
    sound = !sound
    if (sound) {
    beep()
    document.querySelector('.volume').innerHTML = '<i class="fa-solid fa-volume-high"></i>'
    audioPlay.volume = 0;
    return
}
    beep()
    setTimeout(() => {
        playSound('video-game-boss-fiight-259885.mp3', 0.9)
    }, 1000);
    document.querySelector('.volume').innerHTML = '<i class="fa-solid fa-volume-xmark"></i>'
    }
    

    // Create a class that adds a new bubble instance every second

    class Bubble {
        constructor(color, shape){
            this.color = color,
            this.shape = shape
        }

    addBubble() {
        if (bubbleCount === 132){
            stopGame = true
            return
        }
            let objBubble = document.createElement('div')
            objBubble.classList.add(this.color, this.shape, 'bubble')
            bubbleDiv.appendChild(objBubble)
            bubbleCount++ 
        }
    }

    // Function that blows bubbles with same shape and color and assign score
    
    function blowBubble(myColor, myShape){
       
        for (const child of bubbleDiv.children){
            if (child.classList.contains(myColor) && child.classList.contains(myShape)) {
                consecutiveCount++;
                consecutiveElements.push(child); // Add matching element to the list
            } else {
                if (consecutiveCount > 2) {
                    explode.volume = 0.5
                    explode.play()
                    bubbleCount -= consecutiveCount
                    
                // Change the background color of all stored elements
               
                    consecutiveElements.forEach((el) => {
                    el.classList.add('shake')
                    setTimeout(() => {
                        document.querySelector('.bubble-container').removeChild(el);
                    }, 200);
                });
                    scoreBoard += 10 * consecutiveCount
                    document.getElementById('score').innerText = scoreBoard
               
                
                
            }
            // Reset count and elements list
            consecutiveCount = 0;
            consecutiveElements = [];
        }
    }
    }
    
   function replay() {
        loading()
        setTimeout(() => {
            backButtonWar()
        }, 2000);
        scoreBoard = 0;
        bubbleCount = 0;
   }

   function backHome() {
        displayHome();
   }
   
