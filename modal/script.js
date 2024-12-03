'use strict';


const showModalButtons = document.querySelectorAll('.show-modal')
const closeModal = document.querySelector('.close-modal')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')
const body = document.querySelector('body')

showModalButtons.forEach(btn => btn.addEventListener('click',showModal))
closeModal.addEventListener('click',hideModal)
overlay.addEventListener('click',hideModal)
document.addEventListener('keydown',(e)=>{
    if(e.key==='Escape' && !modal.classList.contains('hidden')) hideModal() 
    
})

function hideModal(){ 

    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

function showModal(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

function handlekeyPress(e){
    console.log(e)
}