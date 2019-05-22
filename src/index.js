import {MediaPlayer} from 'dashjs';

let url = "http://demo.unified-streaming.com/video/ateam/ateam.ism/ateam.mpd";
let player = MediaPlayer().create();
player.initialize(document.querySelector('#myMainVideoPlayer'), url, true);
