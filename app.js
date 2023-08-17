const music = new Audio('./audio/1.mp3');
// music.play();

const songs = [
    {
        id: 1,
        title: `On My way <br />
        <div class="subtitle">Alan Walker</div>`,
        poster: "./img/1.jpg"
    },
    {
        id: 2,
        title: `Faded <br />
        <div class="subtitle">Alan Walker</div>`,
        poster: "./img/2.jpg"
    },
    {
        id: 3,
        title: `On and On <br />
        <div class="subtitle">Daniel Levi</div>`,
        poster: "./img/3.jpg"
    },
    {
        id: 4,
        title: `Warriyo <br />
        <div class="subtitle">Laura Brehm</div>`,
        poster: "./img/4.jpg"
    },
    {
        id: 5,
        title: `Love with .. <br />
        <div class="subtitle">Alan Walker</div>`,
        poster: "./img/5.jpg"
    },
    {
        id: 6,
        title: ` Mashup <br />
        <div class="subtitle">Dj songs</div>`,
        poster: "./img/6.jpg"
    },
    {
        id: 7,
        title: `Agar Tum Saath Ho <br />
        <div class="subtitle">Alka Yagnik, Arijit Singh</div>`,
        poster: "./img/7.jpg"
    },
    {
        id: 8,
        title: `Suna Hai <br />
        <div class="subtitle">Jubin Nautiyal</div>`,
        poster: "./img/8.jpg"
    },
    {
        id: 9,
        title: `Dilbar Dilbar <br />
        <div class="subtitle">Neha Kakkar</div>`,
        poster: "./img/9.jpg"
    },
    {
        id: 10,
        title: `Duniyaa <br />
        <div class="subtitle">Dhvani Bhanushali</div>`,
        poster: "./img/10.jpg"
    },
    {
        id: 11,
        title: `Lagdi Lahore Di <br />
        <div class="subtitle">Guru R</div>`,
        poster: "./img/11.jpg"
    },
    {
        id: 12,
        title: `Putt Jatt da <br />
        <div class="subtitle">Diljit Dosanjh</div>`,
        poster: "./img/12.jpg"
    },
    {
        id: 13,
        title: `Baarishein <br />
        <div class="subtitle">Atif Aslam</div>`,
        poster: "./img/13.jpg"
    },
    {
        id: 14,
        title: `Vaste <br />
        <div class="subtitle">Dhvani B</div>`,
        poster: "./img/14.jpg"
    },
    {
        id: 15,
        title: `Loot Gye <br />
        <div class="subtitle">Jubin Nautiyal</div>`,
        poster: "./img/15.jpg"
    },
    {
        id: 16,
        title: `Meri Zindagi Hai Tu <br />
        <div class="subtitle">Jubin Nautiyal</div>`,
        poster: "./img/16.jpg"
    },
    {
        id: 17,
        title: `Batao Yaad Hai Tumko Wo Jab <br />
        <div class="subtitle">Rahat Fateh </div>`,
        poster: "./img/17.jpg"
    },
    {
        id: 18,
        title: `Pasoori <br />
        <div class="subtitle">Ali Sethi, Shae Gill</div>`,
        poster: "./img/18.jpg"
    },
    
];


Array.from(document.getElementsByClassName("songItem")).forEach((e,i) =>{
    e.getElementsByTagName("img")[0].src = songs[i].poster;
    e.getElementsByTagName("h5")[0].innerHTML = songs[i].title;
});

let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementById("wave");

masterPlay.addEventListener("click", () =>{
    if(music.paused || music.currentTime <= 0){
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
    }else{
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add("bi-play-fill");
        masterPlay.classList.remove("bi-pause-fill");
    }
})

const makeAllBackground = () =>{

    Array.from(document.getElementsByClassName("songItem")).forEach((val) =>{
        val.style.background = 'rgb(105 105, 105, 0)';
    })
}

const makeAllplays = () =>{

    Array.from(document.getElementsByClassName("playListPlay")).forEach((val) =>{
        val.classList.add("bi-play-circle-fill");
    })
}

let index = 0;
let poster_master_play = document.getElementById("poster_master_play");
let title = document.getElementById('title');

