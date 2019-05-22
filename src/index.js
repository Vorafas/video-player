import dashjs from 'dashjs';

import './index.css';

const video = document.querySelector('#video-player');
const url = "http://dash.edgesuite.net/dash264/TestCases/1a/sony/SNE_DASH_SD_CASE1A_REVISED.mpd";
const player = dashjs.MediaPlayer().create();
player.initialize(video, url, true);
