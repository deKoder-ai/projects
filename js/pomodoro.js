// global variables
const body = document.querySelector('body');
let timerPlayStatus = 0; // play = 1 | pause = 0
let timeLeft = 45 * 60; // initialise work minutes
let session = 1;
let maxSessions = document.getElementById('sessions-input').value;
let focusStatus = 0; // 0 = focus | 1 = break
let finished = 0;

// functions

// zero pad time numbers
function zeroPad(num) {
    return String(num).padStart(2, '0'); // 2 is the minimum length
}
// get and format the current time then fill the html span
function getLocalTimeZone() {
    const localTimeZone = document.getElementById('timezone');
    const dtf = new Intl.DateTimeFormat();
    const timeZone = dtf.resolvedOptions().timeZone;
    const tZ = timeZone.split('/');
    localTimeZone.innerText = `${tZ[1]}`
    // console.log(timeZone); // e.g., "America/Los_Angeles"
}
function updateTime() {
    const currentTimeSpan = document.getElementById("current-time")
    let currentTime = new Date();
    let hours = zeroPad(currentTime.getHours());
    let minutes = zeroPad(currentTime.getMinutes());
    let seconds = zeroPad(currentTime.getSeconds());
    currentTimeSpan.innerText = `${hours}:${minutes}`;
    let timeNow = `${hours}:${minutes}${seconds}`;
    playAlarm(timeNow, getAlarmTimes())
    return timeNow;
};
function getAlarmTimes() {
    const lunchTime = document.getElementById('lunch-alarm-input').value + '00';
    const dinnerTime = document.getElementById('dinner-alarm-input').value + '00';
    const otherTime = document.getElementById('other-alarm-input').value + '00';
    return [lunchTime, dinnerTime, otherTime]
}
function playAlarm(time, src) {
    const audio = new Audio('../sound/alarm-1.mp3');
    if (time === src[0] || time === src[1] || time === src[2]) {
        audio.play();
    }
}
// add tasks to the task list
function addTaskToList() {
    const taskList = document.getElementById('pom-task-list');
    const taskInput = document.getElementById('add-task-input');
    const addListButton = document.querySelector('add-task-btn');
    const taskInputVal = taskInput.value;
    if (taskInputVal !== '') {
        // create a new list item
        const list_item = document.createElement('li');
        const span = document.createElement('span'); // add span for input text
        const div = document.createElement('div');
        div.className += 'pom-list-item'
        // create svg delete button
        const delBtnSVG = document.createElement('img');
        delBtnSVG.setAttributeNS(null, 'src', '../img/x.svg');
        delBtnSVG.className += 'delSVG';
        span.textContent = `${taskInputVal}`; // set span text to input text
        div.appendChild(span);
        div.appendChild(delBtnSVG);
        list_item.appendChild(div);
        taskList.appendChild(list_item);
        delBtnSVG.addEventListener('dblclick', () => {
            list_item.remove();
            taskInput.focus(); // focus cursor back to input box
        });
        delBtnSVG.addEventListener('click', () => {
            list_item.classList.toggle('strike-through');
            // list_item.style.textDecoration = 'line-through';
        });
        taskInput.value = ''; // clear input box
        taskInput.focus(); // focus cursor back to input box
    }
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTaskToList();
        }
    });
}
// check if the timer or sessions inputs are in focus
function checkFocus() {
    const focusInput = document.getElementById('focus-timer-input');
    const breakInput = document.getElementById('break-timer-input');
    const sessionsInput = document.getElementById('sessions-input');
    let actEl = document.activeElement
    if (actEl === focusInput) {
        return true;
    } else if (actEl === breakInput) {
        return true;
    } else if (actEl === sessionsInput) {
        return true;
    } else {
        return false;
    }
}
function checkForActiveInputs() {
    const allInputs = document.querySelectorAll('input');
    const activeElement = document.activeElement
    let inputActive = false;
    for (let i = 0; i < allInputs.length; i++) {
        const node = allInputs[i];
        if (node.id) {
            let elementTemp = document.getElementById(node.id);
            if (elementTemp === activeElement) {
                inputActive = true;
                break;
            }
        }
    }
    return inputActive;
}
function getFocusTimer() {
    return Number(document.getElementById('focus-timer-input').value) * 60; // input minutes to seconds
}
function getBreakTimer() {
    return Number(document.getElementById('break-timer-input').value) * 60;
}
function playSound(type) {
    const breakTime = new Audio("../sound/notification-1.mp3");
    const focusTime = new Audio("../sound/notification-2.mp3");
    if (type === 0) {
        breakTime.play();
    } else if (type === 1) {
        focusTime.play();
    }
}
function formatTimerString() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${zeroPad(minutes)}:${zeroPad(seconds)}`;
}
function updateTimer() {
    // completed code
    if (session > Number(maxSessions)) {
        // clearInterval(interval);
        document.getElementById("timer").innerText = "00:00";
        document.getElementById('session-num').innerText = `Completed ${session - 1} Sessions`;
        finished = 1;
    } else if (timerPlayStatus === 1) {
        formatTimerString();
        timeLeft -= 1;
        if (timeLeft < 0) {
            if (focusStatus === 0) {
                playSound(0);
                timeLeft = getBreakTimer();
                focusStatus = 1;
                document.getElementById('timer-type').innerText = 'Break ';
            } else if (focusStatus === 1) {
                playSound(1);
                timeLeft = getFocusTimer();
                focusStatus = 0;
                document.getElementById('timer-type').innerText = 'Focus ';
                session += 1;
                timerPlayStatus = 0;
                // formatTimerString();
                if (session <= maxSessions) {
                    document.getElementById('session-num').innerText = `${session}`;
                }
            } else {
                // clearInterval(interval);
                finished = 1;
                document.getElementById("timer").innerText = "00:00";
                document.getElementById('session-num').innerText = 'Finished';
            }
        }
    }
}
function timerSessionChangeEventListener() {
    body.addEventListener('change', (event) => {
        let target = event.target;
        switch(target.id) {
            case 'focus-timer-input':
                if (focusStatus === 0) {
                    timeLeft = getFocusTimer();
                }
                break;
            case 'break-timer-input':
                if (focusStatus === 1) {
                    timeLeft = getBreakTimer();
                }
                break;
            case 'sessions-input':
                maxSessions = document.getElementById('sessions-input').value;
                break;
        }
    })
}
function mainClickEventListener() {
    body.addEventListener('click', (event) => {
        let target = event.target;
        switch(target.id) {
            // add new task to the break task list
            case 'add-task-btn':
                addTaskToList();
                break;
            case 'pom-play-btn':
                if (finished === 1) {
                    timeLeft = getFocusTimer();
                    session = 1;
                    document.getElementById('session-num').innerText = `${session}`;
                    maxSessions = document.getElementById('sessions-input').value;
                    finished = 0;
                    timerPlayStatus = 1;
                } else {
                    timerPlayStatus = 1;
                }
                break;
            case 'pom-pause-btn':
                if (timerPlayStatus === 1) {
                    timerPlayStatus = 0;
                } else {
                    timerPlayStatus = 1;
                }
                break;
            case 'pom-refresh-btn':
                if (finished === 1) {
                    timeLeft = getFocusTimer();
                    session = 1;
                    document.getElementById('session-num').innerText = `${session}`;
                    maxSessions = document.getElementById('sessions-input').value;
                    finished = 0;
                    timerPlayStatus = 0;
                } else if(focusStatus === 0) {
                    timeLeft = getFocusTimer();
                    formatTimerString();
                } else if (focusStatus === 1) {
                    timeLeft = getBreakTimer();
                    formatTimerString();
                }
                break;
        }
    });
}
function keydownEventListener() {
    body.addEventListener('keydown', (e) => {
        // start the timer when enter is pushed with timers or session in focus
        if (e.key === 'Enter' && checkFocus()) {
            timerPlayStatus = 1;
            document.getElementById('pause-btn').focus(); // move focus to pause button after enter
        // start/stop the timer on space push unless any inputs are active
        } else if (e.code === 'Space' && !checkForActiveInputs()) {
            if (timerPlayStatus === 1) {
                timerPlayStatus = 0;
            } else {
                timerPlayStatus = 1;
            }
        }
    });
}

// run
timerSessionChangeEventListener()
mainClickEventListener()
keydownEventListener()
const updatePomodoroTimer = setInterval(updateTimer, 1000); // update every 1 second
getLocalTimeZone()
const updateTimeEachSecond = setInterval(updateTime, 1000); // update time each second



// function convertTimeLeftToPc() {
//     let startTime = Number(document.getElementById('focus-timer-input').value) * 60;
//     let temp = Number(timeLeft) * -1;
//     temp += startTime;
//     let temp2 = 100 / startTime;
//     temp *= temp2;
//     return temp;

// }

// function progressAnimation(progress) {
//     const canvas = document.getElementById('progressCanvas');
//     const ctx = canvas.getContext('2d');
//     progress = progress;

//     // Initialize rectangle properties
//     const rectWidth = 200;
//     const rectHeight = 20;
//     const rectX = 10;
//     const rectY = 10;

//     // Animation function
//     function animate(progress) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.fillStyle = 'rgba(255, 105, 180, 0.5)';
//         ctx.fillRect(rectX, rectY, rectWidth * progress, rectHeight);
//         requestAnimationFrame(() => animate(progress + 0.01)); // increment progress
//     }

//     // Start animation
//     animate(0);
// }


// ++ figure out logic for sessions
// ++ add alarms for specific times
// ++ figure out logic to switch between focus and break timer
// ++ spacebar activates pause/play button
// ++ fix bug where spacebar still activates play/pause when typing in an input
// ++ refactor html and css
// ++ add a reset button to reset the current session timer
// ++ fix bug where app cannot be restarted after sessions are complete
// ++ start the timer when enter is pushed with timers or session in focus
// add tooltips to explain single or dblclick on task remove button
// make the page responsive
// figure out flex-shrink property
// put all js into an object?
// add a progress animation



