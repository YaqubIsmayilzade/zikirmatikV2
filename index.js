const addBut = document.getElementById("add");
const resBut = document.getElementById("reset");
const counter = document.getElementById("counter");
const zikir = document.getElementById("zikir");
const fulDiv = document.getElementById("fulDiv");
const modeButton = document.getElementById("full_screen");
let screenMode;

let count = localStorage.getItem("localCount");
counter.textContent = count;
let k = localStorage.getItem("localScreenMode");
let restimer;

localScreenMode();
screenModes();

function add() {
  count++;
  localStorage.setItem("localCount", count);
  counter.textContent = count;
}
function reset() {
  count = 0;
  localStorage.setItem("localCount", count);
  counter.textContent = count;
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

function handleMouseDown() {
  restimer = setTimeout(() => {
    reset();
    count = -1;
  }, 1000);
}
function handleMouseUp() {
  clearTimeout(restimer);
}
function handleFullScreen() {
  modeButton.innerHTML = `<img src="fullscreen_exit.svg">Minimize`;
  modeButton.style.width = "120px";

  addBut.style.display = "none";
  resBut.style.display = "none";
  zikir.style.background = "none";
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
