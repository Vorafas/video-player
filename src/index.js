import dashjs from 'dashjs';
import { checkPlayer, togglePlayer, progressUpdate, forwardRewind, backwardRewind, closeVideo, nextVideo, prevVideo, videoInit } from './lib';
import './index.css';

const video = document.querySelector('#video-player');
const playBtn = document.querySelector('.play-btn');
const progress = document.querySelector('.seekbar-play');
const seekContainer = document.querySelector('.seekbar');
const timeDuration = document.querySelector('.time-duration p');
const timeCurrent = document.querySelector('.time-current');
const backwardBtn = document.querySelector('.backward-btn');
const forwardBtn = document.querySelector('.forward-btn');
const closeBtn = document.querySelector('.close-button');
const settingsQuality = document.querySelector('.settings-quality');
const videoContainer = document.querySelector('#video-container');
const currentTitle = document.querySelector('.current-video');
const nextTitle = document.querySelector('.next-video');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const player = dashjs.MediaPlayer().create();
videoInit(player, video, playBtn);

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

seekContainer.addEventListener('click', videoRewind);
playBtn.addEventListener('click', () => {
    togglePlayer(video, playBtn);
});
video.addEventListener('click', () => {
    togglePlayer(video, playBtn);
});
closeBtn.addEventListener('click', () => {
    closeVideo(video, playBtn, videoContainer);
});
document.addEventListener('keydown', (evt) => {
    if(evt.keyCode == 82)
        closeVideo(video, playBtn, videoContainer);
});
prevBtn.addEventListener('click', () => {
    prevVideo(video, player, playBtn, currentTitle, nextTitle);
});
nextBtn.addEventListener('click', () => {
    nextVideo(video, player, playBtn, currentTitle, nextTitle);
});
video.ontimeupdate = () => {
    progressUpdate(video, timeCurrent, timeDuration, progress);
};
backwardBtn.addEventListener('click', () => {
    backwardRewind(video, progress, playBtn);
});
forwardBtn.addEventListener('click', () => {
    forwardRewind(video, progress, playBtn);
});