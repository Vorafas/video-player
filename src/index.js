import {MediaPlayer} from 'dashjs';

import './index.css';

const url = "http://demo.unified-streaming.com/video/ateam/ateam.ism/ateam.mpd";
const player = MediaPlayer().create();
player.initialize(document.querySelector('.video-player'), url, true);