Array.from(document.getElementsByClassName("playListPlay")).forEach((e) => {
    e.addEventListener("click",(el) => {
        index = el.target.id;
        
        music.src = `audio/${index}.mp3`;
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        

        let songTitle = songs.filter( (val) => {
            return val.id==index;
        });

       for(let i of songTitle){
        poster_master_play.src = i.poster;
        title.innerHTML= i.title;
       }

       makeAllBackground();
       Array.from(document.getElementsByClassName("songItem"))[index-1].style.background = "rgb(105 105, 105, 1)";
       
       makeAllplays();
       Array.from(document.getElementsByClassName("playListPlay"))[index-1].classList.remove("bi-play-circle-fill");
       Array.from(document.getElementsByClassName("playListPlay"))[index-1].classList.add("bi-pause-circle-fill");
    })
})

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    // console.log(music_curr);

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);
    if(sec1 < 10 ){
        sec1 = `0${sec1}`;
    }
    currentEnd.textContent = `${min1}:${sec1}`;

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if(sec2 < 10 ){
        sec1 = `0${sec2}`;
    }
    currentStart.textContent = `${min2}:${sec2}`;

    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;

    let seekbar = seek.value;
    bar2.style.width =  `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});

let vol_icon = document.getElementById("vol_icon");
let vol = document.getElementById("vol");
let vol_bar = document.getElementsByClassName("vol_bar")[0];
let vol_dot = document.getElementById("vol_dot");

vol.addEventListener("change", () => {
    if (vol.value == 0) {
        vol_icon.classList.remove("bi-volume-up-fill");
        vol_icon.classList.remove("bi-volume-down-fill");
        vol_icon.classList.add("bi-volume-off-fill");
    }
    if (vol.value > 0){
        vol_icon.classList.remove("bi-volume-up-fill");
        vol_icon.classList.add("bi-volume-down-fill");
        vol_icon.classList.remove("bi-volume-off-fill");
    }
    if (vol.value > 50 ){
        vol_icon.classList.add("bi-volume-up-fill");
        vol_icon.classList.remove("bi-volume-down-fill");
        vol_icon.classList.remove("bi-volume-off-fill");
    }
    let volbar = vol.value;
    vol_bar.style.width = `${volbar}%`;
    vol_dot.style.left = `${volbar}%`;
    music.volume = volbar / 100;
});

let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener('click', () => {
    index -= 1;
    if(index < 1){
        index = Array.from(document.getElementsByClassName('songItem')).length;

    }
        music.src = `audio/${index}.mp3`;
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        

        let songTitle = songs.filter( (val) => {
            return val.id==index;
        });

       for(let i of songTitle){
        poster_master_play.src = i.poster;
        title.innerHTML= i.title;
       }

       makeAllBackground();
       Array.from(document.getElementsByClassName("songItem"))[index-1].style.background = "rgb(105 105, 105, 1)";
       
       makeAllplays();
       Array.from(document.getElementsByClassName("playListPlay"))[index-1].classList.remove("bi-play-circle-fill");
       Array.from(document.getElementsByClassName("playListPlay"))[index-1].classList.add("bi-pause-circle-fill");
})

next.addEventListener("click" , () => {
    index ++;
    if(index > Array.from(document.getElementsByClassName('songItem')).length){
        index = 1;

    }
        music.src = `audio/${index}.mp3`;
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove("bi-play-fill");
        masterPlay.classList.add("bi-pause-fill");
        

        let songTitle = songs.filter( (val) => {
            return val.id==index;
        });

       for(let i of songTitle){
        poster_master_play.src = i.poster;
        title.innerHTML= i.title;
       }

       makeAllBackground();
       Array.from(document.getElementsByClassName("songItem"))[index-1].style.background = "rgb(105 105, 105, 1)";
       
       makeAllplays();
       Array.from(document.getElementsByClassName("playListPlay"))[index-1].classList.remove("bi-play-circle-fill");
       Array.from(document.getElementsByClassName("playListPlay"))[index-1].classList.add("bi-pause-circle-fill");

})

// popular songs
let pop_song_left = document.getElementById("pop_song_left");
let pop_song_right = document.getElementById("pop_song_right");
let pop_song = document.getElementsByClassName('pop_song')[0];



pop_song_right.addEventListener('click', () => {
    console.log("ajay");
    pop_song.scrollLeft += 330;
});

pop_song_left.addEventListener('click', () => {
    console.log("ajay");
    pop_song.scrollLeft -= 330;
});

// popular artists
let pop_art_left = document.getElementById("pop_art_left");
let pop_art_right = document.getElementById("pop_art_right");
let pop_artists = document.getElementsByClassName('item')[0];



pop_art_right.addEventListener('click', () => {
    console.log("ajay");
    pop_artists.scrollLeft += 330;
});

pop_art_left.addEventListener('click', () => {
    console.log("ajay");
    pop_artists.scrollLeft -= 330;
});

