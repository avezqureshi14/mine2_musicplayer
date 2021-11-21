//Lets select all reQuired tags or elements

const wrapper = document.querySelector(".wrapper");
musicImg = wrapper.querySelector(".imgArea img");
musicName = wrapper.querySelector(".songDetails .name");
musicArtist = wrapper.querySelector(".songDetails .artist");
musicAudio = wrapper.querySelector("#mainAudio");
PlayPauseBtn = wrapper.querySelector(".playPause");
prevBtn = wrapper.querySelector("#prev");
nextBtn = wrapper.querySelector("#next");
progressBar = wrapper.querySelector(".progressBar");
progressArea = wrapper.querySelector(".progressArea");
musicList = wrapper.querySelector(".musicList");
showMoreBtn = wrapper.querySelector("#more-music");
hideMusicBtn = musicList.querySelector("#close");





let musicIndex = 1;

//Jab window load hongi uske baad music change hoga

window.addEventListener("load", () => {
    loadMusic(musicIndex); 
    //calling load music function once window is loaded
})

//Load Music Function
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `assets/${allMusic[indexNumb - 1].img}.png`
    musicAudio.src = `assets/${allMusic[indexNumb - 1].src}.mp3`

}

//play music function
function playMusic() {
    wrapper.classList.add("paused");
    PlayPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
//pause music function
function pauseMusic() {
    wrapper.classList.remove("paused");
    PlayPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}
//next musicfunction
function nextMusic() {
    //here we'll just increment of index by 1
    musicIndex++;
    //If musicIndex is greater than array length then musicIndex will be eQual to 1 and the first song will be played again
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}
//prev musicfunction
function prevMusic() {
    //here we'll just decrement of index by 1
    musicIndex--;
    //If musicIndex is lesss than  1 then musicIndex will be eQual to array length and the  song will be played in reverse order
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//play or music button event
PlayPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    //If isMusicPaused is true then call pauseMusic elese call playMusic
    isMusicPaused ? pauseMusic() : playMusic();
});

//next music btn event
nextBtn.addEventListener("click", () => {
    nextMusic();
})
//prev music btn event
prevBtn.addEventListener("click", () => {
    prevMusic();
})



//update progress bar width according to music current time

mainAudio.addEventListener("timeupdate", (e) => {
    // console.log(e);
    const currentTime = e.target.currentTime; //getting current time of song
    const duration = e.target.duration; //getting total duration go song

    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current")
    let musicDuration = wrapper.querySelector(".duration")
    let audioDuration = mainAudio.duration;

    mainAudio.addEventListener("loadeddata", () => {

        let audioDuration = mainAudio.duration;
        //update the song total duration
        let totalMin = Math.floor(audioDuration / 60);
        let totalsec = Math.floor(audioDuration % 60);
        if (totalsec < 10) {
            totalsec = `0${totalsec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalsec}`;
    });

    //update the song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentsec = Math.floor(currentTime % 60);
    if (currentsec < 10) {
        currentsec = `0${currentsec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentsec}`;

});


// let's update playingsong current time according to the progress bar width 

progressArea.addEventListener("click", (e) => {
    let progressWidthVal = progressArea.clientWidth; // getting width of progress bar
    let clickedOffSetX = e.offsetX; //getting offset x value

    let songDuration = mainAudio.duration; //getting song total duration

    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    playMusic();

});

//let's work on repeat, shuffle song according to the icon 
const repeatBtn = wrapper.querySelector("#repeat-plist")
repeatBtn.addEventListener("click", () => {
    // first we get the innertext of the icon then we'll change accordingly
    let getText = repeatBtn.innerText; //getting innerText of icon
    //let's do different changes on different icon clicj using switch 

    switch (getText) {
        case "repeat": //if this icon is repeat
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song Looped");
            break;
        case "repeat_one": //if icon is repeat one change it to shuffle
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback Shuffle");
            break;
        case "shuffle": //if icon is shuffle then change it too repeat
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playback Looped");

    }

});

//above we just changed the ico, now let's  work on what to do after the song ended

mainAudio.addEventListener("ended", () => {
    // We'll do according to the icon means if user has set icon to loop song then we'll repeat the current song and will do further accordingly

    let getText = repeatBtn.innerText; //getting innerText of icon
    //let's do different changes on different icon clicj using switch 

    switch (getText) {
        case "repeat": //if the icon is repeat then simply we will call the next song function so the next song will play
            nextMusic();
            break;
        case "repeat_one": //if icon is repeat_one then we'll change the current playing song current time to 0 so song will play again
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle": 
        //generating random index between th emax range of array length
        let randindex = Math.floor((Math.random() * allMusic.length) + 1);
        do {
            randIndex = Math.floor((Math.random() * allMusic.length) + 1)
        } while (musicIndex == randIndex);
        //this loop runs until the next random won't be the same of current music index

        musicIndex = randIndex; //passing random index  to musci index so the random song will play
        loadMusic(musicIndex); //calling loadmusic function
        playMusic(); //calling playmusic function
        break;

    }

})


showMoreBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});
hideMusicBtn.addEventListener("click", ()=>{
    showMoreBtn.click();
});