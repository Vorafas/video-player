import dashjs from 'dashjs';
import dummyData from './dummy-data';

const playIcon =  `<i class="fas fa-play"></i>`;
const pauseIcon = `<i class="fas fa-pause"></i>`;
const playBtn = document.querySelector('.play-btn');
const offsetProgress = 0;
let index = 0;

const videoInit = function(player, video, currentTitle, nextTitle){
    player.initialize(video, dummyData[index].url, false);
    player.setAutoSwitchQualityFor("video", false);  
    currentTitle.querySelector('.current-video-title p').textContent = dummyData[index].title;
    nextTitle.querySelector('.next-video-title p').textContent = dummyData[index + 1].title;
}

const videoRewind = function(seekContainer, video, progress, evt){
    const widthSeekbar = seekContainer.offsetWidth;
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
    checkPlayer(video);
}

const checkPlayer = function(video){
    if(video.paused){
        video.pause();
        playBtn.querySelector('.icon-btn').innerHTML = playIcon;
        
    }else{
        video.play();
        playBtn.querySelector('.icon-btn').innerHTML = pauseIcon;
    }
}

const closeVideo = function(video, videoContainer){
    video.pause();
    checkPlayer(video);
    videoContainer.classList.toggle('hide-container');
    document.body.classList.toggle('bg');
}

const nextVideo = function(video, player, currentTitle, nextTitle){
    index++;
    if(index >= dummyData.length){
        index = dummyData.length - 1;
        return;
    }
    video.pause();
    video.currentTime = 0;
    player.attachSource(dummyData[index].url);
    currentTitle.querySelector('.current-video-title p').textContent = dummyData[index].title;
    if(dummyData[index + 1]){
        nextTitle.classList.remove('hide');
        nextTitle.querySelector('.next-video-title p').textContent = dummyData[index + 1].title;
    }
    else nextTitle.classList.add('hide');
    video.play().then(_ => checkPlayer(video));
}

const removeClass = function (videoDescription, videoController){
    videoDescription.classList.remove('hide');
    videoController.classList.remove('hide');
}

const addClass = function (videoDescription, videoController){
    videoDescription.classList.add('hide');
    videoController.classList.add('hide');
}

const prevVideo = function(video, player, currentTitle, nextTitle){
    index--;
    if(index < 0){
        index = 0;
        return;
    }
    video.pause();
    video.currentTime = 0;
    player.attachSource(dummyData[index].url);
    currentTitle.querySelector('.current-video-title p').textContent = dummyData[index].title;
    if(dummyData[index + 1]){
        nextTitle.classList.remove('hide');
        nextTitle.querySelector('.next-video-title p').textContent = dummyData[index + 1].title;
    }
    video.play().then(_ => checkPlayer(video));
}

const forwardRewind = function(video, progress, seekbarTime){
    const forward = (video.duration / 100) * 15;
    if((video.currentTime + forward) >= video.duration){
        if(video.currentTime === video.duration)
            return;
        progress.style.width = `100%`;
        video.pause();
        video.currentTime = video.duration;
    }else{
        if(video.paused){
            progress.style.width += 15;
            video.currentTime += forward;
        }else{
            progress.style.width += 15;
            video.pause();
            video.currentTime += forward;
            video.play();
        }
    }
    checkPlayer(video);
}

const backwardRewind = function(video, progress){
    const forward = (video.duration / 100) * 15;
    if((video.currentTime - forward) <= 0){
        progress.style.width = `0%`;
        video.pause();
        video.currentTime = 0;
        if(!video.paused){
            video.play();
        }
    }else{
        if(video.paused){
            progress.style.width -= 15;
            video.currentTime -= forward;
        }else{
            progress.style.width -= 15;
            video.pause();
            video.currentTime -= forward;
            video.play();
        }
    }
    checkPlayer(video);
}

const fastForwardVideo = function(video, progress){
    const forward = 5;
    if((video.currentTime + forward) >= video.duration){
        if(video.currentTime === video.duration)
            return;
        progress.style.width = `100%`;
        video.pause();
        video.currentTime = video.duration;
    }else{
        if(video.paused){
            video.currentTime += forward;
        }else{
            video.pause();
            video.currentTime += forward;
            video.play();
        }
    }
    checkPlayer(video);
}

const togglePlayer = function(video, videoDescription){
    if(video.paused){
        video.play();
        playBtn.querySelector('.icon-btn').innerHTML = pauseIcon;
        videoDescription.classList.remove('hide');
    }else{
        video.pause();
        playBtn.querySelector('.icon-btn').innerHTML = playIcon;
    }
}

const format = function(video, timeCurrent, timeDuration, seekbarTime){
    let durationHours = Math.floor(video.duration / 3600  % 24);
    let durationSeconds = Math.floor(video.duration % 60);
    let durationMinutes = Math.floor(video.duration / 60 % 60);

    let currentHours = Math.floor(video.currentTime / 3600  % 24);
    let currentMinutes = Math.floor(video.currentTime / 60 % 60);
    let currentSeconds = Math.floor(video.currentTime % 60);

    durationHours = isNaN(durationHours) ? 0 : durationHours;
    durationSeconds = isNaN(durationSeconds) ? 0 : durationSeconds;
    durationMinutes = isNaN(durationMinutes) ? 0 : durationMinutes;
    const сurrentVideoTime = `${currentHours === 0 ? '' : currentHours > 9 ? currentHours : '0'+ currentHours+':'}${currentMinutes > 9 ? currentMinutes : '0'+ currentMinutes}:${currentSeconds > 9 ? currentSeconds : '0' + currentSeconds}`;
    seekbarTime.textContent = сurrentVideoTime;
    timeCurrent.textContent = сurrentVideoTime;
    timeDuration.textContent = `${durationHours === 0 ? '' : durationHours > 9 ? durationHours : '0'+ durationHours+':'}${durationMinutes > 9 ? durationMinutes : '0' + durationMinutes}:${durationSeconds > 9 ? durationSeconds : '0' + durationSeconds}`;
}

const progressUpdate = function(video, timeCurrent, timeDuration, progress, player, currentTitle, nextTitle, seekbarTime){
    if(video.currentTime === video.duration){
        nextVideo(video, player, currentTitle, nextTitle);
        checkPlayer(video);
    }else{
        format(video, timeCurrent, timeDuration, seekbarTime);
        let d = video.duration;
        let c = video.currentTime;
        progress.style.width = `${(100 * c) / d}%`;
        seekbarTime.style.left = `${progress.clientWidth - 25}px`;
    }
}

export { checkPlayer, togglePlayer, progressUpdate, forwardRewind, fastForwardVideo, backwardRewind, closeVideo, nextVideo, prevVideo, videoInit, videoRewind, removeClass, addClass };