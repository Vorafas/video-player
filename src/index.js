import dashjs from 'dashjs';

import './index.css';

const video = document.querySelector('#video-player');
const playBtn = document.querySelector('#play-btn');
const progress = document.querySelector('#seekbar-play');

const url = "http://dash.edgesuite.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(video, url, true);

if(video !== undefined){
    video.play().then(_ => {
        // Autoplay started! 
        video.removeAttribute('muted');
        playBtn.querySelector('.icon-btn').innerHTML = `<i class="fas fa-pause"></i>`;
    }).catch(error => {
        // Autoplay was prevented.
        console.log('Autoplay was prevented', error);
    });
}
const progressUpdate = function(){
    // console.log(video.duration);
    // console.log(video.currentTime);
    let d = video.duration;
    let c = video.currentTime;
    progress.style.width = `${(100 * c) / d}%`; 
}

video.ontimeupdate = progressUpdate;

