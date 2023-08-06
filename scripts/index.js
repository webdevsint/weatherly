document
  .querySelector(".search-box")
  .addEventListener("keydown", function onEvent(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      submitHandler();
    }
  });

function toggleImage() {
  const image = document.querySelector(".arrow");
  if (image.src.match("./statics/dropdown.png")) {
    image.src = "./statics/up-arrow.png";
  } else {
    image.src = "./statics/dropdown.png";
  }
}

const submitHandler = () => {
  navigator.vibrate(300);

  const location = document.querySelector(".search-box").value;

  fetch(`https://weather-api.nehanyaser.repl.co/forecast?location=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.current) {
        alert("api error");
      } else {
        const forecast = data.forecast.forecastday[0];

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
        console.log(forecast);

        // forecast
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

        document.querySelector(".forecast").style.display = "block";
        document.querySelector(".footer").style.display = "block";
      }
    })
    .catch((e) => console.log(e));
};

document.querySelector(".title").onclick = () => {
  toggleImage();
  document.querySelector(".hourly-container").classList.toggle("hidden");
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

document.querySelector(".temp-fahrenheit").onclick = () => {
  document.querySelector(".temp-fahrenheit").style.display = "none";
  document.querySelector(".temp-celsius").style.display = "block";
};

document.querySelector(".temp-celsius").onclick = () => {
  document.querySelector(".temp-celsius").style.display = "none";
  document.querySelector(".temp-fahrenheit").style.display = "block";
};

window.onbeforeprint = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  const formattedDate = dd + "-" + mm + "-" + yyyy;

  document.querySelector("h1").innerHTML = `Weather report: ${formattedDate}`;
};


window.onafterprint = () => {
  document.querySelector("h1").innerHTML = "Weatherly."
}