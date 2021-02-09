// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "100%",
    width: "100%",
    videoId: "ampmDPg4QrM",
    events: {
      onReady: onPlayerReady,
      playVideo
      //onStateChange: onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED && !done) {
    setTimeout(playVideo, 3000); //播放停止後3秒重播
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

function playVideo() {
  var CS = document.getElementById("V_3");
  if (player.getPlayerState() == 1) {
    player.pauseVideo();

    CS.style.animationName = "pause2play";
    CS.style.animationDuration = "1";
    CS.style.clipPath =
      "polygon(30% 25%, 30% 75%, 90% 50%, 30% 25%, 30% 75%, 60% 50%, 48% 50%, 37% 62%, 34% 53%, 33% 36%)";
  } else {
    player.playVideo();
    CS.style.animationName = "play2pause";
    CS.style.animationDuration = "1";
    CS.style.clipPath =
      "polygon(18% 25%,18% 76%,40% 76%,40% 25%,59% 25%,59% 76%,36% 76%,18% 76%,81% 76%,80% 25%)";
  }
}

function Video() {
  var myInt = Math.round(player.getCurrentTime() * 10) / 10;
  var hh = myInt / 60 / 60;
  var mm = myInt / 60;
  var ss = myInt % 60;
  mm = Math.ceil(mm) - 1;
  hh = Math.ceil(hh) - 1;
  ss = Math.round(ss);
  ss = checkTime(ss);
  mm = mm % 60;
  if (mm == -1) {
    mm = 0;
  }
  mm = checkTime(mm);
  if (hh > 0) {
    document.getElementById("time").innerHTML = hh + ":" + mm + ":" + ss;
  } else {
    document.getElementById("time").innerHTML = mm + ":" + ss;
  }
  var timeoutId = setTimeout(Video, 1000);
}
function FVideo() {
  var myInt = Math.round(player.getDuration() * 10) / 10;
  var hh = myInt / 60 / 60;
  var mm = myInt / 60;
  var ss = myInt % 60;
  mm = Math.ceil(mm) - 1;
  hh = Math.round(hh);
  ss = Math.round(ss);
  ss = checkTime(ss);
  mm = mm % 60;
  if (mm == -1) {
    mm = 0;
  }
  mm = checkTime(mm);
  if (hh > 0) {
    document.getElementById("Ftime").innerHTML = hh + ":" + mm + ":" + ss;
  } else {
    document.getElementById("Ftime").innerHTML = mm + ":" + ss;
  }
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function VedioVolume(volume) {
  player.setVolume(volume);
}

var rangeSlider = document.getElementById("voiceslider");
var rangeBullet = document.getElementById("voice");
rangeSlider.addEventListener("input", showSliderValue, false);
function showSliderValue() {
  player.unMute();

  rangeBullet.innerHTML = rangeSlider.value;
  var bulletPosition = rangeSlider.value / rangeSlider.max;
  rangeBullet.style.left = bulletPosition * 578 + "px";
  VedioVolume(rangeSlider.value);
}

function muteVideo() {
  if (player.isMuted() != true) {
    player.mute();
    rangeBullet.innerHTML = "0";
    rangeSlider.value = "0";
    var bulletPosition = rangeSlider.value / rangeSlider.max;
    rangeBullet.style.left = bulletPosition * 578 + "px";
  } else {
    player.unMute();
    getsliderVolume();
    var bulletPosition = rangeSlider.value / rangeSlider.max;
    rangeBullet.style.left = bulletPosition * 578 + "px";
  }
}

function getsliderVolume() {
  rangeBullet.innerHTML = player.getVolume();
  rangeSlider.value = player.getVolume();
}
