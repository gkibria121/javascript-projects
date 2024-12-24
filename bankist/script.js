'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav  = document.querySelector('.nav')
const header = document.querySelector(".header") 

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//section observer
const sections = document.querySelectorAll('.section')
sections.forEach(section=>section.classList.add('section--hidden'))


const obsCallback = function(entries,observer){
  const [entry] = entries;
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)

}

const observer = new IntersectionObserver(obsCallback,{
  root : null,
  threshold :  [0,0.1],
  rootMargin : '100px'
})

sections.forEach(section=>observer.observe(section))




//make sticky header after hero section



const obsOptions = {
  root : null,
  threshold : 0,
  rootMargin : '-200px'
   
}

const stickyNav = function(entries,observer){
  entries.forEach((entry)=>{
    if(!entry.isIntersecting){
      nav.classList.add('sticky') 
    }
    else
    {
      nav.classList.remove('sticky') 
    } 
    
  })

}

const headerObserver = new IntersectionObserver(stickyNav,obsOptions);

headerObserver.observe(header)



const fadeController = function (e) {
  if(e.target.classList.contains('nav__link')){
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach((link)=>{
      if(link!==e.target){
        link.style.opacity = this
      }
    })
    const logo = e.target.closest('.nav').querySelector('.nav__logo')
    logo.style.opacity= this
   }

}


nav.addEventListener('mouseover',fadeController.bind('0.5') ) 
nav.addEventListener('mouseout',fadeController.bind('1') ) 



const imgTargets = document.querySelectorAll('img[data-src]')

const loadImage = function(entries,observer){
  const [entry] = entries;

  if(!entry.isIntersecting) return

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
  
}

const imgObserver = new IntersectionObserver(loadImage,{
  root : null,
  threshold : 0,
  rootMargin : '200px'
})


imgTargets.forEach(img => imgObserver.observe(img) )




//handle tabs

const tabsContainer = document.querySelector('.operations__tab-container')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContents = document.querySelectorAll('.operations__content') 

tabsContainer.addEventListener('click',(e)=>{
  const tab = e.target.closest('.operations__tab')

  if(!tab) return;
  tabs.forEach(el=>el.classList.remove('operations__tab--active'))
  tab.classList.add('operations__tab--active');

  const currentTabIndx = tab.dataset.tab; 

  tabsContents.forEach(tab=> tab.classList.remove('operations__content--active'))

  document.querySelector(`.operations__content--${currentTabIndx}`).classList.add('operations__content--active')
 
})



//add sliders


const slider = document.querySelector('.slider')
const slides = document.querySelectorAll('.slide')
const leftArrow = document.querySelector('.slider__btn--left')
const rightArrow = document.querySelector('.slider__btn--right')
let currentSlide = 0;

const gotoSlide = function(slideNo){
  slides.forEach((slide,idx)=> {
    slide.style.transform = `translateX(${(idx-slideNo)*100}%)`
  })
  
}
gotoSlide(currentSlide)
leftArrow.addEventListener('click',function(){

  currentSlide--;
  if(currentSlide===0) 
    currentSlide = slides.length-1

  gotoSlide(currentSlide)
})

rightArrow.addEventListener('click',function(){

  currentSlide++;
  if(currentSlide===slides.length) 
    currentSlide = 0
  gotoSlide(currentSlide)
})




const navLinksContainer= document.querySelector('.nav__links')


navLinksContainer.addEventListener('click',(e)=>{
  e.preventDefault();
  const clicked = e.target.closest('.nav__link');
  if(!clicked) return;

  const href = clicked.getAttribute('href');

  const section = document.querySelector(href);

  section.scrollIntoView({behavior : 'smooth'})
  

})

