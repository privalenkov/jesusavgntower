const howtobtn = document.querySelector('.btn-container')
const soundbtn = document.querySelector('.btn-soundonoff')
const howtoblock = document.querySelector('.howto-container')
const bghowto = document.querySelector('.bg-howto')
if(document.documentElement.clientWidth <= 1220) {
    bghowto.classList.toggle('truefalsebg')

}
setTimeout(() => {
    if(howtoblock.classList.contains('showhowto')) {
        howtoblock.classList.toggle('showhowto')
        if(document.documentElement.clientWidth <= 1220) {
            bghowto.classList.toggle('truefalsebg')

        }
    }
}, 10000);

howtobtn.addEventListener('click', () => {
    howtoblock.classList.toggle('showhowto')
    if(document.documentElement.clientWidth <= 1220) {
        bghowto.classList.toggle('truefalsebg')

    }
})
let toggle = false
soundbtn.addEventListener('click', () => {
    soundbtn.classList.toggle('offsound')
    if(toggle) {
        bgMusicplay.pause()
        toggle = false
        
    } else {
        bgMusicplay.play()
        toggle = true
    }
})