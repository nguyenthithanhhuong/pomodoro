const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const pomos = $$('.pomo-item');

const pomoActive = $('.pomo-item.active');

const pomoTime = $('.pomo-time')

const pomoBtn = $('.pomo-btn-control')

const pomoReplay = $('.pomo-btn-replay');

const menuBtn =  $('.navbar-item__menu')

const menuForm = $('.modal')

const menuCloseBtn = $('.menu-form__close-btn')

const encourage = $('.pomo-note__encourage')

const bodyElement = $('body')

const bgSelect = $('#background')

const saveMenuBtn = $('.menu-form__save-btn')

const audio = $('.audio-sound')

const audioSrc = $('.audio-source')

const audioSelect = $('#sound')

const workTimerInput = $('#input-work')
const shortTimerInput = $('#input-short')
const longTimerInput = $('#input-long')

let currentPomoIdx = 0;

function PomoTime(minutes) {
    this.time = minutes * 60;
}

let pomoTimes = [
    new PomoTime(25),
    new PomoTime(05),
    new PomoTime(15)
] 

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function convertPomoTab() {
    pomos.forEach((pomo, index) => {
        pomo.onclick = function() {
            pomoBtn.textContent = "Start";
            $('.pomo-item.active').classList.remove('active');
            this.classList.add('active');
            currentPomoIdx = index;
            pomoTime.textContent = formatTime(pomoTimes[index].time)
            if (currentTimer) {
                clearInterval(currentTimer);
            }
        }
    })
}


function renderMenuForm() {
    menuBtn.onclick = function() {
        menuForm.style.display = 'block';
    }
}

function closeMenuForm() {
    menuCloseBtn.onclick = function() {
        menuForm.style.display = 'none';
    }
}

function Encourage(text) {
    this.text = text;
}

encourages = [
    new Encourage('Don’t constantly watch the clock; take action and persevere.'),
    new Encourage('On the journey to success, there is no sign of laziness.'),
    new Encourage('The quality of your life improves only when you enhance yourself.'),
    new Encourage('The best way to predict your future is to create it.'),
    new Encourage('If you are not satisfied with the path you are on, start building a different one.')
]

function renderEncourage() {
    const randomIndex = Math.floor(Math.random() * encourages.length);
    encourage.textContent = encourages[randomIndex].text;
}

function Background(url) {
    this.url = url;
}

backgrounds = [
    new Background('/assets/img/bg01.png'),
    new Background('/assets/img/bg02.png'),
    new Background('/assets/img/bg03.png')
]

function setBackground() {
    const bgIdx = bgSelect.options.selectedIndex;
    const bg = backgrounds[bgIdx];
    bodyElement.style.backgroundImage = `url('${bg.url}')`;
}

function Audio(url) {
    this.url = url;
}

const audios = [
    new Audio('./assets/audio/aesthetics.mp3'),
    new Audio('./assets/audio/goodnight.mp3')
]

function setAudio() {
    const audioIdx = audioSelect.options.selectedIndex;
    const audioCurent = audios[audioIdx];
    audioSrc.src = audioCurent.url;
    audio.load();
    audio.play();
}

function setTimers() {
    const workTimer = workTimerInput.value
    const shortTimer = shortTimerInput.value
    const longTimer = longTimerInput.value

    if (workTimer < 25 || workTimer > 75) {
        workTimer = 25;
    }

    if (shortTimer < 5 || shortTimer > 15) {
        shortTimer = 5;
    }

    if (longTimer < 15 || longTimer > 45) {
        longTimer = 10;
    }

    pomoTimes = [
        new PomoTime(parseInt(workTimer)),
        new PomoTime(parseInt(shortTimer)),
        new PomoTime(parseInt(longTimer))
    ];

    pomoTime.textContent = formatTime(pomoTimes[0].time)

    if (pomos[0] !== $('.pomo-item.active')) {
        $('.pomo-item.active').classList.remove('active');
        pomos[0].classList.add('active');
        pomoBtn.textContent = "Start";
        clearInterval(currentTimer);
        pomoTime.textContent = formatTime(pomoTimes[0].time);
    }
}

function saveMenuEvent() {
    saveMenuBtn.onclick = function() {
        menuForm.style.display = 'none';
        setBackground();
        setAudio();
        setTimers();
    }
}

let currentTimer;

function countdownTime() {
    pomoBtn.onclick = function() {    
        if (pomoBtn.textContent === "Start") {
            pomoBtn.textContent = "Pause";
            if (currentTimer) {
                clearInterval(currentTimer);
            }

            let timeRemaining = pomoTimes[currentPomoIdx].time;

            currentTimer = setInterval(function() {
                if (timeRemaining <= 0) {
                    pomoBtn.textContent = "Start";
                    pomoTime.textContent = formatTime(pomoTimes[currentPomoIdx].time);
                    clearInterval(currentTimer);
                } else {
                    timeRemaining--;
                    pomoTime.textContent = formatTime(timeRemaining);    
                }
           }, 1000);
        } else if (pomoBtn.textContent === "Pause") {
            pomoBtn.textContent = "Start";
            clearInterval(currentTimer);
            pomoTime.textContent = formatTime(pomoTimes[currentPomoIdx].time);
        }
        
    }
}

function replayTimer() {
    pomoReplay.onclick = function() {
        pomoBtn.textContent = "Start";
        clearInterval(currentTimer);
        pomoTime.textContent = formatTime(pomoTimes[currentPomoIdx].time);
    }
}

function app() {
    saveMenuEvent();

    convertPomoTab();

    renderMenuForm();

    closeMenuForm();

    renderEncourage();

    countdownTime();

    replayTimer();
}

app();

