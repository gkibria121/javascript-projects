'use strict';


const showModalButtons = document.querySelectorAll('.show-modal')
const closeModal = document.querySelector('.close-modal')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')


showModalButtons.forEach(btn => btn.addEventListener('click',showModal))
closeModal.addEventListener('click',hideModal)
overlay.addEventListener('click',hideModal)


function hideModal(){
    if(this === modal) return

    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

function showModal(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}