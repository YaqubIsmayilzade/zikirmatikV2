const addBut = document.getElementById("add");
const resBut = document.getElementById("reset");
const counter = document.getElementById("counter");
const zikir = document.getElementById("zikir");
const fulDiv = document.getElementById("fulDiv");
const modeButton = document.getElementById("full_screen");
const settingsPage = document.getElementById("settingsPage");
const settingsBTN = document.getElementById("settingsBTN");
const selectVib = document.getElementById("select");
const vibrateEveryInput = document.getElementById("vibrateEveryInput");

let count = localStorage.getItem("localCount");
counter.textContent = count;
let k = localStorage.getItem("localScreenMode");
let restimer;
let screenMode;
let vibration = localStorage.getItem("vibration");
let settingsOpened = false;
vibrateEveryInput.value = 33;

localScreenMode();
screenModes();
vibrationIntensity();

function add() {
  count++;
  localStorage.setItem("localCount", count);
  counter.textContent = count;
  vibrate(vibration);
  if (count % vibrateEveryInput.value == 0) {
    vibrate(1000);
  }
}
function reset() {
  count = 0;
  localStorage.setItem("localCount", count);
  counter.textContent = count;
  vibrate(200);
}

function screenModes() {
  if (k == "minimized") {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("touchend", handleMouseUp);

    handleFullScreen();

    localStorage.setItem("localScreenMode", k);
    k = "fullscreen";
  } else {
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener("touchstart", handleMouseDown);
    window.removeEventListener("touchend", handleMouseUp);

    handleMinimized();
    localStorage.setItem("localScreenMode", k);
    k = "minimized";
  }
}

function handleMouseDown(event) {
  if (event.type === "touchstart" && event.touches.length > 1) {
    return;
  }
  restimer = setTimeout(() => {
    reset();
    count = -1;
  }, 1000);
}
function handleMouseUp() {
  clearTimeout(restimer);
}
function handleFullScreen() {
  closeSettings();
  modeButton.innerHTML = `<img src="fullscreen_exit.svg">Minimize`;
  modeButton.style.width = "120px";

  addBut.style.display = "none";
  resBut.style.display = "none";
  zikir.style.background = "none";
  settingsBTN.style.display = "none";
  counter.setAttribute(
    "style",
    "background-color: transparent; top:50%;left:50% ;    transform: translate(-50% ,-50%);"
  );
  fulDiv.style.display = "block";
}
function handleMinimized() {
  modeButton.style.width = "150px";
  setTimeout(() => {
    modeButton.innerHTML = `<img src="fullscreen.svg">Tap anywhere`;
    settingsBTN.style.display = "block";
  }, 100);

  addBut.style.display = "block";
  resBut.style.display = "block";
  zikir.style.background = 'url("Union.svg")';

  counter.setAttribute(
    "style",
    `    border: none;
  position: absolute;
  height: 140px;
  width: 272px;
  left: 41px;
  border-radius: 47px;
  background-color: #818C78 ;
  text-align: center;


  font-size: 80px;
  font-family: poppins;
  font-weight: 500;
  line-height: 1.85;
`
  );

  fulDiv.style.display = "none";
}

function localScreenMode() {
  screenMode = localStorage.getItem("localScreenMode");
  if (screenMode == "minimized") {
    handleFullScreen();
  } else if (screenMode == "fullscreen") {
    handleMinimized();
  }
}
function openSettings() {
  if (!settingsOpened) {
    settingsPage.style.display = "block";
    settingsPage.style.opacity = 0;
    setTimeout(() => {
      settingsPage.style.opacity = 1;
    }, 1);

    settingsBTN.getElementsByTagName("img")[0].style.rotate = "90deg";
    settingsOpened = true;
  } else {
    closeSettings();
  }
}
function closeSettings() {
  settingsPage.style.opacity = 0;
  setTimeout(() => {
    settingsPage.style.display = "none";
  }, 300);
  settingsBTN.getElementsByTagName("img")[0].style.rotate = "0deg";
  settingsOpened = false;
}
function vibrationIntensity(mode) {
  // If no mode passed, use stored vibration value
  if (!mode) {
    vibration = parseInt(localStorage.getItem("vibration")) || 90; // default to normal if not set
  }

  // Set vibration based on mode or stored value
  if (mode === "mild") {
    vibration = 60;
    selectVib.style.left = "115px";
    selectVib.style.width = "67px";
  } else if (mode === "normal") {
    vibration = 90;
    selectVib.style.left = "177px";
    selectVib.style.width = "84px";
  } else if (mode === "intense") {
    vibration = 130;
    selectVib.style.left = "255px";
    selectVib.style.width = "90px";
  }

  // Update UI based on stored vibration value
  if (!mode) {
    switch (vibration) {
      case 60:
        selectVib.style.left = "115px";
        selectVib.style.width = "67px";
        break;
      case 90:
        selectVib.style.left = "177px";
        selectVib.style.width = "84px";
        break;
      case 130:
        selectVib.style.left = "255px";
        selectVib.style.width = "90px";
        break;
    }
  }

  // Only vibrate and save if a mode was explicitly selected
  if (typeof mode === "string") {
    vibrate(vibration);
    localStorage.setItem("vibration", vibration);
  }
}

function vibrate(v) {
  window.navigator.vibrate(v);
}

function resetSettings() {
  vibration = 90;
  localStorage.setItem("vibration", vibration);
  vibrationIntensity("normal");

  vibrateEveryInput.value = 33;
  localStorage.setItem("vibrateEveryInput", 33);

  // Notify the user
  alert("Settings have been reset to default.");
}
