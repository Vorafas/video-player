const checkPlayer = function(video, playBtn){
    if(video.paused){
        video.pause();
        playBtn.querySelector('.icon-btn').innerHTML = `<i class="fas fa-play"></i>`;
        
    }else{
        video.play();
        playBtn.querySelector('.icon-btn').innerHTML = `<i class="fas fa-pause"></i>`;
    }
}

const togglePlayer = function(video, playBtn){
    if(video.paused){
        video.play();
        playBtn.querySelector('.icon-btn').innerHTML = `<i class="fas fa-pause"></i>`;
    }else{
        video.pause();
        playBtn.querySelector('.icon-btn').innerHTML = `<i class="fas fa-play"></i>`;
    }
}

const format = function(duration, currentTime, timeCurrent, timeDuration){
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    timeCurrent.textContent = `${currentMinutes > 9 ? currentMinutes : '0'+ currentMinutes}:${currentSeconds > 9 ? currentSeconds : '0' + currentSeconds}`;
    timeDuration.textContent = `${durationMinutes > 9 ? durationMinutes : '0' + durationMinutes}:${durationSeconds > 9 ? durationSeconds : '0' + durationSeconds}`;
}

const progressUpdate = function(duration, currentTime, timeCurrent, timeDuration, progress){
    format(duration, currentTime, timeCurrent, timeDuration);
    let d = duration;
    let c = currentTime;
    progress.style.width = `${(100 * c) / d}%`; 
}

export { checkPlayer, togglePlayer, progressUpdate};