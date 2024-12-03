
let gallery = JSON.parse(localStorage.getItem('gallery-sources'));

// Gallery page
galleryIcon.onclick = ()=>{
    displayAll.innerHTML = ''
    displayOtherPages()
    displayAll.style.display = 'flex'
    displayAll.style.flexDirection = 'row'
    displayAll.style.flexWrap = 'wrap'
    displayAll.style.overflow = 'auto'

    gallery.forEach((url, index) => {
        displayAll.innerHTML += `<img src='${url.imageURL}'  onclick='showBold()' width="107px" height='85px'>`
    });
    
}

let indexNo = 0
function showBold() {
    
    setInterval(() => {
        if (indexNo === gallery.length-1) {
            indexNo = 0
        }
        displayAll.innerHTML = `<img src='${gallery[indexNo].imageURL}' style="width: 100%; height: auto;">`
        indexNo ++
        
    }, 2000);
}