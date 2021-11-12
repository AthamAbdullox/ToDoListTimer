// timer's Credit: Mateusz Rybczonec
// timer link
items = JSON.parse(localStorage.getItem("TODO"))

// variables
var TIME_LIMIT = [];
var createItem = '';
let timeLeft = [];
for(var i=0; i < items.length; i++) {
  TIME_LIMIT[i] =items[i].time*60;
  if(items[i].timer){
  timeLeft[i] = items[i].timer*60;}
  else {
  timeLeft[i] = items[i].time*60;}}
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = Math.floor(3*TIME_LIMIT[0] / 4);
const ALERT_THRESHOLD = Math.floor(TIME_LIMIT[0] / 4);


const COLOR_CODES = {
  info: {
    color: "red"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "green",
    threshold: ALERT_THRESHOLD
  }
};
let remainingPathColor = COLOR_CODES.info.color;



//Create all items
for(var i=0; i < items.length; i++) {

createItem += `
<div class="container card" style="width:90%;">
    <div class="card-img-top">
      <div class="card-img-top">
    <div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft[i]
  )}</span>


    </div>
      </div>
    <div class="card-body body">
      <h5 class="card-title">${items[i].name}</h5>
      <button href="#" class="btn btn-danger btn-lg btnStop">STOP</button>
      <button href="#" class="btn btn-success btn-lg btnStart">START</button>
    </div>
    </div>
  </div>
`;};

document.getElementById("app").innerHTML = createItem;





var btnStop = '';
var btnStart = '';
    btnStop = document.querySelectorAll('.btnStop')

let timePassed = 0;
let timerInterval = null;



const startListener = (items) => {
    btnStart[i].addEventListener('click',function() {
    startTimer(items,timeLeft[items.id]);
    document.getElementsByClassName('body')[items.id].appendChild(btnStop[items.id]);
    btnStart[items.id].remove();
    });
}


for (var i = 0; i < items.length; i++) {

    btnStop[i].remove();
    btnStart  =document.querySelectorAll('.btnStart');
    startListener(items[i]);
  }
    

    /*document.querySelectorAll('.body')[i].appendChild(`
      <button href="#" class="btn btn-danger btn-lg btnStop">STOP</button>
      `);
    btnStart.remove();*/





function onTimesUp() {
  clearInterval(timerInterval);
  document.getElementById('body').appendChild(btnStart);
  btnStop.remove();
}

function startTimer(ite) {
  timerInterval = setInterval(() => {
    // change start button to stop
  btnStop[ite.id].addEventListener('click',function() {   
      document.querySelectorAll('.body')[ite.id].appendChild(btnStart[ite.id])
      btnStop[ite.id].remove();
      clearInterval(timerInterval);
    });
    //
    timeLeft[ite.id]--;
    /*timePassed = timePassed += 1;
    timeLeft[ite.id] = TIME_LIMIT[ite.id] - timePassed;*/
    items[ite.id].timer =  timeLeft[ite.id]/60;
    localStorage.setItem("TODO", JSON.stringify(items));


    document.getElementsByClassName("base-timer__label")[ite.id].innerHTML = formatTime(timeLeft[ite.id]);
    setCircleDasharray(ite.id);
    setRemainingPathColor(timeLeft[ite.id],ite.id);
    if (timeLeft[ite.id] === 0) {
      onTimesUp();
    }
  }, 1000);
}



function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft,id) {
  const { alert, warning, info } = COLOR_CODES;


  if (timeLeft <= alert.threshold) {
    document
      .getElementsByClassName("base-timer__path-remaining")[id]
      .classList.remove(warning.color);
    document
      .getElementsByClassName("base-timer__path-remaining")[id]
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementsByClassName("base-timer__path-remaining")[id]
      .classList.remove(info.color);
    document
      .getElementsByClassName("base-timer__path-remaining")[id]
      .classList.add(warning.color);
  }
}

function calculateTimeFraction(id) {
  var rawTimeFraction = timeLeft[id] / TIME_LIMIT[id];
  return rawTimeFraction - (1 / TIME_LIMIT[id]) * (1 - rawTimeFraction);
}

function setCircleDasharray(id) {
  const circleDasharray = `${(
    calculateTimeFraction(id) * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementsByClassName("base-timer__path-remaining")[id]
    .setAttribute("stroke-dasharray", circleDasharray);
}