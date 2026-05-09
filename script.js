// script.js

const songs = [

    {
        name: "Night Changes",
        artist: "One Direction",
        img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
        music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },

    {
        name: "Dream Beats",
        artist: "Alan Walker",
        img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
        music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },

    {
        name: "Summer Vibes",
        artist: "Marshmello",
        img: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1200&auto=format&fit=crop",
        music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }

];

/* Elements */

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");

const progress = document.getElementById("progress");

const current = document.getElementById("current");

const duration = document.getElementById("duration");

const cover = document.getElementById("cover");

const title = document.getElementById("title");

const artist = document.getElementById("artist");

const prevBtn = document.getElementById("prev");

const nextBtn = document.getElementById("next");

const volume = document.getElementById("volume");

const playlistSongs =
document.querySelectorAll(".song");

let songIndex = 0;

let isPlaying = false;

/* Load Song */

function loadSong(song){

    title.textContent = song.name;

    artist.textContent = song.artist;

    cover.src = song.img;

    audio.src = song.music;

}

loadSong(songs[songIndex]);

/* Play Song */

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

    cover.classList.add("play");

}

/* Pause Song */

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

    cover.classList.remove("play");

}

/* Play Pause */

playBtn.addEventListener("click", () => {

    if(isPlaying){

        pauseSong();

    }
    else{

        playSong();

    }

});

/* Next Song */

function nextSong(){

    songIndex++;

    if(songIndex > songs.length - 1){

        songIndex = 0;

    }

    loadSong(songs[songIndex]);

    playSong();

    updateActiveSong();

}

/* Previous Song */

function prevSong(){

    songIndex--;

    if(songIndex < 0){

        songIndex = songs.length - 1;

    }

    loadSong(songs[songIndex]);

    playSong();

    updateActiveSong();

}

nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", prevSong);

/* Progress Update */

audio.addEventListener("timeupdate", () => {

    progress.max = audio.duration;

    progress.value = audio.currentTime;

    let currentMin =
    Math.floor(audio.currentTime / 60);

    let currentSec =
    Math.floor(audio.currentTime % 60);

    if(currentSec < 10){

        currentSec = "0" + currentSec;

    }

    current.innerHTML =
    `${currentMin}:${currentSec}`;

    let durationMin =
    Math.floor(audio.duration / 60);

    let durationSec =
    Math.floor(audio.duration % 60);

    if(durationSec < 10){

        durationSec = "0" + durationSec;

    }

    duration.innerHTML =
    `${durationMin}:${durationSec}`;

});

/* Change Progress */

progress.addEventListener("input", () => {

    audio.currentTime = progress.value;

});

/* Volume */

volume.addEventListener("input", () => {

    audio.volume = volume.value / 100;

});

/* Auto Next Song */

audio.addEventListener("ended", nextSong);

/* Playlist Click */

playlistSongs.forEach(song => {

    song.addEventListener("click", () => {

        songIndex =
        parseInt(song.dataset.index);

        loadSong(songs[songIndex]);

        playSong();

        updateActiveSong();

    });

});

/* Active Song */

function updateActiveSong(){

    playlistSongs.forEach(song => {

        song.classList.remove("active");

    });

    playlistSongs[songIndex]
    .classList.add("active");

}