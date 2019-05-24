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

const rewindPlayer = function(video, progress, playBtn){
    const forward = (video.duration / 100) * 15;
    if((video.currentTime + forward) >= video.duration){
        if(video.currentTime === video.duration)
            return;
        progress.style.width = `100%`;
        video.pause();
        video.currentTime = video.duration; 
        playBtn.querySelector('.icon-btn').innerHTML = pauseIcon;
        checkPlayer(video, playBtn);
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
        checkPlayer(video, playBtn);
    }
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
    const durationMinutes = Math.floor(video.duration / 60);
    const durationSeconds = Math.floor(video.duration % 60);
    const currentMinutes = Math.floor(video.currentTime / 60);
    const currentSeconds = Math.floor(video.currentTime % 60);
    timeCurrent.textContent = `${currentMinutes > 9 ? currentMinutes : '0'+ currentMinutes}:${currentSeconds > 9 ? currentSeconds : '0' + currentSeconds}`;
    timeDuration.textContent = `${durationMinutes > 9 ? durationMinutes : '0' + durationMinutes}:${durationSeconds > 9 ? durationSeconds : '0' + durationSeconds}`;
}

const progressUpdate = function(video, timeCurrent, timeDuration, progress, playBtn){
    format(video, timeCurrent, timeDuration);
    let d = video.duration;
    let c = video.currentTime;
    progress.style.width = `${(100 * c) / d}%`;
    checkPlayer(video, playBtn);
}

export { checkPlayer, togglePlayer, progressUpdate, rewindPlayer};