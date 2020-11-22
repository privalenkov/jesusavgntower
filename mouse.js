const howtobtn = document.querySelector('#btn-howto')
const howtoblock = document.querySelector('.howto-content')
const bghowto = document.querySelector('.bg-howto')
howtobtn.addEventListener('click', () => {
    howtoblock.classList.toggle('showhowto')
    if(document.documentElement.clientWidth <= 1220) {
        bghowto.classList.toggle('truefalsebg')

    }
})