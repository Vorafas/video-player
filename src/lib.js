const playIcon =  `<i class="fas fa-play"></i>`;
const pauseIcon = `<i class="fas fa-pause"></i>`;

const checkPlayer = function(video, playBtn){
    if(video.paused){
        video.pause();
        playBtn.querySelector('.icon-btn').innerHTML = playIcon;
        
    }else{
        video.play();
        playBtn.querySelector('.icon-btn').innerHTML = pauseIcon;
    }
}

const forwardRewind = function(video, progress, playBtn){
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
    checkPlayer(video, playBtn);
}

const backwardRewind = function(video, progress, playBtn){
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
    checkPlayer(video, playBtn);
}

const togglePlayer = function(video, playBtn){
    if(video.paused){
        video.play();
        playBtn.querySelector('.icon-btn').innerHTML = pauseIcon;
    }else{
        video.pause();
        playBtn.querySelector('.icon-btn').innerHTML = playIcon;
    }
}

const format = function(video, timeCurrent, timeDuration){
    const durationHours = Math.floor(video.duration / 3600  % 24);
    const durationSeconds = Math.floor(video.duration % 60);
    const durationMinutes = Math.floor(video.duration / 60 % 60);

    const currentHours = Math.floor(video.currentTime / 3600  % 24);
    const currentMinutes = Math.floor(video.currentTime / 60 % 60);
    const currentSeconds = Math.floor(video.currentTime % 60);
    
    timeCurrent.textContent = `${currentHours === 0 ? '' : currentHours > 9 ? currentHours : '0'+ currentHours+':'}${currentMinutes > 9 ? currentMinutes : '0'+ currentMinutes}:${currentSeconds > 9 ? currentSeconds : '0' + currentSeconds}`;
    timeDuration.textContent = `${durationHours === 0 ? '' : durationHours > 9 ? durationHours : '0'+ durationHours+':'}${durationMinutes > 9 ? durationMinutes : '0' + durationMinutes}:${durationSeconds > 9 ? durationSeconds : '0' + durationSeconds}`;
}

const progressUpdate = function(video, timeCurrent, timeDuration, progress, playBtn){
    format(video, timeCurrent, timeDuration);
    let d = video.duration;
    let c = video.currentTime;
    progress.style.width = `${(100 * c) / d}%`;
    //checkPlayer(video, playBtn);
}

export { checkPlayer, togglePlayer, progressUpdate, forwardRewind, backwardRewind};