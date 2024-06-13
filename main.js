//chick if there is main color option in local storage
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color',mainColor);
    //Remove active class from list icon
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
         //Add active class on element with data-color === local storage
         if(element.dataset.color===mainColor){
            //add active class
            element.classList.add("active");

         }
    });
   

    
}


//Toggle spin on icon 
document.querySelector(".togle-setting .fa-gear").onclick = function(){
    this.classList.toggle("fa-spin");

    let openSetting = document.querySelector(".sitting-box");

    openSetting.classList.toggle("open");
   
};

//switch random background option
const randomBackEl = document.querySelectorAll(".random-background span");
//loop all spans 
randomBackEl.forEach(span => {
    //click on every span
     span.addEventListener("click",(e) =>{

        
        handelActive(e);

        if (e.target.dataset.background === "yes") {
            backgroundOption = true;   
            randomizeImgs();
            localStorage.setItem("background_option",true);

        }else{
            backgroundOption = false; 
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option",false);
        }
     });

});
//switch color
const colorsLi = document.querySelectorAll(".colors-list li");
//loop all list item 
colorsLi.forEach(li => {
    //click on every list items
     li.addEventListener("click",(e) =>{

        //Set color on root
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        //Set color on local Storage
        localStorage.setItem("color_option",e.target.dataset.color);
        
        handelActive(e);


     });

});



//select landing Page Element
let landingPage = document.querySelector(".landing-page");
landingPage.style.backgroundImage = 'url("pic/03.jpeg")'
//Get Array img
let imgsArray = ["01.jpg","02.jpg","03.jpeg","04.jpg","05.jpg",];
let defaultImg = 0;


//function to randomize background

function randomizeImgs(){
    if(backgroundOption === true){
        backgroundInterval = setInterval(function() {

            if(defaultImg< imgsArray.length){
                landingPage.style.backgroundImage = 'url("pic/'+ imgsArray[defaultImg] +'")';
                defaultImg++; 
            }
        },5000);
    }
};

//random background option
let backgroundOption = true;

//variable to control interval
let backgroundInterval;

//check if there is local storage random background items
let backgroundLocalItem = localStorage.getItem("background_option");

//check if local storage random background is not empty
if (backgroundLocalItem!==null) {
    if (backgroundLocalItem==='true') {
        backgroundLocalItem = true;
    } else {
        backgroundLocalItem = false;
    }
    //remave active class from all spans
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("active");

    });
    
    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-background .yes").classList.add("active");
    }else{
        document.querySelector(".random-background .no").classList.add("active");
    }
    
}

randomizeImgs();


//Select on skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;

    // skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window height
    let windowHeigt = this.innerHeight;

    //window scroll Top 
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop+skillsOuterHeight-windowHeigt)) {

        // this.console.log("opc")
        
        let allSkills = document.querySelectorAll(".skill-box span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        });

    }
}
//Create Popup with the image
let ourGallery = document.querySelectorAll(".Gllery img");

ourGallery.forEach(img => {

    img.addEventListener("click",(e) => {

        //create overlay element
        let overlay = document.createElement("div");
        //Add class to overlay
        overlay.className = 'popup-overlay';
        //Append overlay to the body
        document.body.appendChild(overlay);
        //Create popup Box
        let popupBox = document.createElement("div");
        //Add class to popup Box
        popupBox.className = 'popup-box';

        if (img !== null) {
            //Create Heading
            let imgHeading = document.createElement("h3");
            //h3 textalign center
            imgHeading.style.textAlign = 'center'
            //Create Text for heading
            let textImg = document.createTextNode(img.alt);
            //Append the text to the Heading
            imgHeading.appendChild(textImg);
            //Append the Heading to the popup box
            popupBox.appendChild(imgHeading)
        }

        //create the image
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        //Add image to popup box
        popupBox.appendChild(popupImage);
        //Append popup box to body
        document.body.appendChild(popupBox);
        //Create the close span
         let closeButton = document.createElement("span");
         //create the close button text
         let closeButtonText = document.createTextNode("X");
         //append text to close button
         closeButton.appendChild(closeButtonText);
         //add class to close button
         closeButton.className = 'close-botton';
         //add close button to the popup box
         popupBox.appendChild(closeButton);

         //aaaaa
         document.onkeyup = function (e) {
            if (e.key === "Escape") {
                document.querySelector(".popup-box").remove(); 
                document.querySelector(".popup-overlay").remove();
            }
        }

    });
});
//close popup

document.addEventListener('click',function (e) {
    
    if (e.target.className == 'close-botton') {
        // Remove the current popup
        e.target.parentNode.remove();
        //Remove overlay
        document.querySelector(".popup-overlay").remove();

    }
});

//scroll from navbar or bullets

let allBullet = document.querySelectorAll(".nav-bullets .bullet");
let alllinks = document.querySelectorAll(".links a");
function scrolling(elements) {
    
    elements.forEach(ele => {
  
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}
scrolling(allBullet);
scrolling(alllinks);

//Handel active stats
function handelActive(ev) {

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    //add Active Class on self
    ev.target.classList.add("active");
}

// show and hide bullets

let bulletSpan = document.querySelectorAll(".bullet-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

//local storage
let bulletLocalItem = localStorage.getItem("bullet_option");

if (bulletLocalItem !== null){
    bulletSpan.forEach(span =>{
        span.classList.remove("active");
    });

    if (backgroundLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector("bullet-option .yes").classList.add("active");

    }else{
        bulletsContainer.style.display = 'none';
        document.querySelector("bullet-option .no").classList.add("active");
    }
}

bulletSpan.forEach(span => {

    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option","block");

        }else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option","none");
        }
        handelActive(e);
        
    });
});

//reset button
document.querySelector(".reset-option").onclick = function () {
    
    localStorage.clear();
    window.location.reload();

};
// Menu Toggle
let toggleBtn = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".links");

toggleBtn.onclick = function () {
    //stop propagitionon on button
    // e.stopPropagation();
    this.classList.toggle("menu-active");
    theLinks.classList.toggle("open");
};

//close the menu on press any where
document.addEventListener("click", (e) => {
    if(e.target !== toggleBtn && e.target!== theLinks){
        //check if menu is open
        if (theLinks.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");
            theLinks.classList.toggle("open");
        }
    };

});
// //stop propagitionon menu
// theLinks.onclick = function () {
//     e.stopPropagation();
// };


//scroll to top
let scrollTop = document.querySelector(".scroll i");

window.onscroll = function () {

    if (this.scrollY >=650) {
        scrollTop.style.display = 'block'
    }else{
        scrollTop.style.display = 'none';
    }
    this.scrollY >=650 ? scrollTop.style.display = 'block' :scrollTop.style.display = 'none';
};

scrollTop.onclick = function () {
    window.scrollTo({
        top:0,
        behavior: "smooth",
    });
};