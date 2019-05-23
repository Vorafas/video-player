import dashjs from 'dashjs';
import { checkPlayer, togglePlayer, progressUpdate } from './lib';
import './index.css';

const video = document.querySelector('#video-player');
const playBtn = document.querySelector('#play-btn');
const progress = document.querySelector('.seekbar-play');
const seekContainer = document.querySelector('.seekbar');
const timeDuration = document.querySelector('.time-duration p');
const timeCurrent = document.querySelector('.time-current');

const url = "http://dash.edgesuite.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(video, url, true);

if(video !== undefined){
    video.play().then(_ => { // Autoplay started! 
        video.removeAttribute('muted');
        playBtn.querySelector('.icon-btn').innerHTML = `<i class="fas fa-pause"></i>`;
    }).catch(error => {
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
    progressUpdate(video.duration, video.currentTime, timeCurrent, timeDuration, progress)
};
seekContainer.addEventListener('click', videoRewind);
playBtn.addEventListener('click', () => {
    togglePlayer(video, playBtn);
});
video.addEventListener('click', () => {
    togglePlayer(video, playBtn);
});
