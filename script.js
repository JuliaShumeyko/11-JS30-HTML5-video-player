const player = document.querySelector('.player');
const video = player.querySelector('.viewer');  
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const togglePlay = () => {
    video.paused ? video.play() : video.pause();
};

const updateButton = () => {
    video.paused ? toggle.textContent = '►' : toggle.textContent = '❚ ❚';
}

const skip = (e) => {
    e.target.dataset.skip === '-10' ? video.currentTime -= 10 : video.currentTime += 25;
}

const handleRangeUpdate = (e) => {
    video[e.target.name] = e.target.value;
}

const handleProgress = (e) => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

const scrub = (e) => {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e)); // if mousedown is true, it will move on to the scrub function
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);













