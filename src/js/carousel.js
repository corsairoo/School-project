var slideImages = document.querySelectorAll(".slides img");
var next = document.querySelector(".next");
var prev = document.querySelector(".prev");
var dots = document.querySelectorAll(".dot");

var interval;
var counter = 0;
next.addEventListener('click',slideNext);
prev.addEventListener('click',slidePrev);

function slideNext(){
    
    slideImages[counter].style.animation = 'next1 0.6s ease-in forwards';
    
    if(counter >= slideImages.length-1)
        counter=0;
    else
        ++counter;
    slideImages[counter].style.animation = 'next2 0.6s ease-in forwards';
    kontrolki();
}
function slidePrev(){
    
    slideImages[counter].style.animation = 'prev1 0.6s ease-in forwards';
    
    if(counter ==0 )
        counter=slideImages.length-1;
    else
        --counter;
    slideImages[counter].style.animation = 'prev2 0.6s ease-in forwards';
    kontrolki();
}
function autoSlide(){
       interval=setInterval(slideNext,3000);
}
autoSlide();

//najechanie na zdjęcie
const container = document.querySelector('.slide-container');
container.addEventListener('mouseover',function(){
    clearInterval(interval);
});
container.addEventListener('mouseout',autoSlide);

//aktualizuje wskaźnik
function kontrolki(){
    for(i=0; i<dots.length; i++){
        dots[i].className = dots[i].className.replace(' active','');
    }
    dots[counter].classList.add('active');
}

//na naciśnięcie wskaźnika
function switchImage(currentImage){
    currentImage.classList.add('active');
    var imageId = currentImage.getAttribute('data-attr');
    if(imageId > counter){
        slideImages[counter].style.animation = 'next1 0.6s ease-in forwards';
        counter=imageId;
        slideImages[counter].style.animation = 'next2 0.6s ease-in forwards';
    }else if(imageId == counter){
        return;
    }else{
        slideImages[counter].style.animation = 'prev1 0.6s ease-in forwards';
        counter=imageId;
        slideImages[counter].style.animation = 'prev2 0.6s ease-in forwards';
    }
    kontrolki();
}

//ustawianie wysokości baneru

  function adjustHeight() {
    const width = container.offsetWidth; 
    const aspectRatio = 4 / 1;
    const height = width / aspectRatio+40; 

    container.style.height = `${height}px`;
  }

  window.addEventListener('resize', adjustHeight); 

  adjustHeight();