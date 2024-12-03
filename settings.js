let settingsIcon = document.getElementById('settings')
let profileImage 
let fileInput
let alarmInput
let profilePicSrc = JSON.parse(localStorage.getItem('profile-image')) || []

settingsIcon.addEventListener('click', ()=>{
    displayOtherPages()
    displayAll.style.backgroundColor = 'black'
    displayAll.style.padding = '3px 10px'
    displayAll.innerHTML = `<h3 class="text-light my-2" style='font-weight: 900px'> Settings </h3>
                            <div class='profile w-100 bg-dark opacity-75 w-100 h-auto px-2 py-2 d-flex flex-row gap-2 justify-content-start align-items-center'>
                                    <div class='profile-picture'>
                                        <label for='profile-input' id='profile-label'> <img src="" class="rounded-circle" id="profile-img" style="width: 65px; height: 65px;"> </label>
                                        <input id="profile-input" class='d-none' type="file" accept="image/*" onchange="loadProfilePic(event)">
                                    </div>
                                    <div class="profile-info d-flex flex-column w-50 justify-content-center align-items-start">
                                        <div class="text-light fs-6"> Profile Name </div>
                                        <div class="text-light" style="font-size: xx-small"> Apple ID, iCloud, Media & Purchases</div>
                                    </div>
                            </div>
                            <div class='mt-4 p-2 border-bottom border-secondary w-100 bg-dark text-light' onclick="passwordChange()" style="font-size: small"> Change password </div>
                            <div class='p-2 border-bottom border-secondary w-100 bg-dark text-light' style="font-size: small" onclick="changeSaver()"> Screen saver </div>
                            <div class='p-2 border-bottom border-secondary w-100 bg-dark text-light' style="font-size: small" onclick='displayAlarm()'> Set alarm </div>
                            `
                profileImage = document.getElementById('profile-img')
                fileInput = document.getElementById('profile-input')
            
                profilePicSrc[0]  ?profileImage.src = profilePicSrc[0] :profileImage.src = `profile image.png`
})

// Profile Picture change
function loadProfilePic(e){
     let file = e.target.files[0];
    
     let reader = new FileReader();

     reader.addEventListener('load', (event)=>{
        let fileURL = event.target.result;
        profilePicSrc.splice(0,1, fileURL);
        profileImage.src = profilePicSrc[0];
        localStorage.setItem('profile-image', JSON.stringify(profilePicSrc))
        console.log(profilePicSrc);
     })
    reader.readAsDataURL(file)
    }


let oldPasswordDiv
let newPasswordDiv
let oldPasswordInput
let newPasswordInput
let confirmPasswordInput
let pTag


// Password change
function passwordChange() {
    displayAll.style.display = 'flex'
    displayAll.style.flexDirection = 'column'
    displayAll.style.justfyContent = 'center'
    displayAll.style.alignItems = 'center'

    displayAll.innerHTML = `<div class='my-3 w-100 bg-dark p-3' id="old-password-div">
                                <input type='number' class="w-100 border border-secondary text-light outline-0 bg-transparent rounded" id='old-password' maxlength= "6" placeholder="Old password" onchange="validate()">
                            </div>

                            <div class='mt-1 w-100 bg-dark p-3 rounded' id='new-password-div' style="display: none">
                                <input type='password' class="w-100 border border-secondary my-3 text-light outline-0 bg-transparent rounded" id="new-password" onchange="validateNew()" placeholder="New password">
                                <input type='password' class="w-100 border border-secondary mb-3 text-light outline-0 bg-transparent rounded" onchange="changePassword()" id="confirm-password" placeholder="New password">
                            </div>
                            `
        oldPasswordDiv = document.getElementById('old-password-div');
        newPasswordDiv = document.getElementById('new-password-div');
        oldPasswordInput = document.getElementById('old-password')
        newPasswordInput = document.getElementById('new-password')
        confirmPasswordInput = document.getElementById('confirm-password')
}
    // Validate old password
