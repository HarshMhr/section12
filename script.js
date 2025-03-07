const Hamm =document.querySelector('.ham');
const Listt =document.querySelector('.list_of_vid');
const Vidmar=document.querySelector(".container");

Hamm.addEventListener('click',()=>{
    Hamm.classList.toggle('active');
    Listt.classList.toggle('active');
    Vidmar.classList.toggle("active");
});

// ------------------------------------------------------

var a=document.querySelectorAll(".zoom ").length;
            var vid_list=["https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/001%20Section%20Overview.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/002%20What%20is%20a%20Pointer.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/003%20Declaring%20Pointers.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/004%20Accessing%20the%20Pointer%20Address%20and%20Storing%20Address%20in%20a%20Pointer.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/005%20Dereferencing%20a%20Pointer.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/006%20Dynamic%20Memory%20Allocation.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/007%20The%20Relationship%20Between%20Arrays%20and%20Pointers.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/008%20Pointer%20Arithmetic.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/010%20Const%20and%20Pointers.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/010%20Const%20and%20Pointers.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/012%20Returning%20a%20Pointer%20from%20a%20Function.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/017%20Potential%20Pointer%20Pitfalls.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/018%20What%20is%20a%20Reference.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/019%20L-values%20and%20R-values.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/020%20Using%20the%20CodeLite%20IDE%20Debugger.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/021%20Section%20Recap.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/022%20Section%20Challenge.mp4", "https://archive.org/download/011-passing-pointers-to-functions/12%20-%20Pointers%20and%20References/023%20Section%20Challenge%20-%20Solution.mp4"];
for (var i=0; i<a;i++){
    document.querySelectorAll(".zoom")[i].addEventListener("click",
        function (){

            var vidIndex= Array.from(document.querySelectorAll(".zoom")).indexOf(this);
            let source = document.getElementById("videoSource");   
            let video = document.getElementById("myVideo");
            source.src = vid_list[vidIndex];
            video.load();
            
        });
}










// -------------------------------------------------



const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
videoTimeline = container.querySelector(".video-timeline"),
progressBar = container.querySelector(".progress-bar"),
volumeBtn = container.querySelector(".volume i"),
volumeSlider = container.querySelector(".left input");
currentVidTime = container.querySelector(".current-time"),
videoDuration = container.querySelector(".video-duration"),
skipBackward = container.querySelector(".skip-backward i"),
skipForward = container.querySelector(".skip-forward i"),
playPauseBtn = container.querySelector(".play-pause i"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options"),
pipBtn = container.querySelector(".pic-in-pic span"),
fullScreenBtn = container.querySelector(".fullscreen i");
let timer;

const hideControls = () => {
    if(mainVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
    }, 3000);
}
hideControls();

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();   
});

const formatTime = time => {
    let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`;
}

videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    const progressTime = videoTimeline.querySelector("span");
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    progressTime.style.left = `${offsetX}px`;
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", e => {
    let {currentTime, duration} = e.target;
    let percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

volumeBtn.addEventListener("click", () => {
    if(!volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.5;
        volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
    }
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

document.addEventListener("click", e => {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show");
    }
});

fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement) {
        fullScreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();
    }
    fullScreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();
});

speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
skipBackward.addEventListener("click", () => mainVideo.currentTime -= 5);
skipForward.addEventListener("click", () => mainVideo.currentTime += 5);
mainVideo.addEventListener("play", () => playPauseBtn.classList.replace("fa-play", "fa-pause"));
mainVideo.addEventListener("pause", () => playPauseBtn.classList.replace("fa-pause", "fa-play"));
playPauseBtn.addEventListener("click", () => mainVideo.paused ? mainVideo.play() : mainVideo.pause());
videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));








