const timeStamp = $(".timestamp");
const startBtn = $(".pomodoro__box .start");
const stopBtn = $(".pomodoro__box .stop");
const skipBtn = $(".pomodoro__box .skip");
const pomodoroMode = $(".period .study");
const shortBreakMode = $(".period .s-break");
const longBreakMode = $(".period .l-break");
const pomodoroDuration = $(".pomodoro-duration .setting-input");
const shortBreakDuration = $(".short-duration .setting-input");
const longBreakDuration = $(".long-duration .setting-input");
const acceptSettingBtn = $(".setting__modal .setting-btn");
const treeImage = $(".pomodoro .circle .image");
const timeUpAudio = $(".time-up");
let isCountDown = false;
let countDown,
  imageIndex = 0;
let countBreak = 0;

// default value
// timeStamp.innerHTML = `${pomodoroDuration.value}:00`
// stopBtn.classList.toggle('hidden');
// skipBtn.classList.add('hidden');
let time, startingMinutes;
let mode = "pomodoro";
stopBtn.classList.toggle("hidden");
skipBtn.classList.add("hidden");
// startingMinutes =  Math.floor(Number(pomodoroDuration.value));
// time = startingMinutes * 60;

// EVENT

// 3 mode (pomodoro)
pomodoroMode.addEventListener("click", function () {
  mode = "pomodoro";
  pomodoroSettingTime();
  stopCountDown();
});
shortBreakMode.addEventListener("click", function () {
  mode = "shortbreak";
  shortBreakSettingTime();
  stopCountDown();
});
longBreakMode.addEventListener("click", function () {
  mode = "longbreak";
  longBreakSettingTime();
  stopCountDown();
});
// when click start
startBtn.addEventListener("click", function () {
  isCountDown = true;
  startCountDown();
});
// when click stop
stopBtn.addEventListener("click", function () {
  isCountDown = false;
  stopCountDown();
});
skipBtn.addEventListener("click", function () {
  time = 0;
  setTimeout(stopCountDown, 1000);
});

// FUNCTION

// add time html and setting countDown time
function pomodoroSettingTime() {
  console.log(1);
  timeStamp.innerHTML = `${pomodoroDuration.value}:00`;
  startingMinutes = Math.ceil(Number(pomodoroDuration.value));
  time = startingMinutes * 60;
  pomodoroMode.classList.add("active");
  shortBreakMode.classList.remove("active");
  longBreakMode.classList.remove("active");
  imageIndex = 0;
  changeTreeImage(imageIndex);
  // test case 2
  // timeStamp.innerHTML = `00:15`
  // startingMinutes = 0.25;
  // time =15;
}
function shortBreakSettingTime() {
  console.log(2);
  timeStamp.innerHTML = `${shortBreakDuration.value}:00`;
  startingMinutes = Math.ceil(Number(shortBreakDuration.value));
  time = startingMinutes * 60;
  pomodoroMode.classList.remove("active");
  shortBreakMode.classList.add("active");
  longBreakMode.classList.remove("active");
  changeShortBreakImage();
  // test case
  // timeStamp.innerHTML = `00:15`
  // startingMinutes = 0.25;
  // time =15;
}
function longBreakSettingTime() {
  console.log(3);
  timeStamp.innerHTML = `${longBreakDuration.value}:00`;
  startingMinutes = Math.ceil(Number(longBreakDuration.value));
  time = startingMinutes * 60;
  pomodoroMode.classList.remove("active");
  shortBreakMode.classList.remove("active");
  longBreakMode.classList.add("active");
  changeLongBreakImage();
  // test case
  // timeStamp.innerHTML = `00:15`
  // startingMinutes = 0.25;
  // time =15;
}
// start and stop countdown function
function startCountDown() {
  countDown = setInterval(updateCountdown, 1000);
  startBtn.classList.add("hidden");
  stopBtn.classList.remove("hidden");
  skipBtn.classList.remove("hidden");
}
function stopCountDown() {
  clearInterval(countDown);
  startBtn.classList.remove("hidden");
  stopBtn.classList.add("hidden");
  skipBtn.classList.add("hidden");
}
function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60 < 10 ? "0" + (time % 60) : time % 60;
  time--;
  // Progress CountDown
  let progressPercent =
    ((startingMinutes * 60 - time) * 100) / (startingMinutes * 60);
  //console.log(startingMinutes, startingMinutes*60 - time, progressPercent)
  checkProgress(progressPercent);
  timeStamp.innerHTML = `${minutes}:${seconds}`;

  //When countDown = 0;
  if (time === -1) {
    timeUpAudio.play();
    if (mode == "pomodoro") {
      plantOneTree();
      countBreak += 1;
      console.log(countBreak, "index");
      if (countBreak === 3) {
        mode = "longbreak";
        countBreak = 0;
        longBreakSettingTime();
      } else {
        mode = "shortbreak";
        shortBreakSettingTime();
      }
    } else if (mode == "shortbreak" || mode == "longbreak") {
      mode = "pomodoro";
      pomodoroSettingTime();
    }
  }
}
function checkProgress(percent) {
  let percentRound = Math.floor(percent);
  let index = Math.floor(percentRound / 4);
  if (imageIndex != index && mode == "pomodoro") {
    imageIndex = index;
    changeTreeImage(imageIndex);
  } else if (mode == "shortbreak") {
    changeShortBreakImage();
  } else if (mode == "longbreak") {
    changeLongBreakImage();
  }
}

function changeTreeImage(index) {
  if (index > 25) index = 25;
  treeImage.style.backgroundImage = `url(./images/tree/tree-${index}.png)`;
}
function changeShortBreakImage() {
  treeImage.style.backgroundImage = `url(./images/tree/tree-25.png)`;
}
function changeLongBreakImage() {
  treeImage.style.backgroundImage = `url(./images/panda.gif)`;
}
function plantOneTree() {
  $(".profile-tree .amount").value =
    Number($(".profile-tree .amount").value) + 1;
}
