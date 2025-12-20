const user_minute = document.querySelector("#user-minute");
const minute_show = document.querySelector("#minute");
const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");
let time = 1500;
let user_time = 0;
let interVal;
user_minute.addEventListener("change", (e) => {
    user_time = Math.floor(parseInt(e.target.value));
    console.log(user_time);
    time = user_time * 60;
    console.log(time);
});

let timerFunc = () => {
    let minute = Math.floor(time / 60);
    let second = Math.floor(time % 60);
    let fomtted = `<h1  class="text-9xl font-medium alan text-[#FAF3E1] ">${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}</h1>`;
    minute_show.innerHTML = fomtted;
};

const startTime = () => {
    interVal = setInterval(() => {
        time--;
        timerFunc()
    }, 1000);
};

const stopTime = () => {
    clearInterval(interVal)
}
const resetTime = () => {
    time = 1500 ;
    stopTime();
    timerFunc()
}
start.addEventListener("click", () => {
    startTime()
});
stop.addEventListener("click", () => {
    stopTime()
});
reset.addEventListener("click", () => {
    resetTime()
});
