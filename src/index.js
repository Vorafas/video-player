import dashjs from 'dashjs';
import { checkPlayer, togglePlayer, progressUpdate, forwardRewind, backwardRewind } from './lib';
import './index.css';

const video = document.querySelector('#video-player');
const playBtn = document.querySelector('.play-btn');
const progress = document.querySelector('.seekbar-play');
const seekContainer = document.querySelector('.seekbar');
const timeDuration = document.querySelector('.time-duration p');
const timeCurrent = document.querySelector('.time-current');
const backwardBtn = document.querySelector('.backward-btn');
const forwardBtn = document.querySelector('.forward-btn');

const url = "http://demo.unified-streaming.com/video/ateam/ateam.ism/ateam.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(video, url, true);

if(video !== undefined){
    video.play().then(_ => { /* Autoplay started! */
        video.removeAttribute('muted');
        playBtn.querySelector('.icon-btn').innerHTML = `<i class="fas fa-pause"></i>`;
    }).catch(error => { /* Autoplay was prevented */
        console.log('Autoplay was prevented', error);
    });
}

const videoRewind = function(evt){
    const widthSeekbar = this.offsetWidth;
    const o = evt.offsetX;
    if(video.paused){
        progress.style.width = `${(100 * o) / widthSeekbar}%`;
        video.pause();
        video.currentTime = video.duration * (o / widthSeekbar);
    }else{
        progress.style.width = `${(100 * o) / widthSeekbar}%`;
        video.pause();
        video.currentTime = video.duration * (o / widthSeekbar);
        video.play();
    }
    checkPlayer(video, playBtn);
}

video.ontimeupdate = () => {
    progressUpdate(video, timeCurrent, timeDuration, progress, playBtn);
};
seekContainer.addEventListener('click', videoRewind);
playBtn.addEventListener('click', () => {
    togglePlayer(video, playBtn);
});
video.addEventListener('click', () => {
    togglePlayer(video, playBtn);
});
backwardBtn.addEventListener('click', () => {
    backwardRewind(video, progress, playBtn);
});
forwardBtn.addEventListener('click', () => {
    forwardRewind(video, progress, playBtn);
});