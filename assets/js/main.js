const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const pomos = $$('.pomo-item');

const pomoActive = $('.pomo-item.active');

const pomoTime = $('.pomo-time')

const pomoBtn = $('.pomo-btn-control')

const menuBtn =  $('.navbar-item__menu')

const menuForm = $('.modal')

const menuCloseBtn = $('.menu-form__close-btn')

const encourage = $('.pomo-note__encourage')

const bodyElement = $('body')

const bgSelect = $('#background')

const saveMenuBtn = $('.menu-form__save-btn')

console.log(bgSelect)

function PomoTime(time) {
    this.time = time;
}

const pomoTimes = [
    new PomoTime(25),
    new PomoTime(05),
    new PomoTime(15)
]

function formatTime(time) {
    const minutes = String((time % 1) * 60).padStart(2, '0');
    const seconds = String("00");
    return `${minutes}:${seconds}`;
}

function convertPomoTab() {
    pomos.forEach((pomo, index) => {
        pomo.onclick = function() {
            $('.pomo-item.active').classList.remove('active');
    
            this.classList.add('active');
            pomoTime.textContent = formatTime(pomoTimes[index].time / 60)
        }
    })
}

function StateControl(state) {
    this.state = state;
}

stateControls = [
    new StateControl('Start'),
    new StateControl('Pause'),
    new StateControl('Continue'),
]

let currentStateIdx = 0;

function stateControl() {
    pomoBtn.onclick = function() {
        currentStateIdx = (currentStateIdx + 1) % stateControls.length;
        pomoBtn.textContent = stateControls[currentStateIdx].state
    }
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
    console.log(bg)
    bodyElement.style.backgroundImage = `url('${bg.url}')`;
}

function setTimers() {
    
}

function saveMenuEvent() {
    saveMenuBtn.onclick = function() {
        menuForm.style.display = 'none';
        setBackground();

    }
}

function app() {
    convertPomoTab();

    stateControl();

    renderMenuForm();

    closeMenuForm();

    renderEncourage();

    saveMenuEvent();
}

app();