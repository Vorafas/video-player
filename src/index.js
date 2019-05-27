import dashjs from 'dashjs';
import { checkPlayer, togglePlayer, progressUpdate, forwardRewind, backwardRewind, closeVideo, nextVideo, prevVideo, videoInit, videoRewind, removeClass, addClass } from './lib';
import './index.css';

const video = document.querySelector('#video-player'),
videoController = document.querySelector('.video-controller'),
videoDescription = document.querySelector('.video-description'),
playBtn = document.querySelector('.play-btn'),
progress = document.querySelector('.seekbar-play'),
seekContainer = document.querySelector('.seekbar'),
timeDuration = document.querySelector('.time-duration p'),
timeCurrent = document.querySelector('.time-current'),
backwardBtn = document.querySelector('.backward-btn'),
forwardBtn = document.querySelector('.forward-btn'),
closeBtn = document.querySelector('.close-button'),
settingsQuality = document.querySelector('.settings-quality'),
videoContainer = document.querySelector('.video-container'),
currentTitle = document.querySelector('.current-video'),
nextTitle = document.querySelector('.next-video'),
prevBtn = document.querySelector('.prev-btn'),
nextBtn = document.querySelector('.next-btn'),
btnFocus = document.querySelectorAll('.btn-focus');
let index = 0;
let idleTimer = null;
let idleState = false; // состояние отсутствия
let idleWait = 10000; // время ожидания в мс. (1/1000 секунды)


const player = dashjs.MediaPlayer().create();
videoInit(player, video, currentTitle, nextTitle);

const checkState = function(){
    clearTimeout(idleTimer); // отменяем прежний временной отрезок
    idleState = false;
    idleTimer = setTimeout(function(){ 
        videoDescription.classList.add('hide');
        videoController.classList.add('hide');
        idleState = true; 
    }, idleWait);
}
const nextFocus = function(){
    ++index;
    if(index > btnFocus.length - 1){
        index = 0;
    }
    btnFocus[index].focus();
}
const prevFocus = function(){
    --index;
    if(index < 0){
        index = btnFocus.length - 1;
    }
    btnFocus[index].focus();
}
seekContainer.addEventListener('click', (evt) => {
    videoRewind(seekContainer, video, progress, evt);
});
playBtn.addEventListener('click', () => {
    togglePlayer(video);
});
closeBtn.addEventListener('click', () => {
    closeVideo(video, videoContainer);
});
document.addEventListener('keydown', (evt) => {
    if(evt.keyCode ===  82)
        closeVideo(video, videoContainer);
    if(evt.keyCode === 9)
        evt.preventDefault();
    if(evt.keyCode === 9 && evt.keyCode === 16)
        evt.preventDefault();
    if(evt.keyCode === 39){
        removeClass(videoDescription, videoController);
        nextFocus();
    }
    if(evt.keyCode === 37){
        removeClass(videoDescription, videoController);
        prevFocus();
    }
    if(evt.keyCode === 8)
        addClass(videoDescription, videoController);
});
prevBtn.addEventListener('click', () => {
    prevVideo(video, player, currentTitle, nextTitle);
});
nextBtn.addEventListener('click', () => {
    nextVideo(video, player, currentTitle, nextTitle);
});
video.ontimeupdate = () => {
    progressUpdate(video, timeCurrent, timeDuration, progress, player, currentTitle, nextTitle);
};
backwardBtn.addEventListener('click', () => {
    backwardRewind(video, progress);
});
forwardBtn.addEventListener('click', () => {
    forwardRewind(video, progress);
});
document.addEventListener('mousemove', checkState);
document.addEventListener('keydown', checkState);
document.addEventListener('scroll', checkState);