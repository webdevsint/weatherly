document
  .querySelector(".search-box")
  .addEventListener("keydown", function onEvent(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      submitHandler();
    }
  });

const submitHandler = () => {
  navigator.vibrate(300);

  document.querySelector(".loader").style.display = "flex";

  const location = document.querySelector(".search-box").value;

  fetch(`https://weather-api.nehanyaser.repl.co/forecast?location=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.current) {
        alert("Enter a valid location");

        document.querySelector(".search-box").value = "";
        document.querySelector(".loader").style.display = "none";
      } else {
        const forecast = data.forecast.forecastday[0];
        const futureForecast = data.forecast.forecastday[1];

        // current
        document.querySelector(".city").innerHTML = `${data.location.name},`;
        document.querySelector(".country").innerHTML = data.location.country;

        getCurrentTempC(data);
        getCurrentTempF(data);

        document.querySelector(".condition-img").src =
          data.current.condition.icon;
        document.querySelector(".condition-text").innerHTML =
          data.current.condition.text;

        document.querySelector(
          ".current-humidity"
        ).innerHTML = `Humidity: ${data.current.humidity}%`;
        document.querySelector(
          ".current-windspeed-kmh"
        ).innerHTML = `Wind: ${data.current.wind_kph} Km/\h`;

        document.querySelector(".weather").style.display = "block";

        // hourly forecast
        forecast.hour.forEach((h) => {
          const div = document.createElement("div");

          const h2 = document.createElement("h2");
          h2.innerHTML = h.time.split(" ")[1];

          const temp = document.createElement("div");
          temp.className = "row";
          temp.innerHTML = `Temperature <div>${h.temp_c}°C / ${h.temp_f}°F</div>`;

          const condition = document.createElement("div");
          condition.className = "row";
          condition.innerHTML = `Condition <div>${h.condition.text}</div>`;

          const humidity = document.createElement("div");
          humidity.className = "row";
          humidity.innerHTML = `Humidity <div>${h.humidity}%</div>`;

          const wind = document.createElement("div");
          wind.className = "row";
          wind.innerHTML = `Wind <div>${h.wind_kph} Km/h</div>`;

          const rain = document.createElement("div");
          rain.className = "row";
          rain.innerHTML = `Chance of rain <div>${h.chance_of_rain}%</div>`;

          div.appendChild(h2);
          div.appendChild(temp);
          div.appendChild(condition);
          div.appendChild(humidity);
          div.appendChild(wind);
          div.appendChild(rain);

          document.querySelector(".hourly-container").appendChild(div);
        });

        // misc
        document.querySelector(
          ".max-temp"
        ).innerHTML = `${forecast.day.maxtemp_c}°C / ${forecast.day.maxtemp_f}°F`;
        document.querySelector(
          ".min-temp"
        ).innerHTML = `${forecast.day.mintemp_c}°C / ${forecast.day.mintemp_f}°F`;
        document.querySelector(
          ".avg-temp"
        ).innerHTML = `${forecast.day.avgtemp_c}°C / ${forecast.day.avgtemp_f}°F`;

        document.querySelector(
          ".avg-humidity"
        ).innerHTML = `${forecast.day.avghumidity}%`;
        document.querySelector(
          ".rain-chance"
        ).innerHTML = `${forecast.day.daily_chance_of_rain}%`;

        // future forecast
        document.querySelector(".future-condition-img").src =
          futureForecast.day.condition.icon;
        document.querySelector(".future-condition-text").innerHTML =
          futureForecast.day.condition.text;

        document.querySelector(
          ".future-temp"
        ).innerHTML = `Temperature: ${forecast.day.avgtemp_c}°C / ${forecast.day.avgtemp_f}°F`;
        document.querySelector(
          ".future-humidity"
        ).innerHTML = `Humidity: ${forecast.day.avghumidity}%`;
        document.querySelector(
          ".future-chance-of-rain"
        ).innerHTML = `Chance of rain: ${forecast.day.daily_chance_of_rain}%`;

        document.querySelector(".forecast").style.display = "block";
        document.querySelector(".footer").style.display = "block";
        document.querySelector(".loader").style.display = "none";
      }
    })
    .catch((e) => console.log(e));
};

// dropdown
document.querySelector(".title").onclick = () => {
  toggleImage();
  document.querySelector(".hourly-container").classList.toggle("hidden");
};

// toggle between c and f
document.querySelector(".temp-fahrenheit").onclick = () => {
  document.querySelector(".temp-fahrenheit").style.display = "none";
  document.querySelector(".temp-celsius").style.display = "block";
};

document.querySelector(".temp-celsius").onclick = () => {
  document.querySelector(".temp-celsius").style.display = "none";
  document.querySelector(".temp-fahrenheit").style.display = "block";
};

// print event handlers
window.onbeforeprint = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  const formattedDate = dd + "-" + mm + "-" + yyyy;

  document.querySelector("h1").innerHTML = `Weather report: ${formattedDate}`;
};

window.onafterprint = () => {
  document.querySelector("h1").innerHTML = "Weatherly.";
};

// preloader handler
window.onload = () => {
  document.querySelector(".loader").style.display = "none";
};


function getCurrentTempC(d) {
  document.querySelector(".temp-celsius").innerHTML = `${Math.round(
    d.current.temp_c
  )}<sup>°</sup>C`;
}

function getCurrentTempF(d) {
  document.querySelector(".temp-fahrenheit").innerHTML = `${Math.round(
    d.current.temp_f
  )}<sup>°</sup>F`;
}

function toggleImage() {
  const image = document.querySelector(".arrow");
  if (image.src.match("./statics/dropdown.png")) {
    image.src = "./statics/up-arrow.png";
  } else {
    image.src = "./statics/dropdown.png";
  }
}
