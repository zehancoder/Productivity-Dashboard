const date = document.querySelector("#date");
const time = document.querySelector("#time");
const country = document.querySelector("#country");
const temp = document.querySelector("#temp");
const weatherTrack = document.querySelector("#weather-track");
const precipitation = document.querySelector("#precipitation");
const wind = document.querySelector("#wind");
const humidity = document.querySelector("#humidity");
const weatherInput = document.querySelector("#weather-input");
const weatherSearch = document.querySelector("#weather-search");
const messageBox = document.querySelector("#message-box");
const message = document.querySelector("#error-message");

// fetching weather
const weather = () => {
  const weatherFetch = async (countryName) => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=130ce1b155674eb7a1e180803251612&q=${
        countryName || "bangladesh"
      }`
    );
    const res = await response.json();
    if (res.error) {
      messageBox.style.transform = "translateX(0%)";
      message.innerHTML = res.error.message + "!";
      setTimeout(() => {
        messageBox.style.transform = "translateX(-400px)";
      }, 3000);
    }

    country.innerHTML = res.location.country;
    temp.innerHTML = `${res.current.temp_c}<sup>o</sup>`;
    weatherTrack.innerHTML = res.current.condition.text;
    precipitation.innerHTML = `${res.current.heatindex_c}`;
    humidity.innerHTML = res.current.humidity;
    wind.innerHTML = res.current.wind_kph;
  };

  weatherFetch();

  weatherSearch.addEventListener("click", (e) => {
    e.preventDefault();
    let country = weatherInput.value;
    if (country !== "") {
      weatherFetch(country);
      weatherInput.value = "";
    }
  });
};
weather();

// add time functionality

const dateFunc = () => {
  const allMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const newDate = new Date();

  // get date
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const getDate = newDate.getDate();
  date.innerHTML = `${getDate} ${allMonth[month]}, ${year}`;

};
dateFunc();

//geeting time
const getTime = () => {
  const allWeekend = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const newDate = new Date();
  const day = allWeekend[newDate.getDay()];
  const hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const second = newDate.getSeconds();

  time.innerHTML = `<span class="text-[#FF6D1F]">${String(day).padStart(
    "2",
    "0"
  )},</span>
                <span>${
                  hour < 12
                    ? String(hour).padStart("2", "0") +
                      ":" +
                      String(minute).padStart("2", "0") +
                      ":" +
                      String(second).padStart("2", "0") +
                      " AM"
                    :
                      String(hour).padStart("2", "0") +
                      ":" +
                      String(minute).padStart("2", "0") +
                      ":" +
                      String(second).padStart("2", "0") +
                      " PM"
                }</span>`;
};
setInterval(() => {
  getTime();
}, 1000);