function validate() {
    if (oldPasswordInput.value.trim() === '') {
        return
    }
    if (oldPasswordInput.value.length != 6 || oldPasswordInput.value != myPassword) {
       ptagShow()
        pTag.innerText = 'Please input your old password'
        oldPasswordDiv.appendChild(pTag);
        oldPasswordInput.value = ''
        setTimeout(() => {
            pTag.innerText = ''
        }, 2000);
        return
    }
    
    newPasswordDiv.style.display = 'block'
    oldPasswordInput.value = ''
    oldPasswordInput.disabled = true
}

let regex = /^[0-9]{6}$/

        // Set new password
function validateNew(){
    if (newPasswordInput.value.trim() === '' || newPasswordInput.value.length != 6 || regex.test(newPasswordInput.value) == false){
        ptagShow()
        pTag.innerText = 'Password should be six digits'
        newPasswordDiv.appendChild(pTag)

        setTimeout(() => {
            pTag.innerText = ''
            newPasswordInput.value = ''
        }, 4000);
        return
    }
}

function ptagShow(){
    pTag = document.createElement('p');
    pTag.style.color = 'orange';
    pTag.style.marginTop = '3px';
    pTag.style.fontSize = 'x-small';
}

function changePassword() {
    if (newPasswordInput.value.trim() !== confirmPasswordInput.value.trim()) {
        ptagShow()
        pTag.innerText = 'Password does not match'
        newPasswordDiv.appendChild(pTag);
        oldPasswordInput.value = ''
        confirmPasswordInput.value = ''
        setTimeout(() => {
            pTag.innerText = ''
        }, 4000);
        return
    }

    myPassword = confirmPasswordInput.value.trim()
    localStorage.setItem('new-password', JSON.stringify(myPassword))
    ptagShow()
    pTag.innerHTML = 'Password changed successfuly'
    setTimeout(() => {
        newPasswordInput.value = ''
        confirmPasswordInput.value = ''
        pTag.innerText = ''
    }, 3000);
}

function  changeSaver() {
    displayAll.innerHTML = `
                            <label for='screen-save' id='screen-label' class='text-light bg-dark p-3 w-100 mt-5' style='font-size: small'><p>Choose new screen saver</p></label>
                            <input type='file' id='screen-save' class='d-none' accept="image/*" onchange='changeScreen(event)'>
    `
}

function changeScreen(e) {
    let screenFile = e.target.files[0];

    let reader = new FileReader();

    reader.onload= (event)=>{
        let screenURL = event.target.result;
        homePageSaverSrc.splice(0,1,screenURL);
        localStorage.setItem('home-page-screen', JSON.stringify(homePageSaverSrc));
        homePageScreenSaver(); 
    }
    reader.readAsDataURL(screenFile);
}

function displayAlarm(){
    displayAll.innerHTML= `<div class='h-100 bg-dark p-3 w-100 my-auto text-center opacity-75 d-flex flex-column justify-content-start align-items-start gap-3'>
                                <h3 class='text-light'> Set Alarm </h3>
                                <input type='time' id='alarm-input' class='w-75 outline-0 border-secondary bg-light' style='height: 30px' onchange='getAlarmTime()'></input>
                            </div>
                            `
            alarmInput = document.getElementById('alarm-input');
            alarmInput.value = new Date().toTimeString().slice(0,5)
}

function getAlarmTime(){
    alarmTime = alarmInput.value;
    localStorage.setItem('alarm', JSON.stringify(alarmTime))
}

function triggerAlarm() {
    setInterval(() => {
        let currentTime = new Date().toTimeString().slice(0,5);
        if (alarmTime === 0 || alarmTime != currentTime) {
            return
        }
    displayOtherPages()
    displayAll.innerHTML = `<div class="w-100 h-100 bg-transparent d-flex flex-column justify-content-center align-items-center">
                            <img src='alarm-removebg-preview.png' class='alarm h-50'>
                            <p style="color: white; font-size: small;" class="mx-auto"> Alarm will go off in two minutes</p></div>`
    let newAudio = document.createElement('audio')
    newAudio.src = '02. I Am (Miracle).mp3'
    displayAll.appendChild(newAudio)
    newAudio.load()
    newAudio.play()
    setTimeout(() => {
        newAudio.pause()
        displayHome();
    }, 130000);
    }, 60000);
    
}
triggerAlarm()