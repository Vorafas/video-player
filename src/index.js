import dashjs from 'dashjs';
import { fastForwardVideo, togglePlayer, progressUpdate, forwardRewind, backwardRewind, closeVideo, nextVideo, prevVideo, videoInit, videoRewind, removeClass, addClass } from './lib';
import KeyCode from './constants';
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
videoContainer = document.querySelector('#video-container'),
currentTitle = document.querySelector('.current-video'),
nextTitle = document.querySelector('.next-video'),
prevBtn = document.querySelector('.prev-btn'),
nextBtn = document.querySelector('.next-btn'),
btnFocus = document.querySelectorAll('.btn-focus'),
seekbarTime = document.querySelector('.seekbar-time');
let index = 0;
let isFocus = false;
let idleTimer = null;
let idleState = false; // состояние отсутствия
let idleWait = 10000; // время ожидания в мс. (1/1000 секунды)
let isBitrate = false;

const player = dashjs.MediaPlayer().create();
videoInit(player, video, currentTitle, nextTitle);

const checkState = function(){
    clearTimeout(idleTimer); // отменяем прежний временной отрезок
    idleState = false;
    idleTimer = setTimeout(function(){ 
        addClass(videoDescription, videoController);
        idleState = true; 
    }, idleWait);
}
const nextFocus = function(){
    ++index;
    if(index > btnFocus.length - 1)
        index = 0;
    btnFocus[index].focus();
}
const prevFocus = function(){
    --index;
    if(index < 0)
        index = btnFocus.length - 1;
    btnFocus[index].focus();
}
const changeQuality = function(){
    if(!isBitrate){
        const bitrates = player.getBitrateInfoListFor("video");  //returns successfully
        player.setInitialBitrateFor('video', 0);
        player.setAutoSwitchQualityFor('video', false);
        player.setQualityFor('video', 0);  
        isBitrate = true;
    }else{
        const bitrates = player.getBitrateInfoListFor("video");  //returns successfully
        player.setInitialBitrateFor('video', 0);
        player.setAutoSwitchQualityFor('video', false);
        player.setQualityFor('video', bitrates[bitrates.length - 1].qualityIndex);  
        isBitrate = false;
    }
}
settingsQuality.addEventListener('click', changeQuality);
checkState();
seekContainer.addEventListener('click', (evt) => {
    videoRewind(seekContainer, video, progress, evt);
});
playBtn.addEventListener('click', () => {
    togglePlayer(video, videoDescription);
});
closeBtn.addEventListener('click', () => {
    closeVideo(video, videoContainer);
});
document.addEventListener('keydown', (evt) => {
    if(!video.paused && (evt.keyCode === KeyCode.ARROW_DOWN || 
        evt.keyCode === KeyCode.ARROW_UP ||
        evt.keyCode === KeyCode.ARROW_LEFT ||
        evt.keyCode === KeyCode.ARROW_RIGHT ||
        evt.keyCode === KeyCode.ENTER) && videoController.classList.contains("hide")){
           videoDescription.classList.remove('hide'); 
    }
    if(evt.keyCode ===  KeyCode.KEY_R)
        closeVideo(video, videoContainer);
    if(evt.keyCode === KeyCode.TAB)
        evt.preventDefault();
    if(evt.keyCode === KeyCode.TAB && evt.keyCode === KeyCode.SHIFT)
        evt.preventDefault();
    if(evt.keyCode === KeyCode.BACKSPACE)
        addClass(videoDescription, videoController)
    if(evt.keyCode === KeyCode.ARROW_RIGHT){
        videoController.classList.remove('hide');
        if(isFocus){
            fastForwardVideo(video, progress);
        }else
            nextFocus();
    }
    if(evt.keyCode === KeyCode.ARROW_LEFT){
        videoController.classList.remove('hide');
        if(isFocus){
            backwardRewind(video, progress);
        }else
            prevFocus();
    }
    if(evt.keyCode === KeyCode.ARROW_UP){
        videoController.classList.remove('hide');
        if(document.activeElement === progress){
            seekbarTime.classList.add('hide');
            isFocus = false;
            btnFocus[index].focus();
        }else{
            seekbarTime.classList.remove('hide');
            progress.focus();
            isFocus = true; 
        }
    }
    if(evt.keyCode === KeyCode.ARROW_DOWN){
        videoController.classList.remove('hide');
        if(document.activeElement === progress){
            seekbarTime.classList.add('hide');
            isFocus = false;
            btnFocus[index].focus();
        }else{
            seekbarTime.classList.remove('hide');
            progress.focus();
            isFocus = true; 
        }
    }
    if(evt.keyCode === KeyCode.KEY_Y){
        changeQuality();
    }
    if(evt.keyCode === KeyCode.ENTER){
        videoController.classList.remove("hide");
        document.activeElement.click();
    }        
});
prevBtn.addEventListener('click', () => {
    prevVideo(video, player, currentTitle, nextTitle);
});
nextBtn.addEventListener('click', () => {
    nextVideo(video, player, currentTitle, nextTitle);
});
video.ontimeupdate = (evt) => {
    progressUpdate(video, timeCurrent, timeDuration, progress, player, currentTitle, nextTitle, seekbarTime);
};
backwardBtn.addEventListener('click', () => {
    backwardRewind(video, progress);
});
forwardBtn.addEventListener('click', () => {
    forwardRewind(video, progress, seekbarTime);
});
video.addEventListener('mousemove', ()=>{
    videoController.classList.remove('hide');
});
document.body.addEventListener('mousemove', checkState);
document.body.addEventListener('keydown', checkState);
document.body.addEventListener('scroll', checkState);