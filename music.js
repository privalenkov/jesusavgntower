const bgMusicplay = new Audio()
bgMusicplay.src = 'sounds/bgmusic_ny.mp3'
bgMusicplay.volume = .2
bgMusicplay.loop = true
function bgMusic() {
    bgMusicplay.play()
}